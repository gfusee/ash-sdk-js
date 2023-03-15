import { ContractManager } from "../src/helper/contracts";
import { WRAPPED_EGLD } from "../src/const/wrappedEGLD";
import BigNumber from "bignumber.js";

describe("testing wrapped EGLD contract", () => {
    const contract = ContractManager.getWrappedEGLDContract(
        WRAPPED_EGLD.wegldContracts[0]
    );

    test("#wrapEgld", async () => {
        const tx = await contract.wrapEgld(new BigNumber(0));

        expect(tx).toBeInstanceOf(Object);
    });

   
});