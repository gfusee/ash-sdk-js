# Docs
[AshSwap Smart Contract](https://docs.ashswap.io/developers/smart-contracts)

# Use

```typescript
const contract = ContractManager.getFeeDistributorContract("erd1...").onChain(ChainId.Mainnet);
const tx = await contract.claim(new Address("erd1..."));
```