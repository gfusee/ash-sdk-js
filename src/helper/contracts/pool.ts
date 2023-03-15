import {
    Address,
    BigUIntValue,
    ContractFunction,
    Query,
    TokenIdentifierValue,
    TokenPayment,
} from "@multiversx/sdk-core/out";
import poolAbi from "../../../assets/abi/pool.abi.json";
import BigNumber from "bignumber.js";
import IPool, { RemoveLiquidityResultType } from "../../interface/pool";
import { queryContractParser } from "../serializer";
import Contract from "./contract";
import { IESDTInfo } from "../token/token";
import { CryptoPool, CryptoPoolContext } from "../cryptoPool/swap";
import { TokenAmount } from "../token/tokenAmount";
import { Fraction } from "../fraction/fraction";
import { Price } from "../token/price";
import { calculateSwapPrice } from "../stableswap/calculator/price";
import { calculateEstimatedSwapOutputAmount2 } from "../stableswap/calculator/amounts";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { getDefaultProxyNetworkProvider } from "../proxy/util";

const getAmountOutMaiarPool = async (
    poolAddress: string,
    tokenFromId: string,
    amountIn: BigNumber,
    proxy: ProxyNetworkProvider = getDefaultProxyNetworkProvider(),
): Promise<BigNumber> => {
    try {
        const { returnData } = await proxy.queryContract(
            new Query({
                address: new Address(poolAddress),
                func: new ContractFunction("getAmountOut"),
                args: [
                    new TokenIdentifierValue(tokenFromId),
                    new BigUIntValue(amountIn),
                ],
            })
        );
        return (
            queryContractParser(returnData[0], "BigUint")?.[0]?.valueOf() ||
            new BigNumber(0)
        );
    } catch (error) { }
    return new BigNumber(0);
};

const calculateAmountOut = async (
    pool: IPool,
    tokenFromId: string,
    tokenToId: string,
    amountIn: BigNumber
) => {
    if (pool.isMaiarPool) {
        return await getAmountOutMaiarPool(pool.address, tokenFromId, amountIn);
    }
    return await new PoolContract(pool.address)
        .getAmountOut(tokenFromId, tokenToId, amountIn)
        .then((val) => val.amount_out);
};

const getReserveMaiarPool = async (
    pool: IPool, 
    proxy: ProxyNetworkProvider = getDefaultProxyNetworkProvider(),
) => {
    const res = await proxy.queryContract(
        new Query({
            address: new Address(pool.address),
            func: new ContractFunction("getReservesAndTotalSupply"),
        })
    );
    const [token1, token2, supply] = res.returnData.map(
        (data) => queryContractParser(data, "BigUint")[0].valueOf() as BigNumber
    );
    return {
        token1,
        token2,
        supply,
    };
};

export const queryPoolContract = {
    getAmountOutMaiarPool,
    calculateAmountOut,
    getReserveMaiarPool,
};
class PoolContract extends Contract<typeof poolAbi> {
    constructor(address: string) {
        super(address, poolAbi);
    }

    async getAmountOut(
        tokenFromId: string,
        tokenToId: string,
        amountIn: BigNumber
    ): Promise<{
        admin_fee: BigNumber;
        amount_out: BigNumber;
        token_in_balance: BigNumber;
        token_out_balance: BigNumber;
        total_fee: BigNumber;
    }> {
        const interaction = this.contract.methods.estimateAmountOut([
            tokenFromId,
            tokenToId,
            amountIn,
        ]);
        const query = interaction.check().buildQuery();
        const res = await this.getProxy().queryContract(query);
        const { firstValue } = this.resultParser.parseQueryResponse(
            res,
            interaction.getEndpoint()
        );
        return firstValue?.valueOf() as any;
    }

    async addLiquidity(
        sender: string,
        tokenPayments: TokenPayment[],
        mintAmtMin: BigNumber,
        receiver = Address.Zero()
    ) {
        let interaction = this.contract.methods.addLiquidity([
            mintAmtMin,
            receiver,
        ]);
        if (tokenPayments.length === 1) {
            interaction
                .withSingleESDTTransfer(tokenPayments[0])
                .withGasLimit(10_000_000);
        } else {
            interaction
                .withMultiESDTNFTTransfer(tokenPayments, new Address(sender))
                .withGasLimit(10_000_000 + tokenPayments.length * 2_000_000);
        }
        interaction = this.interceptInteraction(interaction);
        return interaction.check().buildTransaction();
    }

    async removeLiquidity(
        tokenPayment: TokenPayment,
        tokensAmtMin: BigNumber[]
    ) {
        let interaction = this.contract.methods.removeLiquidity(tokensAmtMin);
        interaction
            .withSingleESDTTransfer(tokenPayment)
            .withGasLimit(9_000_000);
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    async exchange(
        tokenPayment: TokenPayment,
        tokenToId: string,
        minWeiOut: BigNumber
    ) {
        let interaction = this.contract.methods.exchange([
            tokenToId,
            minWeiOut,
        ]);
        interaction
            .withSingleESDTTransfer(tokenPayment)
            .withGasLimit(8_000_000);
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    async estimateAddLiquidity(tokenAmounts: BigNumber[]) {
        let interaction = this.contract.methods.estimateAddLiquidity([tokenAmounts]);
        const res = await this.getProxy().queryContract(interaction.check().buildQuery());
        const { firstValue } = this.resultParser.parseQueryResponse(res, interaction.getEndpoint());
        return firstValue?.valueOf();
    }

    /**
     * other endpoints
     */
    async estimateRemoveLiquidity(burnAmount: BigNumber): Promise<RemoveLiquidityResultType> {
        let interaction = this.contract.methods.estimateAddLiquidity([burnAmount]);
        const { firstValue } = await this.runQuery(interaction);
        return firstValue?.valueOf();
    }

    async commitNewFee(swapFeePercent: number, adminFeePercent: number) {
        let interaction = this.contract.methods.commitNewFee([swapFeePercent, adminFeePercent]);
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    async applyNewFee() {
        let interaction = this.contract.methods.applyNewFee();
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    async revertNewFee() {
        let interaction = this.contract.methods.revertNewFee();
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    async withdrawAdminFees() {
        let interaction = this.contract.methods.withdrawAdminFees();
        return this.interceptInteraction(interaction)
            .check()
            .buildTransaction();
    }

    public static estimateAmountOut(
        tokens: IESDTInfo[],
        context: CryptoPoolContext,
        i: number,
        j: number,
        dx: BigNumber,
    ) {
        const cryptoPool = new CryptoPool(tokens, context);
        return cryptoPool.estimateAmountOut(i, j, dx);
    }

    public static calculateSwapPrice(
        amp: BigNumber,
        reserves: TokenAmount[],
        fromToken: IESDTInfo,
        toToken: IESDTInfo,
        fees: { swap: Fraction; admin: Fraction }
    ): Price {
        return calculateSwapPrice(amp, reserves, fromToken, toToken, fees);
    }

    public static calculateEstimatedSwapOutputAmount2(
        amp: BigNumber,
        reserves: TokenAmount[],
        fromAmount: TokenAmount,
        toToken: IESDTInfo,
        fees: {
            swap: Fraction;
            admin: Fraction;
        }
    ) {
        return calculateEstimatedSwapOutputAmount2(amp, reserves, fromAmount, toToken, fees)
    };

}

export default PoolContract;
