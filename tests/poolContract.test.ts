import { Address, TokenPayment, Transaction } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";
import BigNumber from "bignumber.js";

describe("testing pool constract", () => {
    const contract = ContractManager.getPoolContract(Address.Zero().bech32());

    test("#addLiquidity", async () => {
        const tokenPayment = TokenPayment.fungibleFromBigInteger("", new BigNumber(0), 0)
        const tokenPayments = [tokenPayment]
        const tx = await contract.addLiquidity("", tokenPayments, new BigNumber(0)) ;

        expect(tx).toBeInstanceOf(Transaction);
    });

   
});