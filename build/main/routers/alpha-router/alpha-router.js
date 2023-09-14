"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaRouter = exports.MapWithLowerCaseKey = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const providers_1 = require("@ethersproject/providers");
const default_token_list_1 = __importDefault(require("@uniswap/default-token-list"));
const router_sdk_1 = require("@uniswap/router-sdk");
const sdk_core_1 = require("@uniswap/sdk-core");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const async_retry_1 = __importDefault(require("async-retry"));
const jsbi_1 = __importDefault(require("jsbi"));
const lodash_1 = __importDefault(require("lodash"));
const node_cache_1 = __importDefault(require("node-cache"));
const providers_2 = require("../../providers");
const caching_token_list_provider_1 = require("../../providers/caching-token-list-provider");
const token_provider_1 = require("../../providers/token-provider");
const token_validator_provider_1 = require("../../providers/token-validator-provider");
const pool_provider_1 = require("../../providers/v2/pool-provider");
const gas_data_provider_1 = require("../../providers/v3/gas-data-provider");
const pool_provider_2 = require("../../providers/v3/pool-provider");
const Erc20__factory_1 = require("../../types/other/factories/Erc20__factory");
const util_1 = require("../../util");
const amounts_1 = require("../../util/amounts");
const chains_1 = require("../../util/chains");
const gas_factory_helpers_1 = require("../../util/gas-factory-helpers");
const log_1 = require("../../util/log");
const methodParameters_1 = require("../../util/methodParameters");
const metric_1 = require("../../util/metric");
const unsupported_tokens_1 = require("../../util/unsupported-tokens");
const router_1 = require("../router");
const config_1 = require("./config");
const best_swap_route_1 = require("./functions/best-swap-route");
const calculate_ratio_amount_in_1 = require("./functions/calculate-ratio-amount-in");
const get_candidate_pools_1 = require("./functions/get-candidate-pools");
const mixed_route_heuristic_gas_model_1 = require("./gas-models/mixedRoute/mixed-route-heuristic-gas-model");
const v2_heuristic_gas_model_1 = require("./gas-models/v2/v2-heuristic-gas-model");
const gas_costs_1 = require("./gas-models/v3/gas-costs");
const v3_heuristic_gas_model_1 = require("./gas-models/v3/v3-heuristic-gas-model");
const quoters_1 = require("./quoters");
class MapWithLowerCaseKey extends Map {
    set(key, value) {
        return super.set(key.toLowerCase(), value);
    }
}
exports.MapWithLowerCaseKey = MapWithLowerCaseKey;
class AlphaRouter {
    constructor({ chainId, provider, multicall2Provider, v3PoolProvider, onChainQuoteProvider, v2PoolProvider, v2QuoteProvider, v2SubgraphProvider, tokenProvider, blockedTokenListProvider, v3SubgraphProvider, gasPriceProvider, v3GasModelFactory, v2GasModelFactory, mixedRouteGasModelFactory, swapRouterProvider, optimismGasDataProvider, tokenValidatorProvider, arbitrumGasDataProvider, simulator, routeCachingProvider, }) {
        this.chainId = chainId;
        this.provider = provider;
        this.multicall2Provider =
            multicall2Provider !== null && multicall2Provider !== void 0 ? multicall2Provider : new providers_2.UniswapMulticallProvider(chainId, provider, 375000);
        this.v3PoolProvider =
            v3PoolProvider !== null && v3PoolProvider !== void 0 ? v3PoolProvider : new providers_2.CachingV3PoolProvider(this.chainId, new pool_provider_2.V3PoolProvider((0, chains_1.ID_TO_CHAIN_ID)(chainId), this.multicall2Provider), new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 360, useClones: false })));
        this.simulator = simulator;
        this.routeCachingProvider = routeCachingProvider;
        if (onChainQuoteProvider) {
            this.onChainQuoteProvider = onChainQuoteProvider;
        }
        else {
            switch (chainId) {
                case sdk_core_1.ChainId.OPTIMISM:
                case sdk_core_1.ChainId.OPTIMISM_GOERLI:
                    this.onChainQuoteProvider = new providers_2.OnChainQuoteProvider(chainId, provider, this.multicall2Provider, {
                        retries: 2,
                        minTimeout: 100,
                        maxTimeout: 1000,
                    }, {
                        multicallChunk: 110,
                        gasLimitPerCall: 1200000,
                        quoteMinSuccessRate: 0.1,
                    }, {
                        gasLimitOverride: 3000000,
                        multicallChunk: 45,
                    }, {
                        gasLimitOverride: 3000000,
                        multicallChunk: 45,
                    }, {
                        baseBlockOffset: -10,
                        rollback: {
                            enabled: true,
                            attemptsBeforeRollback: 1,
                            rollbackBlockOffset: -10,
                        },
                    });
                    break;
                case sdk_core_1.ChainId.BASE:
                case sdk_core_1.ChainId.BASE_GOERLI:
                    this.onChainQuoteProvider = new providers_2.OnChainQuoteProvider(chainId, provider, this.multicall2Provider, {
                        retries: 2,
                        minTimeout: 100,
                        maxTimeout: 1000,
                    }, {
                        multicallChunk: 80,
                        gasLimitPerCall: 1200000,
                        quoteMinSuccessRate: 0.1,
                    }, {
                        gasLimitOverride: 3000000,
                        multicallChunk: 45,
                    }, {
                        gasLimitOverride: 3000000,
                        multicallChunk: 45,
                    }, {
                        baseBlockOffset: -10,
                        rollback: {
                            enabled: true,
                            attemptsBeforeRollback: 1,
                            rollbackBlockOffset: -10,
                        },
                    });
                    break;
                case sdk_core_1.ChainId.ARBITRUM_ONE:
                case sdk_core_1.ChainId.ARBITRUM_GOERLI:
                    this.onChainQuoteProvider = new providers_2.OnChainQuoteProvider(chainId, provider, this.multicall2Provider, {
                        retries: 2,
                        minTimeout: 100,
                        maxTimeout: 1000,
                    }, {
                        multicallChunk: 10,
                        gasLimitPerCall: 12000000,
                        quoteMinSuccessRate: 0.1,
                    }, {
                        gasLimitOverride: 30000000,
                        multicallChunk: 6,
                    }, {
                        gasLimitOverride: 30000000,
                        multicallChunk: 6,
                    });
                    break;
                case sdk_core_1.ChainId.CELO:
                case sdk_core_1.ChainId.CELO_ALFAJORES:
                    this.onChainQuoteProvider = new providers_2.OnChainQuoteProvider(chainId, provider, this.multicall2Provider, {
                        retries: 2,
                        minTimeout: 100,
                        maxTimeout: 1000,
                    }, {
                        multicallChunk: 10,
                        gasLimitPerCall: 5000000,
                        quoteMinSuccessRate: 0.1,
                    }, {
                        gasLimitOverride: 5000000,
                        multicallChunk: 5,
                    }, {
                        gasLimitOverride: 6250000,
                        multicallChunk: 4,
                    });
                    break;
                default:
                    this.onChainQuoteProvider = new providers_2.OnChainQuoteProvider(chainId, provider, this.multicall2Provider, {
                        retries: 2,
                        minTimeout: 100,
                        maxTimeout: 1000,
                    }, {
                        multicallChunk: 210,
                        gasLimitPerCall: 705000,
                        quoteMinSuccessRate: 0.15,
                    }, {
                        gasLimitOverride: 2000000,
                        multicallChunk: 70,
                    });
                    break;
            }
        }
        this.v2PoolProvider =
            v2PoolProvider !== null && v2PoolProvider !== void 0 ? v2PoolProvider : new providers_2.CachingV2PoolProvider(chainId, new pool_provider_1.V2PoolProvider(chainId, this.multicall2Provider), new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 60, useClones: false })));
        this.v2QuoteProvider = v2QuoteProvider !== null && v2QuoteProvider !== void 0 ? v2QuoteProvider : new providers_2.V2QuoteProvider();
        this.blockedTokenListProvider =
            blockedTokenListProvider !== null && blockedTokenListProvider !== void 0 ? blockedTokenListProvider : new caching_token_list_provider_1.CachingTokenListProvider(chainId, unsupported_tokens_1.UNSUPPORTED_TOKENS, new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 3600, useClones: false })));
        this.tokenProvider =
            tokenProvider !== null && tokenProvider !== void 0 ? tokenProvider : new providers_2.CachingTokenProviderWithFallback(chainId, new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 3600, useClones: false })), new caching_token_list_provider_1.CachingTokenListProvider(chainId, default_token_list_1.default, new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 3600, useClones: false }))), new token_provider_1.TokenProvider(chainId, this.multicall2Provider));
        const chainName = (0, chains_1.ID_TO_NETWORK_NAME)(chainId);
        // ipfs urls in the following format: `https://cloudflare-ipfs.com/ipns/api.uniswap.org/v1/pools/${protocol}/${chainName}.json`;
        if (v2SubgraphProvider) {
            this.v2SubgraphProvider = v2SubgraphProvider;
        }
        else {
            this.v2SubgraphProvider = new providers_2.V2SubgraphProviderWithFallBacks([
                new providers_2.CachingV2SubgraphProvider(chainId, new providers_2.URISubgraphProvider(chainId, `https://cloudflare-ipfs.com/ipns/api.uniswap.org/v1/pools/v2/${chainName}.json`, undefined, 0), new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 300, useClones: false }))),
                new providers_2.StaticV2SubgraphProvider(chainId),
            ]);
        }
        if (v3SubgraphProvider) {
            this.v3SubgraphProvider = v3SubgraphProvider;
        }
        else {
            this.v3SubgraphProvider = new providers_2.V3SubgraphProviderWithFallBacks([
                new providers_2.CachingV3SubgraphProvider(chainId, new providers_2.URISubgraphProvider(chainId, `https://cloudflare-ipfs.com/ipns/api.uniswap.org/v1/pools/v3/${chainName}.json`, undefined, 0), new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 300, useClones: false }))),
                new providers_2.StaticV3SubgraphProvider(chainId, this.v3PoolProvider),
            ]);
        }
        let gasPriceProviderInstance;
        if (providers_1.JsonRpcProvider.isProvider(this.provider)) {
            gasPriceProviderInstance = new providers_2.OnChainGasPriceProvider(chainId, new providers_2.EIP1559GasPriceProvider(this.provider), new providers_2.LegacyGasPriceProvider(this.provider));
        }
        else {
            gasPriceProviderInstance = new providers_2.ETHGasStationInfoProvider(config_1.ETH_GAS_STATION_API_URL);
        }
        this.gasPriceProvider =
            gasPriceProvider !== null && gasPriceProvider !== void 0 ? gasPriceProvider : new providers_2.CachingGasStationProvider(chainId, gasPriceProviderInstance, new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 7, useClones: false })));
        this.v3GasModelFactory =
            v3GasModelFactory !== null && v3GasModelFactory !== void 0 ? v3GasModelFactory : new v3_heuristic_gas_model_1.V3HeuristicGasModelFactory();
        this.v2GasModelFactory =
            v2GasModelFactory !== null && v2GasModelFactory !== void 0 ? v2GasModelFactory : new v2_heuristic_gas_model_1.V2HeuristicGasModelFactory();
        this.mixedRouteGasModelFactory =
            mixedRouteGasModelFactory !== null && mixedRouteGasModelFactory !== void 0 ? mixedRouteGasModelFactory : new mixed_route_heuristic_gas_model_1.MixedRouteHeuristicGasModelFactory();
        this.swapRouterProvider =
            swapRouterProvider !== null && swapRouterProvider !== void 0 ? swapRouterProvider : new providers_2.SwapRouterProvider(this.multicall2Provider, this.chainId);
        if (chainId === sdk_core_1.ChainId.OPTIMISM || chainId === sdk_core_1.ChainId.BASE) {
            this.l2GasDataProvider =
                optimismGasDataProvider !== null && optimismGasDataProvider !== void 0 ? optimismGasDataProvider : new gas_data_provider_1.OptimismGasDataProvider(chainId, this.multicall2Provider);
        }
        if (chainId === sdk_core_1.ChainId.ARBITRUM_ONE ||
            chainId === sdk_core_1.ChainId.ARBITRUM_GOERLI) {
            this.l2GasDataProvider =
                arbitrumGasDataProvider !== null && arbitrumGasDataProvider !== void 0 ? arbitrumGasDataProvider : new gas_data_provider_1.ArbitrumGasDataProvider(chainId, this.provider);
        }
        if (tokenValidatorProvider) {
            this.tokenValidatorProvider = tokenValidatorProvider;
        }
        else if (this.chainId === sdk_core_1.ChainId.MAINNET) {
            this.tokenValidatorProvider = new token_validator_provider_1.TokenValidatorProvider(this.chainId, this.multicall2Provider, new providers_2.NodeJSCache(new node_cache_1.default({ stdTTL: 30000, useClones: false })));
        }
        // Initialize the Quoters.
        // Quoters are an abstraction encapsulating the business logic of fetching routes and quotes.
        this.v2Quoter = new quoters_1.V2Quoter(this.v2SubgraphProvider, this.v2PoolProvider, this.v2QuoteProvider, this.v2GasModelFactory, this.tokenProvider, this.chainId, this.blockedTokenListProvider, this.tokenValidatorProvider);
        this.v3Quoter = new quoters_1.V3Quoter(this.v3SubgraphProvider, this.v3PoolProvider, this.onChainQuoteProvider, this.tokenProvider, this.chainId, this.blockedTokenListProvider, this.tokenValidatorProvider);
        this.mixedQuoter = new quoters_1.MixedQuoter(this.v3SubgraphProvider, this.v3PoolProvider, this.v2SubgraphProvider, this.v2PoolProvider, this.onChainQuoteProvider, this.tokenProvider, this.chainId, this.blockedTokenListProvider, this.tokenValidatorProvider);
    }
    async routeToRatio(token0Balance, token1Balance, position, swapAndAddConfig, swapAndAddOptions, routingConfig = (0, config_1.DEFAULT_ROUTING_CONFIG_BY_CHAIN)(this.chainId)) {
        if (token1Balance.currency.wrapped.sortsBefore(token0Balance.currency.wrapped)) {
            [token0Balance, token1Balance] = [token1Balance, token0Balance];
        }
        let preSwapOptimalRatio = this.calculateOptimalRatio(position, position.pool.sqrtRatioX96, true);
        // set up parameters according to which token will be swapped
        let zeroForOne;
        if (position.pool.tickCurrent > position.tickUpper) {
            zeroForOne = true;
        }
        else if (position.pool.tickCurrent < position.tickLower) {
            zeroForOne = false;
        }
        else {
            zeroForOne = new sdk_core_1.Fraction(token0Balance.quotient, token1Balance.quotient).greaterThan(preSwapOptimalRatio);
            if (!zeroForOne)
                preSwapOptimalRatio = preSwapOptimalRatio.invert();
        }
        const [inputBalance, outputBalance] = zeroForOne
            ? [token0Balance, token1Balance]
            : [token1Balance, token0Balance];
        let optimalRatio = preSwapOptimalRatio;
        let postSwapTargetPool = position.pool;
        let exchangeRate = zeroForOne
            ? position.pool.token0Price
            : position.pool.token1Price;
        let swap = null;
        let ratioAchieved = false;
        let n = 0;
        // iterate until we find a swap with a sufficient ratio or return null
        while (!ratioAchieved) {
            n++;
            if (n > swapAndAddConfig.maxIterations) {
                log_1.log.info('max iterations exceeded');
                return {
                    status: router_1.SwapToRatioStatus.NO_ROUTE_FOUND,
                    error: 'max iterations exceeded',
                };
            }
            const amountToSwap = (0, calculate_ratio_amount_in_1.calculateRatioAmountIn)(optimalRatio, exchangeRate, inputBalance, outputBalance);
            if (amountToSwap.equalTo(0)) {
                log_1.log.info(`no swap needed: amountToSwap = 0`);
                return {
                    status: router_1.SwapToRatioStatus.NO_SWAP_NEEDED,
                };
            }
            swap = await this.route(amountToSwap, outputBalance.currency, sdk_core_1.TradeType.EXACT_INPUT, undefined, Object.assign(Object.assign(Object.assign({}, (0, config_1.DEFAULT_ROUTING_CONFIG_BY_CHAIN)(this.chainId)), routingConfig), { 
                /// @dev We do not want to query for mixedRoutes for routeToRatio as they are not supported
                /// [Protocol.V3, Protocol.V2] will make sure we only query for V3 and V2
                protocols: [router_sdk_1.Protocol.V3, router_sdk_1.Protocol.V2] }));
            if (!swap) {
                log_1.log.info('no route found from this.route()');
                return {
                    status: router_1.SwapToRatioStatus.NO_ROUTE_FOUND,
                    error: 'no route found',
                };
            }
            const inputBalanceUpdated = inputBalance.subtract(swap.trade.inputAmount);
            const outputBalanceUpdated = outputBalance.add(swap.trade.outputAmount);
            const newRatio = inputBalanceUpdated.divide(outputBalanceUpdated);
            let targetPoolPriceUpdate;
            swap.route.forEach((route) => {
                if (route.protocol === router_sdk_1.Protocol.V3) {
                    const v3Route = route;
                    v3Route.route.pools.forEach((pool, i) => {
                        if (pool.token0.equals(position.pool.token0) &&
                            pool.token1.equals(position.pool.token1) &&
                            pool.fee === position.pool.fee) {
                            targetPoolPriceUpdate = jsbi_1.default.BigInt(v3Route.sqrtPriceX96AfterList[i].toString());
                            optimalRatio = this.calculateOptimalRatio(position, jsbi_1.default.BigInt(targetPoolPriceUpdate.toString()), zeroForOne);
                        }
                    });
                }
            });
            if (!targetPoolPriceUpdate) {
                optimalRatio = preSwapOptimalRatio;
            }
            ratioAchieved =
                newRatio.equalTo(optimalRatio) ||
                    this.absoluteValue(newRatio.asFraction.divide(optimalRatio).subtract(1)).lessThan(swapAndAddConfig.ratioErrorTolerance);
            if (ratioAchieved && targetPoolPriceUpdate) {
                postSwapTargetPool = new v3_sdk_1.Pool(position.pool.token0, position.pool.token1, position.pool.fee, targetPoolPriceUpdate, position.pool.liquidity, v3_sdk_1.TickMath.getTickAtSqrtRatio(targetPoolPriceUpdate), position.pool.tickDataProvider);
            }
            exchangeRate = swap.trade.outputAmount.divide(swap.trade.inputAmount);
            log_1.log.info({
                exchangeRate: exchangeRate.asFraction.toFixed(18),
                optimalRatio: optimalRatio.asFraction.toFixed(18),
                newRatio: newRatio.asFraction.toFixed(18),
                inputBalanceUpdated: inputBalanceUpdated.asFraction.toFixed(18),
                outputBalanceUpdated: outputBalanceUpdated.asFraction.toFixed(18),
                ratioErrorTolerance: swapAndAddConfig.ratioErrorTolerance.toFixed(18),
                iterationN: n.toString(),
            }, 'QuoteToRatio Iteration Parameters');
            if (exchangeRate.equalTo(0)) {
                log_1.log.info('exchangeRate to 0');
                return {
                    status: router_1.SwapToRatioStatus.NO_ROUTE_FOUND,
                    error: 'insufficient liquidity to swap to optimal ratio',
                };
            }
        }
        if (!swap) {
            return {
                status: router_1.SwapToRatioStatus.NO_ROUTE_FOUND,
                error: 'no route found',
            };
        }
        let methodParameters;
        if (swapAndAddOptions) {
            methodParameters = await this.buildSwapAndAddMethodParameters(swap.trade, swapAndAddOptions, {
                initialBalanceTokenIn: inputBalance,
                initialBalanceTokenOut: outputBalance,
                preLiquidityPosition: position,
            });
        }
        return {
            status: router_1.SwapToRatioStatus.SUCCESS,
            result: Object.assign(Object.assign({}, swap), { methodParameters, optimalRatio, postSwapTargetPool }),
        };
    }
    /**
     * @inheritdoc IRouter
     */
    async route(amount, quoteCurrency, tradeType, swapConfig, partialRoutingConfig = {}) {
        var _a, _c, _d, _e;
        const { currencyIn, currencyOut } = this.determineCurrencyInOutFromTradeType(tradeType, amount, quoteCurrency);
        const tokenIn = currencyIn.wrapped;
        const tokenOut = currencyOut.wrapped;
        metric_1.metric.setProperty('chainId', this.chainId);
        metric_1.metric.setProperty('pair', `${tokenIn.symbol}/${tokenOut.symbol}`);
        metric_1.metric.setProperty('tokenIn', tokenIn.address);
        metric_1.metric.setProperty('tokenOut', tokenOut.address);
        metric_1.metric.setProperty('tradeType', tradeType === sdk_core_1.TradeType.EXACT_INPUT ? 'ExactIn' : 'ExactOut');
        metric_1.metric.putMetric(`QuoteRequestedForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
        // Get a block number to specify in all our calls. Ensures data we fetch from chain is
        // from the same block.
        const blockNumber = (_a = partialRoutingConfig.blockNumber) !== null && _a !== void 0 ? _a : this.getBlockNumberPromise();
        const routingConfig = lodash_1.default.merge({
            // These settings could be changed by the partialRoutingConfig
            useCachedRoutes: true,
            writeToCachedRoutes: true,
            optimisticCachedRoutes: false,
        }, (0, config_1.DEFAULT_ROUTING_CONFIG_BY_CHAIN)(this.chainId), partialRoutingConfig, { blockNumber });
        if (routingConfig.debugRouting) {
            log_1.log.warn(`Finalized routing config is ${JSON.stringify(routingConfig)}`);
        }
        const gasPriceWei = await this.getGasPriceWei();
        const quoteToken = quoteCurrency.wrapped;
        const [v3GasModel, mixedRouteGasModel] = await this.getGasModels(gasPriceWei, amount.currency.wrapped, quoteToken, { blockNumber, additionalGasOverhead: (0, gas_costs_1.NATIVE_OVERHEAD)(this.chainId, amount.currency, quoteCurrency) });
        // Create a Set to sanitize the protocols input, a Set of undefined becomes an empty set,
        // Then create an Array from the values of that Set.
        const protocols = Array.from(new Set(routingConfig.protocols).values());
        const cacheMode = (_c = routingConfig.overwriteCacheMode) !== null && _c !== void 0 ? _c : await ((_d = this.routeCachingProvider) === null || _d === void 0 ? void 0 : _d.getCacheMode(this.chainId, amount, quoteToken, tradeType, protocols));
        // Fetch CachedRoutes
        let cachedRoutes;
        if (routingConfig.useCachedRoutes && cacheMode !== providers_2.CacheMode.Darkmode) {
            cachedRoutes = await ((_e = this.routeCachingProvider) === null || _e === void 0 ? void 0 : _e.getCachedRoute(this.chainId, amount, quoteToken, tradeType, protocols, await blockNumber, routingConfig.optimisticCachedRoutes));
        }
        metric_1.metric.putMetric(routingConfig.useCachedRoutes ? 'GetQuoteUsingCachedRoutes' : 'GetQuoteNotUsingCachedRoutes', 1, metric_1.MetricLoggerUnit.Count);
        if (cacheMode && routingConfig.useCachedRoutes && cacheMode !== providers_2.CacheMode.Darkmode && !cachedRoutes) {
            metric_1.metric.putMetric(`GetCachedRoute_miss_${cacheMode}`, 1, metric_1.MetricLoggerUnit.Count);
            log_1.log.info({
                tokenIn: tokenIn.symbol,
                tokenInAddress: tokenIn.address,
                tokenOut: tokenOut.symbol,
                tokenOutAddress: tokenOut.address,
                cacheMode,
                amount: amount.toExact(),
                chainId: this.chainId,
                tradeType: this.tradeTypeStr(tradeType)
            }, `GetCachedRoute miss ${cacheMode} for ${this.tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType)}`);
        }
        else if (cachedRoutes && routingConfig.useCachedRoutes) {
            metric_1.metric.putMetric(`GetCachedRoute_hit_${cacheMode}`, 1, metric_1.MetricLoggerUnit.Count);
            log_1.log.info({
                tokenIn: tokenIn.symbol,
                tokenInAddress: tokenIn.address,
                tokenOut: tokenOut.symbol,
                tokenOutAddress: tokenOut.address,
                cacheMode,
                amount: amount.toExact(),
                chainId: this.chainId,
                tradeType: this.tradeTypeStr(tradeType)
            }, `GetCachedRoute hit ${cacheMode} for ${this.tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType)}`);
        }
        let swapRouteFromCachePromise = Promise.resolve(null);
        if (cachedRoutes) {
            swapRouteFromCachePromise = this.getSwapRouteFromCache(cachedRoutes, await blockNumber, amount, quoteToken, tradeType, routingConfig, v3GasModel, mixedRouteGasModel, gasPriceWei);
        }
        let swapRouteFromChainPromise = Promise.resolve(null);
        if (!cachedRoutes || cacheMode !== providers_2.CacheMode.Livemode) {
            swapRouteFromChainPromise = this.getSwapRouteFromChain(amount, tokenIn, tokenOut, protocols, quoteToken, tradeType, routingConfig, v3GasModel, mixedRouteGasModel, gasPriceWei);
        }
        const [swapRouteFromCache, swapRouteFromChain] = await Promise.all([
            swapRouteFromCachePromise,
            swapRouteFromChainPromise
        ]);
        let swapRouteRaw;
        let hitsCachedRoute = false;
        if (cacheMode === providers_2.CacheMode.Livemode && swapRouteFromCache) {
            log_1.log.info(`CacheMode is ${cacheMode}, and we are using swapRoute from cache`);
            hitsCachedRoute = true;
            swapRouteRaw = swapRouteFromCache;
        }
        else {
            log_1.log.info(`CacheMode is ${cacheMode}, and we are using materialized swapRoute`);
            swapRouteRaw = swapRouteFromChain;
        }
        if (cacheMode === providers_2.CacheMode.Tapcompare && swapRouteFromCache && swapRouteFromChain) {
            const quoteDiff = swapRouteFromChain.quote.subtract(swapRouteFromCache.quote);
            const quoteGasAdjustedDiff = swapRouteFromChain.quoteGasAdjusted.subtract(swapRouteFromCache.quoteGasAdjusted);
            const gasUsedDiff = swapRouteFromChain.estimatedGasUsed.sub(swapRouteFromCache.estimatedGasUsed);
            // Only log if quoteDiff is different from 0, or if quoteGasAdjustedDiff and gasUsedDiff are both different from 0
            if (!quoteDiff.equalTo(0) || !(quoteGasAdjustedDiff.equalTo(0) || gasUsedDiff.eq(0))) {
                // Calculates the percentage of the difference with respect to the quoteFromChain (not from cache)
                const misquotePercent = quoteGasAdjustedDiff.divide(swapRouteFromChain.quoteGasAdjusted).multiply(100);
                metric_1.metric.putMetric(`TapcompareCachedRoute_quoteGasAdjustedDiffPercent`, Number(misquotePercent.toExact()), metric_1.MetricLoggerUnit.Percent);
                log_1.log.warn({
                    quoteFromChain: swapRouteFromChain.quote.toExact(),
                    quoteFromCache: swapRouteFromCache.quote.toExact(),
                    quoteDiff: quoteDiff.toExact(),
                    quoteGasAdjustedFromChain: swapRouteFromChain.quoteGasAdjusted.toExact(),
                    quoteGasAdjustedFromCache: swapRouteFromCache.quoteGasAdjusted.toExact(),
                    quoteGasAdjustedDiff: quoteGasAdjustedDiff.toExact(),
                    gasUsedFromChain: swapRouteFromChain.estimatedGasUsed.toString(),
                    gasUsedFromCache: swapRouteFromCache.estimatedGasUsed.toString(),
                    gasUsedDiff: gasUsedDiff.toString(),
                    routesFromChain: swapRouteFromChain.routes.toString(),
                    routesFromCache: swapRouteFromCache.routes.toString(),
                    amount: amount.toExact(),
                    originalAmount: cachedRoutes === null || cachedRoutes === void 0 ? void 0 : cachedRoutes.originalAmount,
                    pair: this.tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType),
                    blockNumber
                }, `Comparing quotes between Chain and Cache for ${this.tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType)}`);
            }
        }
        if (!swapRouteRaw) {
            return null;
        }
        const { quote, quoteGasAdjusted, estimatedGasUsed, routes: routeAmounts, estimatedGasUsedQuoteToken, estimatedGasUsedUSD, } = swapRouteRaw;
        if (this.routeCachingProvider &&
            routingConfig.writeToCachedRoutes &&
            cacheMode !== providers_2.CacheMode.Darkmode &&
            swapRouteFromChain) {
            // Generate the object to be cached
            const routesToCache = providers_2.CachedRoutes.fromRoutesWithValidQuotes(swapRouteFromChain.routes, this.chainId, tokenIn, tokenOut, protocols.sort(), // sort it for consistency in the order of the protocols.
            await blockNumber, tradeType, amount.toExact());
            if (routesToCache) {
                // Attempt to insert the entry in cache. This is fire and forget promise.
                // The catch method will prevent any exception from blocking the normal code execution.
                this.routeCachingProvider.setCachedRoute(routesToCache, amount).then((success) => {
                    const status = success ? 'success' : 'rejected';
                    metric_1.metric.putMetric(`SetCachedRoute_${status}`, 1, metric_1.MetricLoggerUnit.Count);
                }).catch((reason) => {
                    log_1.log.error({
                        reason: reason,
                        tokenPair: this.tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType),
                    }, `SetCachedRoute failure`);
                    metric_1.metric.putMetric(`SetCachedRoute_failure`, 1, metric_1.MetricLoggerUnit.Count);
                });
            }
            else {
                metric_1.metric.putMetric(`SetCachedRoute_unnecessary`, 1, metric_1.MetricLoggerUnit.Count);
            }
        }
        metric_1.metric.putMetric(`QuoteFoundForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
        // Build Trade object that represents the optimal swap.
        const trade = (0, methodParameters_1.buildTrade)(currencyIn, currencyOut, tradeType, routeAmounts);
        let methodParameters;
        // If user provided recipient, deadline etc. we also generate the calldata required to execute
        // the swap and return it too.
        if (swapConfig) {
            methodParameters = (0, methodParameters_1.buildSwapMethodParameters)(trade, swapConfig, this.chainId);
        }
        const swapRoute = {
            quote,
            quoteGasAdjusted,
            estimatedGasUsed,
            estimatedGasUsedQuoteToken,
            estimatedGasUsedUSD,
            gasPriceWei,
            route: routeAmounts,
            trade,
            methodParameters,
            blockNumber: bignumber_1.BigNumber.from(await blockNumber),
            hitsCachedRoute: hitsCachedRoute,
        };
        if (swapConfig &&
            swapConfig.simulate &&
            methodParameters &&
            methodParameters.calldata) {
            if (!this.simulator) {
                throw new Error('Simulator not initialized!');
            }
            log_1.log.info({ swapConfig, methodParameters }, 'Starting simulation');
            const fromAddress = swapConfig.simulate.fromAddress;
            const beforeSimulate = Date.now();
            const swapRouteWithSimulation = await this.simulator.simulate(fromAddress, swapConfig, swapRoute, amount, 
            // Quote will be in WETH even if quoteCurrency is ETH
            // So we init a new CurrencyAmount object here
            amounts_1.CurrencyAmount.fromRawAmount(quoteCurrency, quote.quotient.toString()), this.l2GasDataProvider
                ? await this.l2GasDataProvider.getGasData()
                : undefined, { blockNumber });
            metric_1.metric.putMetric('SimulateTransaction', Date.now() - beforeSimulate, metric_1.MetricLoggerUnit.Milliseconds);
            return swapRouteWithSimulation;
        }
        return swapRoute;
    }
    async getSwapRouteFromCache(cachedRoutes, blockNumber, amount, quoteToken, tradeType, routingConfig, v3GasModel, mixedRouteGasModel, gasPriceWei) {
        log_1.log.info({
            protocols: cachedRoutes.protocolsCovered,
            tradeType: cachedRoutes.tradeType,
            cachedBlockNumber: cachedRoutes.blockNumber,
            quoteBlockNumber: blockNumber,
        }, 'Routing across CachedRoute');
        const quotePromises = [];
        const v3Routes = cachedRoutes.routes.filter((route) => route.protocol === router_sdk_1.Protocol.V3);
        const v2Routes = cachedRoutes.routes.filter((route) => route.protocol === router_sdk_1.Protocol.V2);
        const mixedRoutes = cachedRoutes.routes.filter((route) => route.protocol === router_sdk_1.Protocol.MIXED);
        let percents;
        let amounts;
        if (cachedRoutes.routes.length > 1) {
            // If we have more than 1 route, we will quote the different percents for it, following the regular process
            [percents, amounts] = this.getAmountDistribution(amount, routingConfig);
        }
        else if (cachedRoutes.routes.length == 1) {
            [percents, amounts] = [[100], [amount]];
        }
        else {
            // In this case this means that there's no route, so we return null
            return Promise.resolve(null);
        }
        if (v3Routes.length > 0) {
            const v3RoutesFromCache = v3Routes.map((cachedRoute) => cachedRoute.route);
            metric_1.metric.putMetric('SwapRouteFromCache_V3_GetQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetQuotes = Date.now();
            quotePromises.push(this.v3Quoter.getQuotes(v3RoutesFromCache, amounts, percents, quoteToken, tradeType, routingConfig, undefined, v3GasModel).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromCache_V3_GetQuotes_Load`, Date.now() - beforeGetQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            }));
        }
        if (v2Routes.length > 0) {
            const v2RoutesFromCache = v2Routes.map((cachedRoute) => cachedRoute.route);
            metric_1.metric.putMetric('SwapRouteFromCache_V2_GetQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetQuotes = Date.now();
            quotePromises.push(this.v2Quoter.refreshRoutesThenGetQuotes(cachedRoutes.tokenIn, cachedRoutes.tokenOut, v2RoutesFromCache, amounts, percents, quoteToken, tradeType, routingConfig, gasPriceWei).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromCache_V2_GetQuotes_Load`, Date.now() - beforeGetQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            }));
        }
        if (mixedRoutes.length > 0) {
            const mixedRoutesFromCache = mixedRoutes.map((cachedRoute) => cachedRoute.route);
            metric_1.metric.putMetric('SwapRouteFromCache_Mixed_GetQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetQuotes = Date.now();
            quotePromises.push(this.mixedQuoter.getQuotes(mixedRoutesFromCache, amounts, percents, quoteToken, tradeType, routingConfig, undefined, mixedRouteGasModel).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromCache_Mixed_GetQuotes_Load`, Date.now() - beforeGetQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            }));
        }
        const getQuotesResults = await Promise.all(quotePromises);
        const allRoutesWithValidQuotes = lodash_1.default.flatMap(getQuotesResults, (quoteResult) => quoteResult.routesWithValidQuotes);
        return (0, best_swap_route_1.getBestSwapRoute)(amount, percents, allRoutesWithValidQuotes, tradeType, this.chainId, routingConfig, v3GasModel);
    }
    async getSwapRouteFromChain(amount, tokenIn, tokenOut, protocols, quoteToken, tradeType, routingConfig, v3GasModel, mixedRouteGasModel, gasPriceWei) {
        // Generate our distribution of amounts, i.e. fractions of the input amount.
        // We will get quotes for fractions of the input amount for different routes, then
        // combine to generate split routes.
        const [percents, amounts] = this.getAmountDistribution(amount, routingConfig);
        const noProtocolsSpecified = protocols.length === 0;
        const v3ProtocolSpecified = protocols.includes(router_sdk_1.Protocol.V3);
        const v2ProtocolSpecified = protocols.includes(router_sdk_1.Protocol.V2);
        const v2SupportedInChain = chains_1.V2_SUPPORTED.includes(this.chainId);
        const shouldQueryMixedProtocol = protocols.includes(router_sdk_1.Protocol.MIXED) || (noProtocolsSpecified && v2SupportedInChain);
        const mixedProtocolAllowed = [sdk_core_1.ChainId.MAINNET, sdk_core_1.ChainId.GOERLI].includes(this.chainId) &&
            tradeType === sdk_core_1.TradeType.EXACT_INPUT;
        const beforeGetCandidates = Date.now();
        let v3CandidatePoolsPromise = Promise.resolve(undefined);
        if (v3ProtocolSpecified ||
            noProtocolsSpecified ||
            (shouldQueryMixedProtocol && mixedProtocolAllowed)) {
            v3CandidatePoolsPromise = (0, get_candidate_pools_1.getV3CandidatePools)({
                tokenIn,
                tokenOut,
                tokenProvider: this.tokenProvider,
                blockedTokenListProvider: this.blockedTokenListProvider,
                poolProvider: this.v3PoolProvider,
                routeType: tradeType,
                subgraphProvider: this.v3SubgraphProvider,
                routingConfig,
                chainId: this.chainId,
            }).then((candidatePools) => {
                metric_1.metric.putMetric('GetV3CandidatePools', Date.now() - beforeGetCandidates, metric_1.MetricLoggerUnit.Milliseconds);
                return candidatePools;
            });
        }
        let v2CandidatePoolsPromise = Promise.resolve(undefined);
        if ((v2SupportedInChain && (v2ProtocolSpecified || noProtocolsSpecified)) ||
            (shouldQueryMixedProtocol && mixedProtocolAllowed)) {
            // Fetch all the pools that we will consider routing via. There are thousands
            // of pools, so we filter them to a set of candidate pools that we expect will
            // result in good prices.
            v2CandidatePoolsPromise = (0, get_candidate_pools_1.getV2CandidatePools)({
                tokenIn,
                tokenOut,
                tokenProvider: this.tokenProvider,
                blockedTokenListProvider: this.blockedTokenListProvider,
                poolProvider: this.v2PoolProvider,
                routeType: tradeType,
                subgraphProvider: this.v2SubgraphProvider,
                routingConfig,
                chainId: this.chainId,
            }).then((candidatePools) => {
                metric_1.metric.putMetric('GetV2CandidatePools', Date.now() - beforeGetCandidates, metric_1.MetricLoggerUnit.Milliseconds);
                return candidatePools;
            });
        }
        const quotePromises = [];
        // Maybe Quote V3 - if V3 is specified, or no protocol is specified
        if (v3ProtocolSpecified || noProtocolsSpecified) {
            log_1.log.info({ protocols, tradeType }, 'Routing across V3');
            metric_1.metric.putMetric('SwapRouteFromChain_V3_GetRoutesThenQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetRoutesThenQuotes = Date.now();
            quotePromises.push(v3CandidatePoolsPromise.then((v3CandidatePools) => this.v3Quoter.getRoutesThenQuotes(tokenIn, tokenOut, amount, amounts, percents, quoteToken, v3CandidatePools, tradeType, routingConfig, v3GasModel).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromChain_V3_GetRoutesThenQuotes_Load`, Date.now() - beforeGetRoutesThenQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            })));
        }
        // Maybe Quote V2 - if V2 is specified, or no protocol is specified AND v2 is supported in this chain
        if (v2SupportedInChain && (v2ProtocolSpecified || noProtocolsSpecified)) {
            log_1.log.info({ protocols, tradeType }, 'Routing across V2');
            metric_1.metric.putMetric('SwapRouteFromChain_V2_GetRoutesThenQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetRoutesThenQuotes = Date.now();
            quotePromises.push(v2CandidatePoolsPromise.then((v2CandidatePools) => this.v2Quoter.getRoutesThenQuotes(tokenIn, tokenOut, amount, amounts, percents, quoteToken, v2CandidatePools, tradeType, routingConfig, undefined, gasPriceWei).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromChain_V2_GetRoutesThenQuotes_Load`, Date.now() - beforeGetRoutesThenQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            })));
        }
        // Maybe Quote mixed routes
        // if MixedProtocol is specified or no protocol is specified and v2 is supported AND tradeType is ExactIn
        // AND is Mainnet or Gorli
        if (shouldQueryMixedProtocol && mixedProtocolAllowed) {
            log_1.log.info({ protocols, tradeType }, 'Routing across MixedRoutes');
            metric_1.metric.putMetric('SwapRouteFromChain_Mixed_GetRoutesThenQuotes_Request', 1, metric_1.MetricLoggerUnit.Count);
            const beforeGetRoutesThenQuotes = Date.now();
            quotePromises.push(Promise.all([v3CandidatePoolsPromise, v2CandidatePoolsPromise]).then(([v3CandidatePools, v2CandidatePools]) => this.mixedQuoter.getRoutesThenQuotes(tokenIn, tokenOut, amount, amounts, percents, quoteToken, [v3CandidatePools, v2CandidatePools], tradeType, routingConfig, mixedRouteGasModel).then((result) => {
                metric_1.metric.putMetric(`SwapRouteFromChain_Mixed_GetRoutesThenQuotes_Load`, Date.now() - beforeGetRoutesThenQuotes, metric_1.MetricLoggerUnit.Milliseconds);
                return result;
            })));
        }
        const getQuotesResults = await Promise.all(quotePromises);
        const allRoutesWithValidQuotes = [];
        const allCandidatePools = [];
        getQuotesResults.forEach((getQuoteResult) => {
            allRoutesWithValidQuotes.push(...getQuoteResult.routesWithValidQuotes);
            if (getQuoteResult.candidatePools) {
                allCandidatePools.push(getQuoteResult.candidatePools);
            }
        });
        if (allRoutesWithValidQuotes.length === 0) {
            log_1.log.info({ allRoutesWithValidQuotes }, 'Received no valid quotes');
            return null;
        }
        // Given all the quotes for all the amounts for all the routes, find the best combination.
        const bestSwapRoute = await (0, best_swap_route_1.getBestSwapRoute)(amount, percents, allRoutesWithValidQuotes, tradeType, this.chainId, routingConfig, v3GasModel);
        if (bestSwapRoute) {
            this.emitPoolSelectionMetrics(bestSwapRoute, allCandidatePools);
        }
        return bestSwapRoute;
    }
    tradeTypeStr(tradeType) {
        return tradeType === sdk_core_1.TradeType.EXACT_INPUT ? 'ExactIn' : 'ExactOut';
    }
    tokenPairSymbolTradeTypeChainId(tokenIn, tokenOut, tradeType) {
        return `${tokenIn.symbol}/${tokenOut.symbol}/${this.tradeTypeStr(tradeType)}/${this.chainId}`;
    }
    determineCurrencyInOutFromTradeType(tradeType, amount, quoteCurrency) {
        if (tradeType === sdk_core_1.TradeType.EXACT_INPUT) {
            return {
                currencyIn: amount.currency,
                currencyOut: quoteCurrency
            };
        }
        else {
            return {
                currencyIn: quoteCurrency,
                currencyOut: amount.currency
            };
        }
    }
    async getGasPriceWei() {
        // Track how long it takes to resolve this async call.
        const beforeGasTimestamp = Date.now();
        // Get an estimate of the gas price to use when estimating gas cost of different routes.
        const { gasPriceWei } = await this.gasPriceProvider.getGasPrice();
        metric_1.metric.putMetric('GasPriceLoad', Date.now() - beforeGasTimestamp, metric_1.MetricLoggerUnit.Milliseconds);
        return gasPriceWei;
    }
    async getGasModels(gasPriceWei, amountToken, quoteToken, providerConfig) {
        const beforeGasModel = Date.now();
        const usdPoolPromise = (0, gas_factory_helpers_1.getHighestLiquidityV3USDPool)(this.chainId, this.v3PoolProvider, providerConfig);
        const nativeCurrency = util_1.WRAPPED_NATIVE_CURRENCY[this.chainId];
        const nativeQuoteTokenV3PoolPromise = !quoteToken.equals(nativeCurrency) ? (0, gas_factory_helpers_1.getHighestLiquidityV3NativePool)(quoteToken, this.v3PoolProvider, providerConfig) : Promise.resolve(null);
        const nativeAmountTokenV3PoolPromise = !amountToken.equals(nativeCurrency) ? (0, gas_factory_helpers_1.getHighestLiquidityV3NativePool)(amountToken, this.v3PoolProvider, providerConfig) : Promise.resolve(null);
        const [usdPool, nativeQuoteTokenV3Pool, nativeAmountTokenV3Pool] = await Promise.all([
            usdPoolPromise,
            nativeQuoteTokenV3PoolPromise,
            nativeAmountTokenV3PoolPromise
        ]);
        const pools = {
            usdPool: usdPool,
            nativeQuoteTokenV3Pool: nativeQuoteTokenV3Pool,
            nativeAmountTokenV3Pool: nativeAmountTokenV3Pool
        };
        const v3GasModelPromise = this.v3GasModelFactory.buildGasModel({
            chainId: this.chainId,
            gasPriceWei,
            pools,
            amountToken,
            quoteToken,
            v2poolProvider: this.v2PoolProvider,
            l2GasDataProvider: this.l2GasDataProvider,
            providerConfig: providerConfig
        });
        const mixedRouteGasModelPromise = this.mixedRouteGasModelFactory.buildGasModel({
            chainId: this.chainId,
            gasPriceWei,
            pools,
            amountToken,
            quoteToken,
            v2poolProvider: this.v2PoolProvider,
            providerConfig: providerConfig
        });
        const [v3GasModel, mixedRouteGasModel] = await Promise.all([
            v3GasModelPromise,
            mixedRouteGasModelPromise
        ]);
        metric_1.metric.putMetric('GasModelCreation', Date.now() - beforeGasModel, metric_1.MetricLoggerUnit.Milliseconds);
        return [v3GasModel, mixedRouteGasModel];
    }
    // Note multiplications here can result in a loss of precision in the amounts (e.g. taking 50% of 101)
    // This is reconcilled at the end of the algorithm by adding any lost precision to one of
    // the splits in the route.
    getAmountDistribution(amount, routingConfig) {
        const { distributionPercent } = routingConfig;
        const percents = [];
        const amounts = [];
        for (let i = 1; i <= 100 / distributionPercent; i++) {
            percents.push(i * distributionPercent);
            amounts.push(amount.multiply(new sdk_core_1.Fraction(i * distributionPercent, 100)));
        }
        return [percents, amounts];
    }
    async buildSwapAndAddMethodParameters(trade, swapAndAddOptions, swapAndAddParameters) {
        const { swapOptions: { recipient, slippageTolerance, deadline, inputTokenPermit }, addLiquidityOptions: addLiquidityConfig, } = swapAndAddOptions;
        const preLiquidityPosition = swapAndAddParameters.preLiquidityPosition;
        const finalBalanceTokenIn = swapAndAddParameters.initialBalanceTokenIn.subtract(trade.inputAmount);
        const finalBalanceTokenOut = swapAndAddParameters.initialBalanceTokenOut.add(trade.outputAmount);
        const approvalTypes = await this.swapRouterProvider.getApprovalType(finalBalanceTokenIn, finalBalanceTokenOut);
        const zeroForOne = finalBalanceTokenIn.currency.wrapped.sortsBefore(finalBalanceTokenOut.currency.wrapped);
        return Object.assign(Object.assign({}, router_sdk_1.SwapRouter.swapAndAddCallParameters(trade, {
            recipient,
            slippageTolerance,
            deadlineOrPreviousBlockhash: deadline,
            inputTokenPermit,
        }, v3_sdk_1.Position.fromAmounts({
            pool: preLiquidityPosition.pool,
            tickLower: preLiquidityPosition.tickLower,
            tickUpper: preLiquidityPosition.tickUpper,
            amount0: zeroForOne
                ? finalBalanceTokenIn.quotient.toString()
                : finalBalanceTokenOut.quotient.toString(),
            amount1: zeroForOne
                ? finalBalanceTokenOut.quotient.toString()
                : finalBalanceTokenIn.quotient.toString(),
            useFullPrecision: false,
        }), addLiquidityConfig, approvalTypes.approvalTokenIn, approvalTypes.approvalTokenOut)), { to: (0, util_1.SWAP_ROUTER_02_ADDRESSES)(this.chainId) });
    }
    emitPoolSelectionMetrics(swapRouteRaw, allPoolsBySelection) {
        const poolAddressesUsed = new Set();
        const { routes: routeAmounts } = swapRouteRaw;
        (0, lodash_1.default)(routeAmounts)
            .flatMap((routeAmount) => {
            const { poolAddresses } = routeAmount;
            return poolAddresses;
        })
            .forEach((address) => {
            poolAddressesUsed.add(address.toLowerCase());
        });
        for (const poolsBySelection of allPoolsBySelection) {
            const { protocol } = poolsBySelection;
            lodash_1.default.forIn(poolsBySelection.selections, (pools, topNSelection) => {
                const topNUsed = lodash_1.default.findLastIndex(pools, (pool) => poolAddressesUsed.has(pool.id.toLowerCase())) + 1;
                metric_1.metric.putMetric(lodash_1.default.capitalize(`${protocol}${topNSelection}`), topNUsed, metric_1.MetricLoggerUnit.Count);
            });
        }
        let hasV3Route = false;
        let hasV2Route = false;
        let hasMixedRoute = false;
        for (const routeAmount of routeAmounts) {
            if (routeAmount.protocol === router_sdk_1.Protocol.V3) {
                hasV3Route = true;
            }
            if (routeAmount.protocol === router_sdk_1.Protocol.V2) {
                hasV2Route = true;
            }
            if (routeAmount.protocol === router_sdk_1.Protocol.MIXED) {
                hasMixedRoute = true;
            }
        }
        if (hasMixedRoute && (hasV3Route || hasV2Route)) {
            if (hasV3Route && hasV2Route) {
                metric_1.metric.putMetric(`MixedAndV3AndV2SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`MixedAndV3AndV2SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
            else if (hasV3Route) {
                metric_1.metric.putMetric(`MixedAndV3SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`MixedAndV3SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
            else if (hasV2Route) {
                metric_1.metric.putMetric(`MixedAndV2SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`MixedAndV2SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
        }
        else if (hasV3Route && hasV2Route) {
            metric_1.metric.putMetric(`V3AndV2SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
            metric_1.metric.putMetric(`V3AndV2SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
        }
        else if (hasMixedRoute) {
            if (routeAmounts.length > 1) {
                metric_1.metric.putMetric(`MixedSplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`MixedSplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
            else {
                metric_1.metric.putMetric(`MixedRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`MixedRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
        }
        else if (hasV3Route) {
            if (routeAmounts.length > 1) {
                metric_1.metric.putMetric(`V3SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`V3SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
            else {
                metric_1.metric.putMetric(`V3Route`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`V3RouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
        }
        else if (hasV2Route) {
            if (routeAmounts.length > 1) {
                metric_1.metric.putMetric(`V2SplitRoute`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`V2SplitRouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
            else {
                metric_1.metric.putMetric(`V2Route`, 1, metric_1.MetricLoggerUnit.Count);
                metric_1.metric.putMetric(`V2RouteForChain${this.chainId}`, 1, metric_1.MetricLoggerUnit.Count);
            }
        }
    }
    calculateOptimalRatio(position, sqrtRatioX96, zeroForOne) {
        const upperSqrtRatioX96 = v3_sdk_1.TickMath.getSqrtRatioAtTick(position.tickUpper);
        const lowerSqrtRatioX96 = v3_sdk_1.TickMath.getSqrtRatioAtTick(position.tickLower);
        // returns Fraction(0, 1) for any out of range position regardless of zeroForOne. Implication: function
        // cannot be used to determine the trading direction of out of range positions.
        if (jsbi_1.default.greaterThan(sqrtRatioX96, upperSqrtRatioX96) ||
            jsbi_1.default.lessThan(sqrtRatioX96, lowerSqrtRatioX96)) {
            return new sdk_core_1.Fraction(0, 1);
        }
        const precision = jsbi_1.default.BigInt('1' + '0'.repeat(18));
        let optimalRatio = new sdk_core_1.Fraction(v3_sdk_1.SqrtPriceMath.getAmount0Delta(sqrtRatioX96, upperSqrtRatioX96, precision, true), v3_sdk_1.SqrtPriceMath.getAmount1Delta(sqrtRatioX96, lowerSqrtRatioX96, precision, true));
        if (!zeroForOne)
            optimalRatio = optimalRatio.invert();
        return optimalRatio;
    }
    async userHasSufficientBalance(fromAddress, tradeType, amount, quote) {
        try {
            const neededBalance = tradeType === sdk_core_1.TradeType.EXACT_INPUT ? amount : quote;
            let balance;
            if (neededBalance.currency.isNative) {
                balance = await this.provider.getBalance(fromAddress);
            }
            else {
                const tokenContract = Erc20__factory_1.Erc20__factory.connect(neededBalance.currency.address, this.provider);
                balance = await tokenContract.balanceOf(fromAddress);
            }
            return balance.gte(bignumber_1.BigNumber.from(neededBalance.quotient.toString()));
        }
        catch (e) {
            log_1.log.error(e, 'Error while checking user balance');
            return false;
        }
    }
    absoluteValue(fraction) {
        const numeratorAbs = jsbi_1.default.lessThan(fraction.numerator, jsbi_1.default.BigInt(0))
            ? jsbi_1.default.unaryMinus(fraction.numerator)
            : fraction.numerator;
        const denominatorAbs = jsbi_1.default.lessThan(fraction.denominator, jsbi_1.default.BigInt(0))
            ? jsbi_1.default.unaryMinus(fraction.denominator)
            : fraction.denominator;
        return new sdk_core_1.Fraction(numeratorAbs, denominatorAbs);
    }
    getBlockNumberPromise() {
        return (0, async_retry_1.default)(async (_b, attempt) => {
            if (attempt > 1) {
                log_1.log.info(`Get block number attempt ${attempt}`);
            }
            return this.provider.getBlockNumber();
        }, {
            retries: 2,
            minTimeout: 100,
            maxTimeout: 1000,
        });
    }
}
exports.AlphaRouter = AlphaRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxwaGEtcm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2FscGhhLXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBcUQ7QUFDckQsd0RBQXlFO0FBQ3pFLHFGQUE2RDtBQUM3RCxvREFBa0U7QUFDbEUsZ0RBQWtGO0FBRWxGLDRDQUEwRTtBQUMxRSw4REFBZ0M7QUFDaEMsZ0RBQXdCO0FBQ3hCLG9EQUF1QjtBQUN2Qiw0REFBbUM7QUFFbkMsK0NBNkJ5QjtBQUN6Qiw2RkFBMkc7QUFHM0csbUVBQStFO0FBQy9FLHVGQUE0RztBQUM1RyxvRUFBbUY7QUFDbkYsNEVBTThDO0FBQzlDLG9FQUFtRjtBQUVuRiwrRUFBNEU7QUFDNUUscUNBQStFO0FBQy9FLGdEQUFvRDtBQUNwRCw4Q0FBcUY7QUFDckYsd0VBQStHO0FBQy9HLHdDQUFxQztBQUNyQyxrRUFBb0Y7QUFDcEYsOENBQTZEO0FBQzdELHNFQUFtRTtBQUNuRSxzQ0FjbUI7QUFFbkIscUNBQW9GO0FBTXBGLGlFQUE4RTtBQUM5RSxxRkFBK0U7QUFDL0UseUVBT3lDO0FBT3pDLDZHQUE2RztBQUM3RyxtRkFBb0Y7QUFDcEYseURBQTREO0FBQzVELG1GQUFvRjtBQUNwRix1Q0FBNkU7QUF3RzdFLE1BQWEsbUJBQXVCLFNBQVEsR0FBYztJQUMvQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVE7UUFDaEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFKRCxrREFJQztBQXFJRCxNQUFhLFdBQVc7SUE2QnRCLFlBQVksRUFDVixPQUFPLEVBQ1AsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFB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