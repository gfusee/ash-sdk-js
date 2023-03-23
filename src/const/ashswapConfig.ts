type DappContracts = {
    voteEscrowedContract: string;
    feeDistributor: string;
    farmController: string;
    farmBribe: string;
};
type DappContractConfig = {
    alpha: DappContracts;
    beta: DappContracts;
};
const dappContractDevnet: DappContractConfig = {
    beta: {
        voteEscrowedContract:
            "erd1qqqqqqqqqqqqqpgqszgrd5u7v32m4p7dkqqu0jzks7xhcvxy2gesyrxlpd",
        feeDistributor:
            "erd1qqqqqqqqqqqqqpgqx94lrsf0psrql406m58xtuf2zj2pt8ht2ges8zkm95",
        farmController: "erd1qqqqqqqqqqqqqpgqdqn69j46a98gc4s9f8ckzp2nhswhyggq2gesptr8l8",
        farmBribe: "erd1qqqqqqqqqqqqqpgqjjldc9dwrx970l4mvlv2v9kfcj0k2w7p2gesphc4cd",
    },
    alpha: {
        voteEscrowedContract:
            "erd1qqqqqqqqqqqqqpgqe5q4g4yv554yl40n0y2ntpax9duk69ghrmcq7zt30m",
        feeDistributor:
            "erd1qqqqqqqqqqqqqpgqxczm7t7da8ktaapszfh6js8tc4k36xs4rmcqhrcjaw",
        farmController:
            "erd1qqqqqqqqqqqqqpgqk44khghvkuq0d7h8j6kv9pwh8hu0tncvrmcqwyra92",
        farmBribe:
            "erd1qqqqqqqqqqqqqpgqw8npzkng2j5pt5ht07h0jhh4wky0cgkcrmcqyk7wne",
    },
};

const dappContractMainnet: DappContracts = {
    voteEscrowedContract:
        "erd1qqqqqqqqqqqqqpgq58elfqng8edp0z83pywy3825vzhawfqp4fvsaldek8",
    feeDistributor:
        "erd1qqqqqqqqqqqqqpgqjrlge5rgml6d48tjgu3afqvems88lqzw4fvs9f7lhs",
    farmController: "erd1qqqqqqqqqqqqqpgqzhm689ehkacadr7elzkc3z70h6cqmz0q4fvsftax5t",
    farmBribe: "erd1qqqqqqqqqqqqqpgqgulmfcu8prrv2pmx3nqn5stqu3c42fsz4fvsa9rwdl",
};

const dappContractDevnetAlpha = dappContractDevnet.alpha;
const dappContractDevnetBeta = dappContractDevnet.beta;

export const ASHSWAP_CONFIG = {
    dappContractMainnet,
    dappContractDevnetAlpha,
    dappContractDevnetBeta
} as const;
