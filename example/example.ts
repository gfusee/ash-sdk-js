import { Address, TokenPayment } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { ContractManager } from '../src/helper/contracts';
import { MVXProxyNetworkAddress } from "../src/helper/proxy/util";
import { ChainId } from "../src/helper/token/token";
import BigNumber from "bignumber.js";
import { mainnetPools } from "../src/const/pool";
import { MAINNET_TOKENS } from "../src/const/tokens";
import { MAINNET_FARMS } from "../src/const/farms";
import { IMetaESDT } from "../src/interface/tokens";

swap();

async function swap() {

    const proxy = new ProxyNetworkProvider(MVXProxyNetworkAddress.Mainnet)
    const tokenIn = MAINNET_TOKENS[0];
    const tokenOut = MAINNET_TOKENS[1];
    const poolAddress = mainnetPools[0].address;
    const tokenPayment = TokenPayment.fungibleFromBigInteger(
        tokenIn.identifier,
        new BigNumber(10),
        tokenIn.decimals
    );

    const poolContract = ContractManager.getPoolContract(
        poolAddress
    ).onChain(ChainId.Mainnet).onProxy(proxy);

    const tx = await poolContract.exchange(
        tokenPayment,
        tokenOut.identifier,
        new BigNumber(1),
    );

    return tx;
    
}

async function stake() {
    const farm = MAINNET_FARMS[0]
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );
    const stakeAmt = new BigNumber(1);

    const farmTokenInWallet: IMetaESDT[] = [];

    const tokenPayments = farmTokenInWallet.map((t) =>
        TokenPayment.metaEsdtFromBigInteger(
            t.collection,
            t.nonce,
            t.balance,
            farm.farm_token_decimal
        )
    );
    tokenPayments.unshift(
        TokenPayment.fungibleFromBigInteger(
            farm.farming_token_id,
            stakeAmt,
            farm.farming_token_decimal
        )
    );
    const tx = await farmContract.enterFarm(
        Address.Zero().bech32(),
        tokenPayments,
    );
    return tx;
}
