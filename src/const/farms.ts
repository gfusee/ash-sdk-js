import { ashNetwork } from "../helper/contracts";
import { IFarm } from "../interface/farm";
import { AshNetwork } from "./env";

type FarmConfig = {
    alpha: IFarm[];
    beta: IFarm[];
};
const devnet: FarmConfig = {
    alpha: [
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgqrhhrt46nymylla0upk9lkglvcus43x9urmcqelgnh2",
            reward_token_id: "ASH-84eab0",
            reward_token_decimal: 18,
            farming_token_id: "ALP-4f7776",
            farming_token_decimal: 18,
            farm_token_id: "FARM-f14098",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgq73dnmsmw2cspwa6806vkhcuyp96u9f3grmcq40feja",
            reward_token_id: "ASH-84eab0",
            reward_token_decimal: 18,
            farming_token_id: "ALP-37d247",
            farming_token_decimal: 18,
            farm_token_id: "FARM-83346e",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgqag4ya9mjz9kny647s09zrp3nrzgzdzfhrmcq50mtmu",
            reward_token_id: "ASH-84eab0",
            reward_token_decimal: 18,
            farming_token_id: "ALP-524be5",
            farming_token_decimal: 18,
            farm_token_id: "FARM-9d6f51",
            farm_token_decimal: 18,
            active: true,
        },
    ],
    beta: [
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgq84grnrns73p28kkp9mu5v2dl5vclpq6r2gesn5hz4s",
            reward_token_id: "ASH-4ce444",
            reward_token_decimal: 18,
            farming_token_id: "ALP-c874cd",
            farming_token_decimal: 18,
            farm_token_id: "FARM-c4c5ef",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgq6cc8e07q28z3r9aemnn68x9pu8funw462gesh3p8qv",
            reward_token_id: "ASH-4ce444",
            reward_token_decimal: 18,
            farming_token_id: "ALP-36485d",
            farming_token_decimal: 18,
            farm_token_id: "FARM-6fb37f",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgq8ar2tjxdk04t6rdhdxm74rpy04d3l5lm2gesep69np",
            reward_token_id: "ASH-4ce444",
            reward_token_decimal: 18,
            farming_token_id: "ALP-48f785",
            farming_token_decimal: 18,
            farm_token_id: "FARM-19b7b1",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgqkhdl37ctu8wvht2am6lrgd2s7lvkvq0x2gesju2nvt",
            reward_token_id: "ASH-4ce444",
            reward_token_decimal: 18,
            farming_token_id: "ALP-44bcf0",
            farming_token_decimal: 18,
            farm_token_id: "FARM-88e863",
            farm_token_decimal: 18,
            active: true,
        },
        {
            farm_address:
                "erd1qqqqqqqqqqqqqpgqytrjkljp9k3fvqmze6qfpeyjx24dqkuj2gese9pp84",
            reward_token_id: "ASH-4ce444",
            reward_token_decimal: 18,
            farming_token_id: "ALP-a3a2f6",
            farming_token_decimal: 18,
            farm_token_id: "FARM-6d2b86",
            farm_token_decimal: 18,
            active: true,
        },
    ],
};

const mainnet: IFarm[] = [
    {
        farm_address:
            "erd1qqqqqqqqqqqqqpgqe9hhqvvw9ssj6y388pf6gznwhuavhkzc4fvs0ra2fe",
        reward_token_id: "ASH-a642d1",
        reward_token_decimal: 18,
        farming_token_id: "ALP-afc922",
        farming_token_decimal: 18,
        farm_token_id: "FARM-795466",
        farm_token_decimal: 18,
        active: true,
    },
    {
        farm_address:
            "erd1qqqqqqqqqqqqqpgqf5awrqh68fra8rc7dnfrradadwsecrmc4fvsm6c2n7",
        reward_token_id: "ASH-a642d1",
        reward_token_decimal: 18,
        farming_token_id: "ALP-5f9191",
        farming_token_decimal: 18,
        farm_token_id: "FARM-9ed1f9",
        farm_token_decimal: 18,
        active: true,
    },
    {
        farm_address:
            "erd1qqqqqqqqqqqqqpgqq0ltmf7h456h5jlm8zn3utz0ap027wyk4fvs3yz9z0",
        reward_token_id: "ASH-a642d1",
        reward_token_decimal: 18,
        farming_token_id: "ALP-2d0cf8",
        farming_token_decimal: 18,
        farm_token_id: "FARM-e5ffde",
        farm_token_decimal: 18,
        active: true,
    },
];

function getFarm() {
    var farm: IFarm[] = [];
    switch (ashNetwork) {
        case AshNetwork.DevnetAlpha:
            farm = devnet.alpha;
            break;
        case AshNetwork.DevnetBeta:
            farm = devnet.beta;
            break;
        default:
            farm = mainnet;
            break;
    }
    return farm;
}


export const FARMS = getFarm();
export const FARMS_MAP = Object.fromEntries(
    FARMS.map((f) => [f.farm_address, f])
);
export const MAINNET_FARMS = mainnet;
export const DEVNET_ALPHA_FARMS = devnet.alpha;
export const DEVNET_BETA_FARMS = devnet.beta;
export const FARM_DIV_SAFETY_CONST = 1_000_000_000_000;
