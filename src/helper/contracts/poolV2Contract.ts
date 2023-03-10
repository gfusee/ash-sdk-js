import { Address, TokenPayment } from "@multiversx/sdk-core/out";
import poolV2Abi from "../../../assets/abi/pool_v2.abi.json";
import BigNumber from "bignumber.js";
import Contract from "./contract";

class PoolV2Contract extends Contract<typeof poolV2Abi> {
    constructor(address: string) {
        super(address, poolV2Abi);
    }

    async estimateAmountOut(
        tokenInIndex: number,
        tokenOutIndex: number,
        tokenAmtIn: BigNumber
    ): Promise<{fee: BigNumber, outputAmount: BigNumber}> {
        let interaction = this.contract.methods.estimateAmountOut([
            tokenInIndex,
            tokenOutIndex,
            tokenAmtIn,
        ]);
        const { firstValue, secondValue } = await this.runQuery(interaction);
        return {
            fee: firstValue?.valueOf(),
            outputAmount: secondValue?.valueOf(),
        }
    }

    async estimateAddLiquidity(amounts: BigNumber[]): Promise<BigNumber> {
        let interaction = this.contract.methods.estimateAddLiquidity([amounts]);
        const { firstValue } = await this.runQuery(interaction);
        return firstValue?.valueOf();
    }

    async estimateRemoveLiquidityOneCoin(lpAmount: BigNumber, tokenOutIndex: number): Promise<BigNumber> {
        let interaction = this.contract.methods.estimateRemoveLiquidityOneCoin([lpAmount, tokenOutIndex]);
        const { firstValue } = await this.runQuery(interaction);
        return firstValue?.valueOf();
    }

    async getTotalSupply(): Promise<BigNumber> {
        let interaction = this.contract.methods.getLpTokenSupply();
        const { firstValue } = await this.runQuery(interaction);
        return firstValue?.valueOf();
    }

    async addLiquidity(sender: string, tokenPayments: TokenPayment[], minMintAmount: BigNumber, receiver?: Address) {
        let interaction = this.contract.methods.addLiquidity([minMintAmount, receiver || new Address(sender)]);
        interaction.withMultiESDTNFTTransfer(tokenPayments, new Address(sender)).withGasLimit(35_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }

    async exchange(tokenPayment: TokenPayment, mintWeiOut: BigNumber) {
        let interaction = this.contract.methods.exchange([mintWeiOut]);
        interaction.withSingleESDTTransfer(tokenPayment).withGasLimit(35_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }

    async removeLiquidity(sender: string, tokenPayment: TokenPayment, minAmounts: BigNumber[], receiver?: Address) {
        let interaction = this.contract.methods.removeLiquidity([minAmounts, receiver || new Address(sender)]);
        interaction.withSingleESDTTransfer(tokenPayment).withGasLimit(12_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }

    /**
     * other enpoints
     */
    
    async removeLiquidityOneCoin(sender: string, tokenPayment: TokenPayment, name: string, minAmount: BigNumber, receiver?: Address) {
        let interaction = this.contract.methods.removeLiquidityOneCoin([name, minAmount, receiver || new Address(sender)]);
        interaction.withSingleESDTTransfer(tokenPayment).withGasLimit(12_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }

    async claimAdminFees() {
        let interaction = this.contract.methods.claimAdminFees([]);
        interaction.withGasLimit(35_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }
    
    async setLpTokenIdentifier(tokenId: string) {
        let interaction = this.contract.methods.setLpTokenIdentifier([tokenId]);
        interaction.withGasLimit(35_000_000);
        return this.interceptInteraction(interaction).check().buildTransaction();
    }
}

export default PoolV2Contract;
