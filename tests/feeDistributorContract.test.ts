import { Address, Transaction } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";

describe("testing fee distributor contract", () => {
    const fdContract = ContractManager.getFeeDistributorContract(
        ASHSWAP_CONFIG.dappContractMainnet.feeDistributor
    );

    test("claim test case", async () => {
        const tx = await fdContract.claim(Address.Zero());

        expect(tx).toBeInstanceOf(Transaction);
    });

    test("checkpointToken test case", async () => {
        const tx = await fdContract.checkpointToken();

        expect(tx).toBeInstanceOf(Transaction);
    });
});