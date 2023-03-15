import { Address } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from '../src/helper/contracts';
import { MVXProxyNetworkAddress } from "../src/helper/proxy/util";
import { ChainId } from "../src/helper/token/token";
import BigNumber from "bignumber.js";

example()

async function example() {

    const proxy = new ProxyNetworkProvider(MVXProxyNetworkAddress.Mainnet)

    // FeeDistributorContract
    const fdContract = ContractManager.getFeeDistributorContract(
        ASHSWAP_CONFIG.dappContractMainnet.feeDistributor
    ).onChain(ChainId.Mainnet)
    .onProxy(proxy);

    const tx = await fdContract.claim(Address.Zero());
    console.log("-->" + tx);

    // VotingEscrowContract
    const veContract = ContractManager.getVotingEscrowContract(
        ASHSWAP_CONFIG.dappContractMainnet.voteEscrowedContract
    );
    const withdrawTx = await veContract.withdraw();
    console.log("-->" + withdrawTx);


}
