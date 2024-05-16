import {
  ChainId,
  Currency,
  Ether,
  NativeCurrency,
  Token,
} from '@uniswap/sdk-core';

// WIP: Gnosis, Moonbeam
export const SUPPORTED_CHAINS: ChainId[] = [
  ChainId.MAINNET,
  ChainId.OPTIMISM,
  ChainId.OPTIMISM_GOERLI,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_GOERLI,
  ChainId.POLYGON,
  ChainId.POLYGON_MUMBAI,
  ChainId.GOERLI,
  ChainId.SEPOLIA,
  ChainId.CELO_ALFAJORES,
  ChainId.CELO,
  ChainId.BNB,
  ChainId.AVALANCHE,
  ChainId.MOONBEAM,
  ChainId.ZKSYNC,
  ChainId.MANTLE,
  ChainId.SEI_TESTNET,
  ChainId.LINEA,
  ChainId.BLAST,
  ChainId.MANTA,
  ChainId.POLYGON_ZKEVM,
  ChainId.FILECOIN,
  ChainId.ROOTSTOCK,
  ChainId.SCROLL,
  ChainId.BOBA,
  ChainId.BASE,
  // Gnosis don't yet have contracts deployed yet
];

export const V2_SUPPORTED = [ChainId.MAINNET, ChainId.GOERLI, ChainId.SEPOLIA];

export const HAS_L1_FEE = [
  ChainId.OPTIMISM,
  ChainId.OPTIMISM_GOERLI,
  ChainId.ARBITRUM_ONE,
  ChainId.ARBITRUM_GOERLI,
  ChainId.BOBA,
  ChainId.BASE,
  ChainId.BASE_GOERLI,
];

export const NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = [
  ChainId.MAINNET,
  ChainId.GOERLI,
  ChainId.OPTIMISM,
  ChainId.ARBITRUM_ONE,
  ChainId.POLYGON,
  ChainId.POLYGON_MUMBAI,
];

export const ID_TO_CHAIN_ID = (id: number): ChainId => {
  switch (id) {
    case 1:
      return ChainId.MAINNET;
    case 5:
      return ChainId.GOERLI;
    case 11155111:
      return ChainId.SEPOLIA;
    case 56:
      return ChainId.BNB;
    case 10:
      return ChainId.OPTIMISM;
    case 288:
      return ChainId.BOBA;
    case 420:
      return ChainId.OPTIMISM_GOERLI;
    case 42161:
      return ChainId.ARBITRUM_ONE;
    case 421613:
      return ChainId.ARBITRUM_GOERLI;
    case 137:
      return ChainId.POLYGON;
    case 80001:
      return ChainId.POLYGON_MUMBAI;
    case 42220:
      return ChainId.CELO;
    case 44787:
      return ChainId.CELO_ALFAJORES;
    case 100:
      return ChainId.GNOSIS;
    case 1284:
      return ChainId.MOONBEAM;
    case 324:
      return ChainId.ZKSYNC;
    case 5000:
      return ChainId.MANTLE;
    case 713715:
      return ChainId.SEI_TESTNET;
    case 59144:
      return ChainId.LINEA;
    case 81457:
      return ChainId.BLAST;
    case 169:
      return ChainId.MANTA;
    case 1101:
      return ChainId.POLYGON_ZKEVM;
    case 314:
      return ChainId.FILECOIN;
    case 30:
      return ChainId.ROOTSTOCK;
    case 534352:
      return ChainId.SCROLL;
    case 43114:
      return ChainId.AVALANCHE;
    case 8453:
      return ChainId.BASE;
    case 84531:
      return ChainId.BASE_GOERLI;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export enum ChainName {
  MAINNET = 'mainnet',
  GOERLI = 'goerli',
  SEPOLIA = 'sepolia',
  OPTIMISM = 'optimism-mainnet',
  OPTIMISM_GOERLI = 'optimism-goerli',
  ARBITRUM_ONE = 'arbitrum-mainnet',
  ARBITRUM_GOERLI = 'arbitrum-goerli',
  POLYGON = 'polygon-mainnet',
  POLYGON_MUMBAI = 'polygon-mumbai',
  CELO = 'celo-mainnet',
  CELO_ALFAJORES = 'celo-alfajores',
  GNOSIS = 'gnosis-mainnet',
  MOONBEAM = 'moonbeam-mainnet',
  ZKSYNC = 'zksync',
  MANTLE = 'mantle',
  SEI_TESTNET = 'sei-testnet',
  LINEA = 'linea',
  BLAST = 'blast',
  MANTA = 'manta-pacific',
  POLYGON_ZKEVM = 'polygon-zkevm',
  FILECOIN = 'filecoin',
  ROOTSTOCK = 'rootstock',
  SCROLL = 'scroll',
  BNB = 'bnb-mainnet',
  AVALANCHE = 'avalanche-mainnet',
  BOBA = 'boba-mainnet',
  BASE = 'base-mainnet',
  BASE_GOERLI = 'base-goerli',
}

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = 'ETH',
  MATIC = 'MATIC',
  CELO = 'CELO',
  GNOSIS = 'XDAI',
  MOONBEAM = 'GLMR',
  ZKSYNC = 'ETH',
  MANTLE = 'MNT',
  SEI_TESTNET = 'SEI',
  LINEA = 'ETH',
  BLAST = 'ETH',
  MANTA = 'ETH',
  POLYGON_ZKEVM = 'ETH',
  FILECOIN = 'FIL',
  ROOTSTOCK = 'RBTC',
  SCROLL = 'ETH',
  BNB = 'BNB',
  AVALANCHE = 'AVAX',
  BOBA = 'BOBA',
}

export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.MAINNET]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.GOERLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.SEPOLIA]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.OPTIMISM]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.OPTIMISM_GOERLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ARBITRUM_ONE]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.ARBITRUM_GOERLI]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.POLYGON]: ['MATIC', '0x0000000000000000000000000000000000001010'],
  [ChainId.POLYGON_MUMBAI]: [
    'MATIC',
    '0x0000000000000000000000000000000000001010',
  ],
  [ChainId.CELO]: ['CELO'],
  [ChainId.CELO_ALFAJORES]: ['CELO'],
  [ChainId.GNOSIS]: ['XDAI'],
  [ChainId.MOONBEAM]: ['GLMR'],
  [ChainId.ZKSYNC]: ['ETH'],
  [ChainId.MANTLE]: ['MNT'],
  [ChainId.SEI_TESTNET]: ['SEI'],
  [ChainId.LINEA]: ['ETH'],
  [ChainId.BLAST]: ['ETH'],
  [ChainId.MANTA]: ['ETH'],
  [ChainId.POLYGON_ZKEVM]: ['ETH'],
  [ChainId.FILECOIN]: ['FIL'],
  [ChainId.ROOTSTOCK]: ['RBTC'],
  [ChainId.SCROLL]: ['ETH'],
  [ChainId.BNB]: ['BNB', 'BNB', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  [ChainId.AVALANCHE]: [
    'AVAX',
    'AVALANCHE',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.BOBA]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.BASE]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
};

export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrencyName } = {
  [ChainId.MAINNET]: NativeCurrencyName.ETHER,
  [ChainId.GOERLI]: NativeCurrencyName.ETHER,
  [ChainId.SEPOLIA]: NativeCurrencyName.ETHER,
  [ChainId.OPTIMISM]: NativeCurrencyName.ETHER,
  [ChainId.OPTIMISM_GOERLI]: NativeCurrencyName.ETHER,
  [ChainId.ARBITRUM_ONE]: NativeCurrencyName.ETHER,
  [ChainId.ARBITRUM_GOERLI]: NativeCurrencyName.ETHER,
  [ChainId.POLYGON]: NativeCurrencyName.MATIC,
  [ChainId.POLYGON_MUMBAI]: NativeCurrencyName.MATIC,
  [ChainId.CELO]: NativeCurrencyName.CELO,
  [ChainId.CELO_ALFAJORES]: NativeCurrencyName.CELO,
  [ChainId.GNOSIS]: NativeCurrencyName.GNOSIS,
  [ChainId.MOONBEAM]: NativeCurrencyName.MOONBEAM,
  [ChainId.ZKSYNC]: NativeCurrencyName.ZKSYNC,
  [ChainId.MANTLE]: NativeCurrencyName.MANTLE,
  [ChainId.SEI_TESTNET]: NativeCurrencyName.SEI_TESTNET,
  [ChainId.LINEA]: NativeCurrencyName.LINEA,
  [ChainId.BLAST]: NativeCurrencyName.BLAST,
  [ChainId.MANTA]: NativeCurrencyName.MANTA,
  [ChainId.POLYGON_ZKEVM]: NativeCurrencyName.POLYGON_ZKEVM,
  [ChainId.FILECOIN]: NativeCurrencyName.FILECOIN,
  [ChainId.ROOTSTOCK]: NativeCurrencyName.ROOTSTOCK,
  [ChainId.SCROLL]: NativeCurrencyName.SCROLL,
  [ChainId.BNB]: NativeCurrencyName.BNB,
  [ChainId.AVALANCHE]: NativeCurrencyName.AVALANCHE,
  [ChainId.BOBA]: NativeCurrencyName.BOBA,
  [ChainId.BASE]: NativeCurrencyName.ETHER,
};

export const ID_TO_NETWORK_NAME = (id: number): ChainName => {
  switch (id) {
    case 1:
      return ChainName.MAINNET;
    case 5:
      return ChainName.GOERLI;
    case 11155111:
      return ChainName.SEPOLIA;
    case 56:
      return ChainName.BNB;
    case 10:
      return ChainName.OPTIMISM;
    case 420:
      return ChainName.OPTIMISM_GOERLI;
    case 42161:
      return ChainName.ARBITRUM_ONE;
    case 421613:
      return ChainName.ARBITRUM_GOERLI;
    case 137:
      return ChainName.POLYGON;
    case 80001:
      return ChainName.POLYGON_MUMBAI;
    case 42220:
      return ChainName.CELO;
    case 44787:
      return ChainName.CELO_ALFAJORES;
    case 100:
      return ChainName.GNOSIS;
    case 1284:
      return ChainName.MOONBEAM;
    case 324:
      return ChainName.ZKSYNC;
    case 5000:
      return ChainName.MANTLE;
    case 713715:
      return ChainName.SEI_TESTNET;
    case 59144:
      return ChainName.LINEA;
    case 81457:
      return ChainName.BLAST;
    case 169:
      return ChainName.MANTA;
    case 1101:
      return ChainName.POLYGON_ZKEVM;
    case 314:
      return ChainName.FILECOIN;
    case 30:
      return ChainName.ROOTSTOCK;
    case 534352:
      return ChainName.SCROLL;
    case 288:
      return ChainName.BOBA;
    case 43114:
      return ChainName.AVALANCHE;
    case 8453:
      return ChainName.BASE;
    case 84531:
      return ChainName.BASE_GOERLI;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export const CHAIN_IDS_LIST = Object.values(ChainId).map((c) =>
  c.toString()
) as string[];

export const ID_TO_PROVIDER = (id: ChainId): string => {
  switch (id) {
    case ChainId.MAINNET:
      return process.env.JSON_RPC_PROVIDER!;
    case ChainId.GOERLI:
      return process.env.JSON_RPC_PROVIDER_GORLI!;
    case ChainId.SEPOLIA:
      return process.env.JSON_RPC_PROVIDER_SEPOLIA!;
    case ChainId.OPTIMISM:
      return process.env.JSON_RPC_PROVIDER_OPTIMISM!;
    case ChainId.OPTIMISM_GOERLI:
      return process.env.JSON_RPC_PROVIDER_OPTIMISM_GOERLI!;
    case ChainId.ARBITRUM_ONE:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_ONE!;
    case ChainId.ARBITRUM_GOERLI:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_GOERLI!;
    case ChainId.POLYGON:
      return process.env.JSON_RPC_PROVIDER_POLYGON!;
    case ChainId.POLYGON_MUMBAI:
      return process.env.JSON_RPC_PROVIDER_POLYGON_MUMBAI!;
    case ChainId.CELO:
      return process.env.JSON_RPC_PROVIDER_CELO!;
    case ChainId.CELO_ALFAJORES:
      return process.env.JSON_RPC_PROVIDER_CELO_ALFAJORES!;
    case ChainId.BNB:
      return process.env.JSON_RPC_PROVIDER_BNB!;
    case ChainId.BOBA:
      return process.env.JSON_RPC_PROVIDER_BOBA!;
    case ChainId.AVALANCHE:
      return process.env.JSON_RPC_PROVIDER_AVALANCHE!;
    case ChainId.MOONBEAM:
      return process.env.JSON_RPC_PROVIDER_MOONBEAM!;
    case ChainId.ZKSYNC:
      return process.env.JSON_RPC_PROVIDER_ZKSYNC!;
    case ChainId.SEI_TESTNET:
      return process.env.JSON_RPC_PROVIDER_SEI_TESTNET!;
    case ChainId.LINEA:
      return process.env.JSON_RPC_PROVIDER_LINEA!;
    case ChainId.BLAST:
      return process.env.JSON_RPC_PROVIDER_BLAST!;
    case ChainId.MANTA:
      return process.env.JSON_RPC_PROVIDER_MANTA!;
    case ChainId.POLYGON_ZKEVM:
      return process.env.JSON_RPC_PROVIDER_POLYGON_ZKEVM!;
    case ChainId.FILECOIN:
      return process.env.JSON_RPC_PROVIDER_FILECOIN!;
    case ChainId.ROOTSTOCK:
      return process.env.JSON_RPC_PROVIDER_ROOTSTOCK!;
    case ChainId.SCROLL:
      return process.env.JSON_RPC_PROVIDER_SCROLL!;
    case ChainId.BASE:
      return process.env.JSON_RPC_PROVIDER_BASE!;
    case ChainId.MANTLE:
      return process.env.JSON_RPC_PROVIDER_MANTLE!;
    default:
      throw new Error(`Chain id: ${id} not supported`);
  }
};

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    1,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GOERLI]: new Token(
    5,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SEPOLIA]: new Token(
    11155111,
    '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BNB]: new Token(
    56,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.OPTIMISM]: new Token(
    ChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.OPTIMISM_GOERLI]: new Token(
    ChainId.OPTIMISM_GOERLI,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_ONE]: new Token(
    ChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_GOERLI]: new Token(
    ChainId.ARBITRUM_GOERLI,
    '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.POLYGON]: new Token(
    ChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [ChainId.POLYGON_MUMBAI]: new Token(
    ChainId.POLYGON_MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),

  // The Celo native currency 'CELO' implements the erc-20 token standard
  [ChainId.CELO]: new Token(
    ChainId.CELO,
    '0x471EcE3750Da237f93B8E339c536989b8978a438',
    18,
    'CELO',
    'Celo native asset'
  ),
  [ChainId.CELO_ALFAJORES]: new Token(
    ChainId.CELO_ALFAJORES,
    '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
    18,
    'CELO',
    'Celo native asset'
  ),
  [ChainId.GNOSIS]: new Token(
    ChainId.GNOSIS,
    '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    18,
    'WXDAI',
    'Wrapped XDAI on Gnosis'
  ),
  [ChainId.MOONBEAM]: new Token(
    ChainId.MOONBEAM,
    '0xAcc15dC74880C9944775448304B263D191c6077F',
    18,
    'WGLMR',
    'Wrapped GLMR'
  ),
  [ChainId.ZKSYNC]: new Token(
    ChainId.ZKSYNC,
    '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.MANTLE]: new Token(
    ChainId.MANTLE,
    '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
    18,
    'MNT',
    'Wrapped Mantle'
  ),
  [ChainId.SEI_TESTNET]: new Token(
    ChainId.SEI_TESTNET,
    '0x57eE725BEeB991c70c53f9642f36755EC6eb2139',
    18,
    'WSEI',
    'Wrapped SEI'
  ),
  [ChainId.LINEA]: new Token(
    ChainId.LINEA,
    '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0x4300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.MANTA]: new Token(
    ChainId.MANTA,
    '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.POLYGON_ZKEVM]: new Token(
    ChainId.POLYGON_ZKEVM,
    '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.FILECOIN]: new Token(
    ChainId.FILECOIN,
    '0x60E1773636CF5E4A227d9AC24F20fEca034ee25A',
    18,
    'WFIL',
    'Wrapped FIL'
  ),
  [ChainId.ROOTSTOCK]: new Token(
    ChainId.ROOTSTOCK,
    '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d',
    18,
    'WRBTC',
    'Wrapped BTC'
  ),
  [ChainId.SCROLL]: new Token(
    ChainId.SCROLL,
    '0x5300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.BOBA]: new Token(
    ChainId.BOBA,
    '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BASE]: new Token(
    ChainId.BASE,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BASE_GOERLI]: new Token(
    ChainId.BASE_GOERLI,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
};

function isMatic(
  chainId: number
): chainId is ChainId.POLYGON | ChainId.POLYGON_MUMBAI {
  return chainId === ChainId.POLYGON_MUMBAI || chainId === ChainId.POLYGON;
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic');
    super(chainId, 18, 'MATIC', 'Polygon Matic');
  }
}

function isCelo(
  chainId: number
): chainId is ChainId.CELO | ChainId.CELO_ALFAJORES {
  return chainId === ChainId.CELO_ALFAJORES || chainId === ChainId.CELO;
}

class CeloNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isCelo(this.chainId)) throw new Error('Not celo');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isCelo(chainId)) throw new Error('Not celo');
    super(chainId, 18, 'CELO', 'Celo');
  }
}

function isGnosis(chainId: number): chainId is ChainId.GNOSIS {
  return chainId === ChainId.GNOSIS;
}

class GnosisNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isGnosis(this.chainId)) throw new Error('Not gnosis');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isGnosis(chainId)) throw new Error('Not gnosis');
    super(chainId, 18, 'XDAI', 'xDai');
  }
}

function isBnb(chainId: number): chainId is ChainId.BNB {
  return chainId === ChainId.BNB;
}

class BnbNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isBnb(this.chainId)) throw new Error('Not bnb');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isBnb(chainId)) throw new Error('Not bnb');
    super(chainId, 18, 'BNB', 'BNB');
  }
}

function isMoonbeam(chainId: number): chainId is ChainId.MOONBEAM {
  return chainId === ChainId.MOONBEAM;
}

class MoonbeamNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isMoonbeam(this.chainId)) throw new Error('Not moonbeam');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isMoonbeam(chainId)) throw new Error('Not moonbeam');
    super(chainId, 18, 'GLMR', 'Glimmer');
  }
}

function isZksync(chainId: number): chainId is ChainId.ZKSYNC {
  return chainId === ChainId.ZKSYNC;
}

class ZksyncNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isZksync(this.chainId)) throw new Error('Not zksync');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isZksync(chainId)) throw new Error('Not zksync');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isMantle(chainId: number): chainId is ChainId.MANTLE {
  return chainId === ChainId.MANTLE;
}

class MantleNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isMantle(this.chainId)) throw new Error('Not mantle');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isMantle(chainId)) throw new Error('Not mantle');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isSeiTestnet(chainId: number): chainId is ChainId.SEI_TESTNET {
  return chainId === ChainId.SEI_TESTNET;
}

class SeiTestnetNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isSeiTestnet(this.chainId)) throw new Error('Not sei testnet');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isSeiTestnet(chainId)) throw new Error('Not sei testnet');
    super(chainId, 18, 'SEI', 'SEI');
  }
}

function isLinea(chainId: number): chainId is ChainId.LINEA {
  return chainId === ChainId.LINEA;
}

class LineaNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isLinea(this.chainId)) throw new Error('Not linea');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isLinea(chainId)) throw new Error('Not linea');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isBlast(chainId: number): chainId is ChainId.BLAST {
  return chainId === ChainId.BLAST;
}

class BlastNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isBlast(this.chainId)) throw new Error('Not blast');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isBlast(chainId)) throw new Error('Not blast');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isManta(chainId: number): chainId is ChainId.MANTA {
  return chainId === ChainId.MANTA;
}

class MantaNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isManta(this.chainId)) throw new Error('Not manta');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isManta(chainId)) throw new Error('Not manta');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isPolygonZkevm(chainId: number): chainId is ChainId.POLYGON_ZKEVM {
  return chainId === ChainId.POLYGON_ZKEVM;
}

class PolygonZkevmNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isPolygonZkevm(this.chainId)) throw new Error('Not polygon-zkevm');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isPolygonZkevm(chainId)) throw new Error('Not polygon-zkevm');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isFilecoin(chainId: number): chainId is ChainId.FILECOIN {
  return chainId === ChainId.FILECOIN;
}

class FilecoinNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isFilecoin(this.chainId)) throw new Error('Not filecoin');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isFilecoin(chainId)) throw new Error('Not filecoin');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isRootstock(chainId: number): chainId is ChainId.ROOTSTOCK {
  return chainId === ChainId.ROOTSTOCK;
}

class RootstockNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isRootstock(this.chainId)) throw new Error('Not rootstock');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isRootstock(chainId)) throw new Error('Not rootstock');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isScroll(chainId: number): chainId is ChainId.SCROLL {
  return chainId === ChainId.ROOTSTOCK;
}

class ScrollNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isScroll(this.chainId)) throw new Error('Not scroll');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isScroll(chainId)) throw new Error('Not scroll');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

function isAvax(chainId: number): chainId is ChainId.AVALANCHE {
  return chainId === ChainId.AVALANCHE;
}

class AvalancheNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isAvax(this.chainId)) throw new Error('Not avalanche');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isAvax(chainId)) throw new Error('Not avalanche');
    super(chainId, 18, 'AVAX', 'Avalanche');
  }
}

function isBoba(chainId: number): chainId is ChainId.BOBA {
  return chainId === ChainId.BOBA;
}

class BobaNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isBoba(this.chainId)) throw new Error('Not boba');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isBoba(chainId)) throw new Error('Not boba');
    super(chainId, 18, 'ETH', 'Ether');
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WRAPPED_NATIVE_CURRENCY) {
      return WRAPPED_NATIVE_CURRENCY[this.chainId as ChainId];
    }
    throw new Error('Unsupported chain ID');
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};

export function nativeOnChain(chainId: number): NativeCurrency {
  if (cachedNativeCurrency[chainId] != undefined) {
    return cachedNativeCurrency[chainId]!;
  }
  if (isMatic(chainId)) {
    cachedNativeCurrency[chainId] = new MaticNativeCurrency(chainId);
  } else if (isCelo(chainId)) {
    cachedNativeCurrency[chainId] = new CeloNativeCurrency(chainId);
  } else if (isGnosis(chainId)) {
    cachedNativeCurrency[chainId] = new GnosisNativeCurrency(chainId);
  } else if (isMoonbeam(chainId)) {
    cachedNativeCurrency[chainId] = new MoonbeamNativeCurrency(chainId);
  } else if (isZksync(chainId)) {
    cachedNativeCurrency[chainId] = new ZksyncNativeCurrency(chainId);
  } else if (isMantle(chainId)) {
    cachedNativeCurrency[chainId] = new MantleNativeCurrency(chainId);
  } else if (isSeiTestnet(chainId)) {
    cachedNativeCurrency[chainId] = new SeiTestnetNativeCurrency(chainId);
  } else if (isLinea(chainId)) {
    cachedNativeCurrency[chainId] = new LineaNativeCurrency(chainId);
  } else if (isBlast(chainId)) {
    cachedNativeCurrency[chainId] = new BlastNativeCurrency(chainId);
  } else if (isManta(chainId)) {
    cachedNativeCurrency[chainId] = new MantaNativeCurrency(chainId);
  } else if (isPolygonZkevm(chainId)) {
    cachedNativeCurrency[chainId] = new PolygonZkevmNativeCurrency(chainId);
  } else if (isFilecoin(chainId)) {
    cachedNativeCurrency[chainId] = new FilecoinNativeCurrency(chainId);
  } else if (isRootstock(chainId)) {
    cachedNativeCurrency[chainId] = new RootstockNativeCurrency(chainId);
  } else if (isScroll(chainId)) {
    cachedNativeCurrency[chainId] = new ScrollNativeCurrency(chainId);
  } else if (isBnb(chainId)) {
    cachedNativeCurrency[chainId] = new BnbNativeCurrency(chainId);
  } else if (isAvax(chainId)) {
    cachedNativeCurrency[chainId] = new AvalancheNativeCurrency(chainId);
  } else if (isBoba(chainId)) {
    cachedNativeCurrency[chainId] = new BobaNativeCurrency(chainId);
  } else {
    cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);
  }

  return cachedNativeCurrency[chainId]!;
}
