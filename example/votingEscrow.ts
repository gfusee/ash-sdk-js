import { Address, TokenPayment } from "@multiversx/sdk-core/out";
import { ASHSWAP_CONFIG } from "../src/const/ashswapConfig";
import { MAINNET_TOKENS_MAP } from "../src/const/tokens";
import { ContractManager } from "../src/helper/contracts";
import BigNumber from "bignumber.js";

async function withdraw() {
    const veContract = ContractManager.getVotingEscrowContract(
        ASHSWAP_CONFIG.dappContractMainnet.voteEscrowedContract
    );
    const tx = await veContract.withdraw();
    return tx;
}

async function createLock() {
    const veContract = ContractManager.getVotingEscrowContract(
        ASHSWAP_CONFIG.dappContractMainnet.voteEscrowedContract
    );
    const ashToken = MAINNET_TOKENS_MAP["ASH-a642d1"]
    const tokenPayment = TokenPayment.fungibleFromBigInteger(
        ashToken.identifier,
        new BigNumber(1),
        ashToken.decimals
    );
    const tx = await veContract.createLock(
        tokenPayment,
        0
    );
    return tx;
}

async function getUserLocked() {
    const veContract = ContractManager.getVotingEscrowContract(
        ASHSWAP_CONFIG.dappContractMainnet.voteEscrowedContract
    );
    const locked = await veContract.getUserLocked(Address.Zero().bech32());
    return locked;
}