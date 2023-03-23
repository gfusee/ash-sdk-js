import { Address } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";

async function feeDistributor() {
    const fdContract = ContractManager.getFeeDistributorContract(
        ASHSWAP_CONFIG.dappContractMainnet.feeDistributor
    );
    const tx = await fdContract.claim(Address.Zero());
    return tx;
}