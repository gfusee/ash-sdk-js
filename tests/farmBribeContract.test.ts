import { Address } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";

describe("testing farm bride constract", () => {
    const contract = ContractManager.getFarmBribeContract(
        ASHSWAP_CONFIG.dappContractMainnet.farmBribe
    );

    test("#claimReward", async () => {
        const tx = await contract.claimReward(Address.Zero(), "");

        expect(tx).toBeInstanceOf(Object);
    });

   
});