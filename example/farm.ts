import { Address, TokenPayment } from "@multiversx/sdk-core/out";
import { ContractManager } from '../src/helper/contracts';
import { FARMS_MAP, MAINNET_FARMS } from "../src/const/farms";
import { IMetaESDT } from "../src/interface/tokens";
import BigNumber from "bignumber.js";
import { AshNetwork } from "../src/const/env";
import { FarmTokenAttrs } from "../src/interface/farm";

const farmAddress = "erd1qqqqqqqqqqqqqpgqe9hhqvvw9ssj6y388pf6gznwhuavhkzc4fvs0ra2fe"
ContractManager.setAshNetwork(AshNetwork.Mainnet)
stake()

async function stake() {
    const farm = FARMS_MAP[farmAddress];
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );
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
    return tx;
}

async function unstake() {
    const farm = FARMS_MAP[farmAddress];
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );

    const farmToken: IMetaESDT[] = [];

    const tokenPayments = farmToken.map((t) =>
        TokenPayment.metaEsdtFromBigInteger(
            t.collection,
            t.nonce,
            t.balance
        )
    );
    const tx = await farmContract.exitFarm(
        Address.Zero().bech32(),
        tokenPayments,
    );
    return tx;
}

async function claim() {
    const farm = FARMS_MAP[farmAddress];
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );

    const farmToken: IMetaESDT[] = [];

    const tokenPayments = farmToken.map((t) =>
        TokenPayment.metaEsdtFromBigInteger(
            t.collection,
            t.nonce,
            t.balance,
            farm.farm_token_decimal
        )
    );
    const tx = await farmContract.claimRewards(
        Address.Zero().bech32(),
        tokenPayments,
    );
    return tx;
}

async function calculateRewardsForGivenPosition() {
    const farm = FARMS_MAP[farmAddress];
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );

    const farmToken: IMetaESDT[] = [];
    const estimateds = await Promise.all(
        farmToken.map((t) => {
            return farmContract.calculateRewardsForGivenPosition(
                t.balance,
                farmContract.parseCustomType<FarmTokenAttrs>(
                    t.attributes,
                    "FarmTokenAttributes"
                )
            );
        })
    );
    const queryReward = estimateds.reduce((s, e) => s.plus(e), new BigNumber(0));
    return queryReward;
}

async function getSlopeBoosted() {
    const farm = FARMS_MAP[farmAddress];
    const farmContract = ContractManager.getFarmContract(
        farm.farm_address
    );

    return await farmContract.getSlopeBoosted(
        Address.Zero().bech32(),
    );
}

