import { Address } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from '../src/helper/contracts';
import { queryPoolContract } from "../src/helper/contracts/pool";
import { MVXProxyNetworkAddress } from "../src/helper/proxy/util";
import { ChainId } from "../src/helper/token/token";
import BigNumber from "bignumber.js";

example()

async function example() {

    const proxy = new ProxyNetworkProvider(MVXProxyNetworkAddress.Mainnet)

    const fdContract = ContractManager.getFeeDistributorContract(
        ASHSWAP_CONFIG.dappContractMainnet.feeDistributor
    ).onChain(ChainId.Mainnet)
    .onProxy(proxy);


    const tx = await fdContract.claim(new Address(Address.Zero().bech32()));
    console.log("-->" + tx);


    const contract = queryPoolContract.getAmountOutMaiarPool("", "", new BigNumber(0));
}
