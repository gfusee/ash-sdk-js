# AshSwap Sdk


## Pool Contracts
The Pool Contract acts as an AMM for trading tokens. The AMM is based on Curve's algorithm used for the stable coin. Fee contains two types of fees: trading fee and admin fee.

The trading fee will stay in the liquidity pool to leverage LP holder interest. The admin fee will be sent to the veASH holder.

```typescript
const contract = ContractManager.getPoolContract("erd1...");
const tx = await contract.addLiquidity("erd1...");
```

## Farm Contract
The Farm Contract is a contract where users can lock their LP token to receive ASH.

Following Maiar Exchange, the farm position is represented by Farm Token, which is a Semi-Fungible Token. The reasoning behind this is that to calculate the reward for the token owner without storing anything on a smart contract.

```typescript
const contract = ContractManager.getFarmContract("erd1...");
const tx = await contract.checkpointFarmRewards();
```

## Voting Escrow Contract (DAO)
Contract where users can lock their ASH token for pre-set periods to gain veASH (Votes). Votes have weight depending on time. A user who has veASH can receive an admin fee from Pool Contract as their reward.

Besides that, they can use their veASH as a voting weight in the DAO voting system.

```typescript
const contract = ContractManager.getVotingEscrowContract("erd1...");
const tx = await contract.withdraw();
```

## Fee Distributor Contract
The contract contains the admin fee that is collected from Pools and distribute it into veASH owner.

```typescript
const contract = ContractManager.getFeeDistributorContract("erd1...");
const tx = await contract.claim(new Address("erd1..."));
```

