import { Address, Transaction } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";

describe("testing vosting escrow constract", () => {
    const veContract = ContractManager.getVotingEscrowContract(
        ASHSWAP_CONFIG.dappContractMainnet.voteEscrowedContract
    );

    test("#withdraw", async () => {
        const tx = await veContract.withdraw();

        expect(tx).toBeInstanceOf(Transaction);
    });

   
});