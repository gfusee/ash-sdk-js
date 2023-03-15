import { Address, TokenPayment, Transaction } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { ContractManager } from "../src/helper/contracts";
import { MAINNET_FARMS } from "../src/const/farms";
import BigNumber from "bignumber.js";
import { IMetaESDT } from "../src/interface/tokens";

describe("testing farm constract", () => {
    const farm = MAINNET_FARMS[0]
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );  

    test("#checkpointFarmRewards", async () => {
        const stakeAmt = new BigNumber(1);

        const farmTokenInWallet: IMetaESDT[] = [];
        const tokenPayments = farmTokenInWallet.map((t) =>
            TokenPayment.metaEsdtFromBigInteger(
                t.collection,
                t.nonce,
                t.balance,
                farm.farm_token_decimal
            )
        );
        tokenPayments.unshift(
            TokenPayment.fungibleFromBigInteger(
                farm.farming_token_id,
                stakeAmt,
                farm.farming_token_decimal
            )
        );
        const tx = await farmContract.enterFarm(
            Address.Zero().bech32(),
            tokenPayments,
        );

        expect(tx).toBeInstanceOf(Transaction);
    });

    test("#checkpointFarmRewards", async () => {
        const tx = await farmContract.checkpointFarmRewards();

        expect(tx).toBeInstanceOf(Transaction);
    });

   
});