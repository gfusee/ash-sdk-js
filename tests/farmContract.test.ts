import { Address } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";

describe("testing farm constract", () => {
    const contract = ContractManager.getFarmContract(
        ASHSWAP_CONFIG.dappContractMainnet.farmBribe
    );

    test("#checkpointFarmRewards", async () => {
        const tx = await contract.checkpointFarmRewards();

        expect(tx).toBeInstanceOf(Object);
    });

   
});