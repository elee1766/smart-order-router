import { BigNumber } from '@ethersproject/bignumber';
import { ChainId, Token } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';

import { ProviderConfig } from '../../../providers/provider';
import {
  CUSD_CELO,
  CUSD_CELO_ALFAJORES,
  DAI_ARBITRUM,
  DAI_AVAX,
  DAI_BNB,
  DAI_GOERLI,
  DAI_HEMI,
  DAI_LINEA,
  DAI_MAINNET,
  DAI_OPTIMISM,
  DAI_OPTIMISM_GOERLI,
  DAI_POLYGON_MUMBAI,
  DAI_POLYGON_ZKEVM,
  DAI_SCROLL,
  DAI_SEPOLIA,
  USDB_BLAST,
  USDC_ARBITRUM,
  USDC_ARBITRUM_GOERLI,
  USDC_AVAX,
  USDC_BASE,
  USDC_BNB,
  USDC_BOB,
  USDC_BOBA,
  USDC_CORN,
  USDC_FILECOIN,
  USDC_GNOSIS,
  USDC_GOAT,
  USDC_GOERLI,
  USDC_HEMI,
  USDC_LIGHTLINK,
  USDC_LINEA,
  USDC_MAINNET,
  USDC_MANTA,
  USDC_MANTLE,
  USDC_MC_MOONBEAM,
  USDC_METAL,
  USDC_MOONBEAM,
  USDC_OPTIMISM,
  USDC_OPTIMISM_GOERLI,
  USDC_POLYGON,
  USDC_POLYGON_ZKEVM,
  USDC_REDBELLY,
  USDC_SAGA,
  USDC_SCROLL,
  USDC_SEI,
  USDC_SEI_TESTNET,
  USDC_SEPOLIA,
  USDC_SONIC,
  USDC_TAIKO,
  USDC_TELOS,
  USDC_WORLDCHAIN,
  USDC_XDC,
  USDC_XLAYER,
  USDC_ZKLINK,
  USDC_ZKSYNC,
  USDT_ARBITRUM,
  USDT_BNB,
  USDT_BOB,
  USDT_GNOSIS,
  USDT_GOAT,
  USDT_GOERLI,
  USDT_HEMI,
  USDT_LIGHTLINK,
  USDT_LISK,
  USDT_MAINNET,
  USDT_MANTA,
  USDT_MANTLE,
  USDT_OPTIMISM,
  USDT_OPTIMISM_GOERLI,
  USDT_POLYGON_ZKEVM,
  USDT_REDBELLY,
  USDT_ROOTSTOCK,
  USDT_SAGA,
  USDT_SCROLL,
  USDT_TELOS,
  USDT_XLAYER,
  USDT_ZKLINK,
  USDT_ZKSYNC,
  WBTC_GOERLI,
} from '../../../providers/token-provider';
import { IV2PoolProvider } from '../../../providers/v2/pool-provider';
import {
  ArbitrumGasData,
  IL2GasDataProvider,
  OptimismGasData,
} from '../../../providers/v3/gas-data-provider';
import { CurrencyAmount } from '../../../util/amounts';
import {
  MixedRouteWithValidQuote,
  RouteWithValidQuote,
  V2RouteWithValidQuote,
  V3RouteWithValidQuote,
} from '../entities/route-with-valid-quote';

// When adding new usd gas tokens, ensure the tokens are ordered
// from tokens with highest decimals to lowest decimals. For example,
// DAI_AVAX has 18 decimals and comes before USDC_AVAX which has 6 decimals.
export const usdGasTokensByChain: { [chainId in ChainId]?: Token[] } = {
  [ChainId.MAINNET]: [DAI_MAINNET, USDC_MAINNET, USDT_MAINNET],
  [ChainId.ARBITRUM_ONE]: [DAI_ARBITRUM, USDC_ARBITRUM, USDT_ARBITRUM],
  [ChainId.OPTIMISM]: [DAI_OPTIMISM, USDC_OPTIMISM, USDT_OPTIMISM],
  [ChainId.OPTIMISM_GOERLI]: [
    DAI_OPTIMISM_GOERLI,
    USDC_OPTIMISM_GOERLI,
    USDT_OPTIMISM_GOERLI,
  ],
  [ChainId.ARBITRUM_GOERLI]: [USDC_ARBITRUM_GOERLI],
  [ChainId.GOERLI]: [DAI_GOERLI, USDC_GOERLI, USDT_GOERLI, WBTC_GOERLI],
  [ChainId.SEPOLIA]: [USDC_SEPOLIA, DAI_SEPOLIA],
  [ChainId.POLYGON]: [USDC_POLYGON],
  [ChainId.POLYGON_MUMBAI]: [DAI_POLYGON_MUMBAI],
  [ChainId.CELO]: [CUSD_CELO],
  [ChainId.CELO_ALFAJORES]: [CUSD_CELO_ALFAJORES],
  [ChainId.GNOSIS]: [USDC_GNOSIS, USDT_GNOSIS],
  [ChainId.XLAYER]: [USDC_XLAYER, USDT_XLAYER],
  [ChainId.MOONBEAM]: [USDC_MOONBEAM, USDC_MC_MOONBEAM],
  [ChainId.ZKLINK]: [USDC_ZKLINK, USDT_ZKLINK],
  [ChainId.ZKSYNC]: [USDC_ZKSYNC, USDT_ZKSYNC],
  [ChainId.WORLDCHAIN]: [USDC_WORLDCHAIN],
  [ChainId.BOB]: [USDC_BOB, USDT_BOB],
  [ChainId.LISK]: [USDT_LISK],
  [ChainId.TAIKO]: [USDC_TAIKO],
  [ChainId.SEI]: [USDC_SEI],
  [ChainId.MANTLE]: [USDC_MANTLE, USDT_MANTLE],
  [ChainId.SEI_TESTNET]: [USDC_SEI_TESTNET],
  [ChainId.LINEA]: [USDC_LINEA, DAI_LINEA],
  [ChainId.BLAST]: [USDB_BLAST],
  [ChainId.MANTA]: [USDC_MANTA, USDT_MANTA],
  [ChainId.POLYGON_ZKEVM]: [
    USDC_POLYGON_ZKEVM,
    USDT_POLYGON_ZKEVM,
    DAI_POLYGON_ZKEVM,
  ],
  [ChainId.FILECOIN]: [USDC_FILECOIN],
  [ChainId.ROOTSTOCK]: [USDT_ROOTSTOCK],
  [ChainId.SCROLL]: [USDC_SCROLL, USDT_SCROLL, DAI_SCROLL],
  [ChainId.BNB]: [USDT_BNB, USDC_BNB, DAI_BNB],
  [ChainId.AVALANCHE]: [USDC_AVAX, DAI_AVAX],
  [ChainId.BOBA]: [USDC_BOBA],
  [ChainId.AVALANCHE]: [DAI_AVAX, USDC_AVAX],
  [ChainId.BASE]: [USDC_BASE],
  [ChainId.METAL]: [USDC_METAL],
  [ChainId.CORN]: [USDC_CORN],
  [ChainId.SONIC]: [USDC_SONIC],
  [ChainId.XDC]: [USDC_XDC],
  [ChainId.TELOS]: [USDC_TELOS, USDT_TELOS],
  [ChainId.HEMI]: [USDC_HEMI, USDT_HEMI, DAI_HEMI],
  [ChainId.GOAT]: [USDC_GOAT, USDT_GOAT],
  [ChainId.REDBELLY]: [USDC_REDBELLY, USDT_REDBELLY],
  [ChainId.SAGA]: [USDC_SAGA, USDT_SAGA],
  [ChainId.LIGHTLINK]: [USDC_LIGHTLINK, USDT_LIGHTLINK],
};

export type L1ToL2GasCosts = {
  gasUsedL1: BigNumber;
  gasCostL1USD: CurrencyAmount;
  gasCostL1QuoteToken: CurrencyAmount;
};

export type BuildOnChainGasModelFactoryType = {
  chainId: ChainId;
  gasPriceWei: BigNumber;
  pools: LiquidityCalculationPools;
  amountToken: Token;
  quoteToken: Token;
  v2poolProvider: IV2PoolProvider;
  l2GasDataProvider?:
  | IL2GasDataProvider<OptimismGasData>
  | IL2GasDataProvider<ArbitrumGasData>;
  providerConfig?: ProviderConfig;
};

export type BuildV2GasModelFactoryType = {
  chainId: ChainId;
  gasPriceWei: BigNumber;
  poolProvider: IV2PoolProvider;
  token: Token;
  providerConfig?: ProviderConfig;
};

export type LiquidityCalculationPools = {
  usdPool: Pool;
  nativeQuoteTokenV3Pool: Pool | null;
  nativeAmountTokenV3Pool: Pool | null;
};

/**
 * Contains functions for generating gas estimates for given routes.
 *
 * We generally compute gas estimates off-chain because
 *  1/ Calling eth_estimateGas for a swaps requires the caller to have
 *     the full balance token being swapped, and approvals.
 *  2/ Tracking gas used using a wrapper contract is not accurate with Multicall
 *     due to EIP-2929
 *  3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.
 *
 * Generally these models should be optimized to return quickly by performing any
 * long running operations (like fetching external data) outside of the functions defined.
 * This is because the functions in the model are called once for every route and every
 * amount that is considered in the algorithm so it is important to minimize the number of
 * long running operations.
 */
export type IGasModel<TRouteWithValidQuote extends RouteWithValidQuote> = {
  estimateGasCost(routeWithValidQuote: TRouteWithValidQuote): {
    gasEstimate: BigNumber;
    gasCostInToken: CurrencyAmount;
    gasCostInUSD: CurrencyAmount;
  };
  calculateL1GasFees?(routes: TRouteWithValidQuote[]): Promise<L1ToL2GasCosts>;
};

/**
 * Factory for building gas models that can be used with any route to generate
 * gas estimates.
 *
 * Factory model is used so that any supporting data can be fetched once and
 * returned as part of the model.
 *
 * @export
 * @abstract
 * @class IV2GasModelFactory
 */
export abstract class IV2GasModelFactory {
  public abstract buildGasModel({
    chainId,
    gasPriceWei,
    poolProvider,
    token,
    providerConfig,
  }: BuildV2GasModelFactoryType): Promise<IGasModel<V2RouteWithValidQuote>>;
}

/**
 * Factory for building gas models that can be used with any route to generate
 * gas estimates.
 *
 * Factory model is used so that any supporting data can be fetched once and
 * returned as part of the model.
 *
 * @export
 * @abstract
 * @class IOnChainGasModelFactory
 */
export abstract class IOnChainGasModelFactory {
  public abstract buildGasModel({
    chainId,
    gasPriceWei,
    pools,
    amountToken,
    quoteToken,
    v2poolProvider,
    l2GasDataProvider,
    providerConfig,
  }: BuildOnChainGasModelFactoryType): Promise<
    IGasModel<V3RouteWithValidQuote | MixedRouteWithValidQuote>
  >;
}
