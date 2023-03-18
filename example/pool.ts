import { TokenPayment } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { ContractManager } from '../src/helper/contracts';
import { MVXProxyNetworkAddress } from "../src/helper/proxy/util";
import { ChainId } from "../src/helper/token/token";
import { TOKENS_MAP } from "../src/const/tokens";
import { queryPoolContract } from "../src/helper/contracts/pool";
import BigNumber from "bignumber.js";
import { POOLS_MAP_ADDRESS } from "../src/const/pool";
import { AshNetwork } from "../src/const/env";

const poolAddress = "erd1qqqqqqqqqqqqqpgqs8p2v9wr8j48vqrmudcj94wu47kqra3r4fvshfyd9c"
ContractManager.setAshNetwork(AshNetwork.Mainnet)

async function swap() {

    const proxy = new ProxyNetworkProvider(MVXProxyNetworkAddress.Mainnet)
    const tokenIn = TOKENS_MAP["EGLD"]
    const tokenOut = TOKENS_MAP["ASH-a642d1"];
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

async function getAmountOut() {
    const tokenIn = TOKENS_MAP["EGLD"]
    const tokenOut = TOKENS_MAP["ASH-a642d1"];
    const pool = POOLS_MAP_ADDRESS[poolAddress];
    return await queryPoolContract.calculateAmountOut(
        pool,
        tokenIn.identifier,
        tokenOut.identifier,
        new BigNumber(1)
    );
}

async function getReserve() {
    const pool = POOLS_MAP_ADDRESS[poolAddress];
    return await queryPoolContract.getReserveMaiarPool(
        pool
    );
}

async function estimateAddLiquidity() {
    const poolContract = ContractManager.getPoolContract(
        poolAddress
    );

    return await poolContract.estimateAddLiquidity([]);

}