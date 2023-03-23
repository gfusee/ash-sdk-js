import { ashNetwork } from "../helper/contracts";
import { ChainId } from "../helper/token/token";
import IPool, { EPoolType } from "../interface/pool";
import { AshNetwork } from "./env";
import { DEVNET_ALPHA_TOKENS_MAP, DEVNET_BETA_TOKENS_MAP, MAINNET_TOKENS_MAP } from "./tokens";

type PoolConfig = {
    beta: IPool[];
    alpha: IPool[];
};
const devnet: PoolConfig = {
    alpha: [
        {
            address:
                "erd1qqqqqqqqqqqqqpgq9ppe9hk2pqrtwqc2k5zll8v8hmgmfcwsrmcqhxxwxm",
            lpToken: {
                identifier: "ALP-4f7776",
                chainId: ChainId.Devnet,
                symbol: "LPT-3pool",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [
                DEVNET_ALPHA_TOKENS_MAP["USDC-fd47e9"],
                DEVNET_ALPHA_TOKENS_MAP["USDT-3e3720"],
                DEVNET_ALPHA_TOKENS_MAP["BUSD-b53884"],
            ],
            type: EPoolType.PlainPool,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqwn0yqfmp4yztzmxl8pm8tv59cdls7dfwrmcq6v6rr9",
            lpToken: {
                identifier: "ALP-37d247",
                chainId: ChainId.Devnet,
                symbol: "LPT-BUSD-wEGLD",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_ALPHA_TOKENS_MAP["BUSD-b53884"], DEVNET_ALPHA_TOKENS_MAP["WEGLD-578a26"]],
            type: EPoolType.PoolV2,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqthmzhtmuyym9fh44nmwwswyn7qnc5v73rmcqh6xrhy",
            lpToken: {
                identifier: "ALP-524be5",
                chainId: ChainId.Devnet,
                symbol: "LPT-ASH-USDT",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_ALPHA_TOKENS_MAP["USDT-3e3720"], DEVNET_ALPHA_TOKENS_MAP["ASH-84eab0"]],
            type: EPoolType.PoolV2,
        },
    ],
    beta: [
        {
            address:
                "erd1qqqqqqqqqqqqqpgqe5wx34pzxn33vmqa3cmfkwspp5rxe2q52geskyn8gz",
            lpToken: {
                identifier: "ALP-c874cd",
                chainId: ChainId.Devnet,
                symbol: "LPT-3pool",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [
                DEVNET_BETA_TOKENS_MAP["USDC-8d4068"],
                DEVNET_BETA_TOKENS_MAP["USDT-188935"],
                DEVNET_BETA_TOKENS_MAP["BUSD-632f7d"],
            ],
            type: EPoolType.PlainPool,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqvpvsw60awv39kq8kcqug4t8aqhqr4y2p2gesjqnwt4",
            lpToken: {
                identifier: "ALP-36485d",
                chainId: ChainId.Devnet,
                symbol: "LPT-BUSD-wEGLD",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_BETA_TOKENS_MAP["BUSD-632f7d"], DEVNET_BETA_TOKENS_MAP["WEGLD-d7c6bb"]],
            type: EPoolType.PoolV2,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqy7tg9y8c4p5kaf205f87m0zhleexjnzp2gesrdg5yr",
            lpToken: {
                identifier: "ALP-48f785",
                chainId: ChainId.Devnet,
                symbol: "LPT-ASH-USDT",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_BETA_TOKENS_MAP["USDT-188935"], DEVNET_BETA_TOKENS_MAP["ASH-4ce444"]],
            type: EPoolType.PoolV2,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqga369hdj5ajac3ud2tvycxcsf2g65k852gesqaq96s",
            lpToken: {
                identifier: "ALP-44bcf0",
                chainId: ChainId.Devnet,
                symbol: "LPT-BUSD-UTK",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_BETA_TOKENS_MAP["BUSD-632f7d"], DEVNET_BETA_TOKENS_MAP["UTK-a2a792"]],
            type: EPoolType.PoolV2,
        },
        {
            address:
                "erd1qqqqqqqqqqqqqpgqu4hvktdlhkz2trs05mhrp672pjmy98yn2gesjkmjna",
            lpToken: {
                identifier: "ALP-a3a2f6",
                chainId: ChainId.Devnet,
                symbol: "LPT-USDT-HTM",
                name: "Ashswap LP",
                decimals: 18,
            },
            tokens: [DEVNET_BETA_TOKENS_MAP["USDT-188935"], DEVNET_BETA_TOKENS_MAP["HTM-fe1f69"]],
            type: EPoolType.PoolV2,
        },
    ],
};

const mainnet: IPool[] = [
    {
        address:
            "erd1qqqqqqqqqqqqqpgqs8p2v9wr8j48vqrmudcj94wu47kqra3r4fvshfyd9c",
        lpToken: {
            identifier: "ALP-afc922",
            chainId: ChainId.Mainnet,
            symbol: "ALP-3pool",
            name: "Ashswap LP",
            decimals: 18,
        },
        tokens: [
            MAINNET_TOKENS_MAP["USDC-c76f1f"],
            MAINNET_TOKENS_MAP["USDT-f8c08c"],
            MAINNET_TOKENS_MAP["BUSD-40b57e"],
        ],
        type: EPoolType.PlainPool,
    },
    {
        address:
            "erd1qqqqqqqqqqqqqpgq5l05l0ts4lphdktx33apl0ss9rzf4r244fvsva6j53",
        lpToken: {
            identifier: "ALP-5f9191",
            chainId: ChainId.Mainnet,
            symbol: "ALP-BUSD-WEGLD",
            name: "Ashswap LP",
            decimals: 18,
        },
        tokens: [MAINNET_TOKENS_MAP["BUSD-40b57e"], MAINNET_TOKENS_MAP["WEGLD-bd4d79"]],
        type: EPoolType.PoolV2,
    },
    {
        address:
            "erd1qqqqqqqqqqqqqpgqn7969pvzaatp8p9yu6u5h2ce2gyw0x9j4fvsplvthl",
        lpToken: {
            identifier: "ALP-2d0cf8",
            chainId: ChainId.Mainnet,
            symbol: "ALP-USDT-ASH",
            name: "Ashswap LP",
            decimals: 18,
        },
        tokens: [MAINNET_TOKENS_MAP["USDT-f8c08c"], MAINNET_TOKENS_MAP["ASH-a642d1"]],
        type: EPoolType.PoolV2,
    },
];

function getPools() {
    var pools: IPool[] = [];
    switch (ashNetwork) {
        case AshNetwork.DevnetAlpha:
            pools = devnet.alpha;
            break;
        case AshNetwork.DevnetBeta:
            pools = [...devnet.beta];
            break;
        default:
            pools = [...mainnet];
            break;
    }
    return pools;
}

export const pools = getPools();
export const POOLS_MAP_ADDRESS = Object.fromEntries(
    pools.map((p) => [p.address, p])
);

