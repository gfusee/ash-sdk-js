import {
    ApiNetworkProvider,
    ProxyNetworkProvider,
} from "@multiversx/sdk-network-providers/out";
import ElrondProxyProvider from "./elrondProxyProvider";

function getNetworkConfig() {
    return {
        apiAddress: "https://api-elrond-devnet.ashswap.io",
        apiTimeout: 10000

    }
}

let proxyProvider: ProxyNetworkProvider | null = null;
export const getProxyNetworkProvider = () => {
    const network = getNetworkConfig();
    if (!proxyProvider) {
        proxyProvider = new ProxyNetworkProvider(network.apiAddress, {
            timeout: +network.apiTimeout,
        });
    }
    return proxyProvider;
};
let apiProvider: ApiNetworkProvider | null = null;
export const getApiNetworkProvider = () => {
    const network = getNetworkConfig();
    if (!apiProvider) {
        apiProvider = new ApiNetworkProvider(network.apiAddress, {
            timeout: +network.apiTimeout,
        });
    }
    return apiProvider;
};

let elrondProxyProvider: ElrondProxyProvider | null = null;
export const getElrondProxyProvider = () => {
    const network = getNetworkConfig();
    if (!elrondProxyProvider) {
        elrondProxyProvider = new ElrondProxyProvider(network.apiAddress, {timeout: +network.apiTimeout});
    }
    return elrondProxyProvider;
};
