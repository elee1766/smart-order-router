import { CHAIN_TO_ADDRESSES_MAP, ChainId, Token } from '@uniswap/sdk-core';
import { FACTORY_ADDRESS } from '@uniswap/v3-sdk';

import { NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chains';

export const BNB_TICK_LENS_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].tickLensAddress;
export const BNB_NONFUNGIBLE_POSITION_MANAGER_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].nonfungiblePositionManagerAddress;
export const BNB_SWAP_ROUTER_02_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].swapRouter02Address!;
export const BNB_V3_MIGRATOR_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].v3MigratorAddress;

export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(FACTORY_ADDRESS),
  [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].v3CoreFactoryAddress,
  [ChainId.CELO_ALFAJORES]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].v3CoreFactoryAddress,
  [ChainId.OPTIMISM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].v3CoreFactoryAddress,
  [ChainId.SEPOLIA]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].v3CoreFactoryAddress,
  [ChainId.ARBITRUM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].v3CoreFactoryAddress,
  [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].v3CoreFactoryAddress,
  [ChainId.AVALANCHE]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].v3CoreFactoryAddress,
  [ChainId.BOBA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOBA].v3CoreFactoryAddress,
  [ChainId.MOONBEAM]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.MOONBEAM].v3CoreFactoryAddress,
  [ChainId.ZKLINK]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKLINK].v3CoreFactoryAddress,
  [ChainId.ZKSYNC]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKSYNC].v3CoreFactoryAddress,
  [ChainId.LENS]: CHAIN_TO_ADDRESSES_MAP[ChainId.LENS].v3CoreFactoryAddress,
  [ChainId.XLAYER]: CHAIN_TO_ADDRESSES_MAP[ChainId.XLAYER].v3CoreFactoryAddress,
  [ChainId.GNOSIS]: CHAIN_TO_ADDRESSES_MAP[ChainId.GNOSIS].v3CoreFactoryAddress,
  [ChainId.BOB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOB].v3CoreFactoryAddress,
  [ChainId.LISK]: CHAIN_TO_ADDRESSES_MAP[ChainId.LISK].v3CoreFactoryAddress,
  [ChainId.TAIKO]: CHAIN_TO_ADDRESSES_MAP[ChainId.TAIKO].v3CoreFactoryAddress,
  [ChainId.SEI]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEI].v3CoreFactoryAddress,
  [ChainId.MANTLE]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTLE].v3CoreFactoryAddress,
  [ChainId.SEI_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.SEI_TESTNET].v3CoreFactoryAddress,
  [ChainId.LINEA]: CHAIN_TO_ADDRESSES_MAP[ChainId.LINEA].v3CoreFactoryAddress,
  [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].v3CoreFactoryAddress,
  [ChainId.MANTA]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTA].v3CoreFactoryAddress,
  [ChainId.POLYGON_ZKEVM]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.POLYGON_ZKEVM].v3CoreFactoryAddress,
  [ChainId.FILECOIN]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.FILECOIN].v3CoreFactoryAddress,
  [ChainId.ROOTSTOCK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ROOTSTOCK].v3CoreFactoryAddress,
  [ChainId.SCROLL]: CHAIN_TO_ADDRESSES_MAP[ChainId.SCROLL].v3CoreFactoryAddress,
  [ChainId.BASE_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].v3CoreFactoryAddress,
  [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].v3CoreFactoryAddress,
  [ChainId.CORN]: CHAIN_TO_ADDRESSES_MAP[ChainId.CORN].v3CoreFactoryAddress,
  [ChainId.ETHERLINK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ETHERLINK].v3CoreFactoryAddress,
  [ChainId.METAL]: CHAIN_TO_ADDRESSES_MAP[ChainId.METAL].v3CoreFactoryAddress,
  [ChainId.SONIC]: CHAIN_TO_ADDRESSES_MAP[ChainId.SONIC].v3CoreFactoryAddress,
  [ChainId.XDC]: CHAIN_TO_ADDRESSES_MAP[ChainId.XDC].v3CoreFactoryAddress,
  [ChainId.WORLDCHAIN]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.WORLDCHAIN].v3CoreFactoryAddress,
  [ChainId.LIGHTLINK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.LIGHTLINK].v3CoreFactoryAddress,
  [ChainId.GOAT]: CHAIN_TO_ADDRESSES_MAP[ChainId.GOAT].v3CoreFactoryAddress,
  [ChainId.REDBELLY]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.REDBELLY].v3CoreFactoryAddress,
  [ChainId.SAGA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SAGA].v3CoreFactoryAddress,
  [ChainId.TELOS]: CHAIN_TO_ADDRESSES_MAP[ChainId.TELOS].v3CoreFactoryAddress,
  [ChainId.HEMI]: CHAIN_TO_ADDRESSES_MAP[ChainId.HEMI].v3CoreFactoryAddress,
  [ChainId.NIBIRU]: CHAIN_TO_ADDRESSES_MAP[ChainId.NIBIRU].v3CoreFactoryAddress,
};

export const QUOTER_V2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x61fFE014bA17989E743c5F6cB21bF9697530B21e'),
  [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].quoterAddress,
  [ChainId.CELO_ALFAJORES]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].quoterAddress,
  [ChainId.OPTIMISM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].quoterAddress,
  [ChainId.SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].quoterAddress,
  [ChainId.ARBITRUM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].quoterAddress,
  [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].quoterAddress,
  [ChainId.AVALANCHE]: CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].quoterAddress,
  [ChainId.MOONBEAM]: CHAIN_TO_ADDRESSES_MAP[ChainId.MOONBEAM].quoterAddress,
  [ChainId.ZKLINK]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKLINK].quoterAddress,
  [ChainId.ZKSYNC]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKSYNC].quoterAddress,
  [ChainId.LENS]: CHAIN_TO_ADDRESSES_MAP[ChainId.LENS].quoterAddress,
  [ChainId.XLAYER]: CHAIN_TO_ADDRESSES_MAP[ChainId.XLAYER].quoterAddress,
  [ChainId.GNOSIS]: CHAIN_TO_ADDRESSES_MAP[ChainId.GNOSIS].quoterAddress,
  [ChainId.BOB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOB].quoterAddress,
  [ChainId.LISK]: CHAIN_TO_ADDRESSES_MAP[ChainId.LISK].quoterAddress,
  [ChainId.TAIKO]: CHAIN_TO_ADDRESSES_MAP[ChainId.TAIKO].quoterAddress,
  [ChainId.SEI]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEI].quoterAddress,
  [ChainId.MANTLE]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTLE].quoterAddress,
  [ChainId.SEI_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.SEI_TESTNET].quoterAddress,
  [ChainId.LINEA]: CHAIN_TO_ADDRESSES_MAP[ChainId.LINEA].quoterAddress,
  [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].quoterAddress,
  [ChainId.MANTA]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTA].quoterAddress,
  [ChainId.POLYGON_ZKEVM]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.POLYGON_ZKEVM].quoterAddress,
  [ChainId.FILECOIN]: CHAIN_TO_ADDRESSES_MAP[ChainId.FILECOIN].quoterAddress,
  [ChainId.ROOTSTOCK]: CHAIN_TO_ADDRESSES_MAP[ChainId.ROOTSTOCK].quoterAddress,
  [ChainId.SCROLL]: CHAIN_TO_ADDRESSES_MAP[ChainId.SCROLL].quoterAddress,
  [ChainId.BOBA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOBA].quoterAddress,
  [ChainId.BASE_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].quoterAddress,
  [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].quoterAddress,
  [ChainId.CORN]: CHAIN_TO_ADDRESSES_MAP[ChainId.CORN].quoterAddress,
  [ChainId.ETHERLINK]: CHAIN_TO_ADDRESSES_MAP[ChainId.ETHERLINK].quoterAddress,
  [ChainId.METAL]: CHAIN_TO_ADDRESSES_MAP[ChainId.METAL].quoterAddress,
  [ChainId.SONIC]: CHAIN_TO_ADDRESSES_MAP[ChainId.SONIC].quoterAddress,
  [ChainId.XDC]: CHAIN_TO_ADDRESSES_MAP[ChainId.XDC].quoterAddress,
  [ChainId.WORLDCHAIN]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.WORLDCHAIN].quoterAddress,
  [ChainId.LIGHTLINK]: CHAIN_TO_ADDRESSES_MAP[ChainId.LIGHTLINK].quoterAddress,
  [ChainId.GOAT]: CHAIN_TO_ADDRESSES_MAP[ChainId.GOAT].quoterAddress,
  [ChainId.REDBELLY]: CHAIN_TO_ADDRESSES_MAP[ChainId.REDBELLY].quoterAddress,
  [ChainId.SAGA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SAGA].quoterAddress,
  [ChainId.TELOS]: CHAIN_TO_ADDRESSES_MAP[ChainId.TELOS].quoterAddress,
  [ChainId.HEMI]: CHAIN_TO_ADDRESSES_MAP[ChainId.HEMI].quoterAddress,
  [ChainId.NIBIRU]: CHAIN_TO_ADDRESSES_MAP[ChainId.NIBIRU].quoterAddress,
};

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.MAINNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v1MixedRouteQuoterAddress,
  [ChainId.GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.GOERLI].v1MixedRouteQuoterAddress,
};

export const UNISWAP_MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
  [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].multicallAddress,
  [ChainId.CELO_ALFAJORES]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].multicallAddress,
  [ChainId.OPTIMISM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].multicallAddress,
  [ChainId.SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].multicallAddress,
  [ChainId.ARBITRUM_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].multicallAddress,
  [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].multicallAddress,
  [ChainId.AVALANCHE]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].multicallAddress,
  [ChainId.MOONBEAM]: CHAIN_TO_ADDRESSES_MAP[ChainId.MOONBEAM].multicallAddress,
  [ChainId.ZKSYNC]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKSYNC].multicallAddress,
  [ChainId.LENS]: CHAIN_TO_ADDRESSES_MAP[ChainId.LENS].multicallAddress,
  [ChainId.XLAYER]: CHAIN_TO_ADDRESSES_MAP[ChainId.XLAYER].multicallAddress,
  [ChainId.GNOSIS]: CHAIN_TO_ADDRESSES_MAP[ChainId.GNOSIS].multicallAddress,
  [ChainId.BOB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOB].multicallAddress,
  [ChainId.LISK]: CHAIN_TO_ADDRESSES_MAP[ChainId.LISK].multicallAddress,
  [ChainId.ZKLINK]: CHAIN_TO_ADDRESSES_MAP[ChainId.ZKLINK].multicallAddress,
  [ChainId.TAIKO]: CHAIN_TO_ADDRESSES_MAP[ChainId.TAIKO].multicallAddress,
  [ChainId.SEI]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEI].multicallAddress,
  [ChainId.MANTLE]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTLE].multicallAddress,
  [ChainId.SEI_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.SEI_TESTNET].multicallAddress,
  [ChainId.LINEA]: CHAIN_TO_ADDRESSES_MAP[ChainId.LINEA].multicallAddress,
  [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].multicallAddress,
  [ChainId.MANTA]: CHAIN_TO_ADDRESSES_MAP[ChainId.MANTA].multicallAddress,
  [ChainId.POLYGON_ZKEVM]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.POLYGON_ZKEVM].multicallAddress,
  [ChainId.FILECOIN]: CHAIN_TO_ADDRESSES_MAP[ChainId.FILECOIN].multicallAddress,
  [ChainId.ROOTSTOCK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ROOTSTOCK].multicallAddress,
  [ChainId.SCROLL]: CHAIN_TO_ADDRESSES_MAP[ChainId.SCROLL].multicallAddress,
  [ChainId.BOBA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BOBA].multicallAddress,
  // [ChainId.BASE_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].multicallAddress,
  [ChainId.BASE_GOERLI]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].multicallAddress,
  [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].multicallAddress,
  [ChainId.CORN]: CHAIN_TO_ADDRESSES_MAP[ChainId.CORN].multicallAddress,
  [ChainId.ETHERLINK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.ETHERLINK].multicallAddress,
  [ChainId.METAL]: CHAIN_TO_ADDRESSES_MAP[ChainId.METAL].multicallAddress,
  [ChainId.SONIC]: CHAIN_TO_ADDRESSES_MAP[ChainId.SONIC].multicallAddress,
  [ChainId.XDC]: CHAIN_TO_ADDRESSES_MAP[ChainId.XDC].multicallAddress,
  [ChainId.WORLDCHAIN]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.WORLDCHAIN].multicallAddress,
  [ChainId.LIGHTLINK]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.LIGHTLINK].multicallAddress,
  [ChainId.GOAT]: CHAIN_TO_ADDRESSES_MAP[ChainId.GOAT].multicallAddress,
  [ChainId.REDBELLY]: CHAIN_TO_ADDRESSES_MAP[ChainId.REDBELLY].multicallAddress,
  [ChainId.SAGA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SAGA].multicallAddress,
  [ChainId.TELOS]: CHAIN_TO_ADDRESSES_MAP[ChainId.TELOS].multicallAddress,
  [ChainId.HEMI]: CHAIN_TO_ADDRESSES_MAP[ChainId.HEMI].multicallAddress,
  [ChainId.NIBIRU]: CHAIN_TO_ADDRESSES_MAP[ChainId.NIBIRU].multicallAddress,
};

export const SWAP_ROUTER_02_ADDRESSES = (chainId: number): string => {
  if (chainId == ChainId.BNB) {
    return BNB_SWAP_ROUTER_02_ADDRESS;
  }
  return '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
};

export const OVM_GASPRICE_ADDRESS =
  '0x420000000000000000000000000000000000000F';
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C';
export const TICK_LENS_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_ONE].tickLensAddress;
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].nonfungiblePositionManagerAddress;
export const V3_MIGRATOR_ADDRESS =
  CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v3MigratorAddress;
export const MULTICALL2_ADDRESS = '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696';

export type AddressMap = { [chainId: number]: string | undefined };

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(
    additionalNetworks
  ).reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

export const WETH9: {
  [chainId in Exclude<
    ChainId,
    | ChainId.POLYGON
    | ChainId.POLYGON_MUMBAI
    | ChainId.CELO
    | ChainId.CELO_ALFAJORES
    | ChainId.MOONBEAM
    | ChainId.ZKSYNC
    | ChainId.SEI_TESTNET
    | ChainId.FILECOIN
    | ChainId.ROOTSTOCK
    | ChainId.BNB
    | ChainId.AVALANCHE
  >]: Token;
} = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.TAIKO]: new Token(
    ChainId.TAIKO,
    '0xA51894664A773981C6C112C43ce576f315d5b1B6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SEI]: new Token(
    ChainId.SEI,
    '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',
    18,
    'WSEI',
    'Wrapped SEI'
  ),
  [ChainId.ZKLINK]: new Token(
    ChainId.ZKLINK,
    '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.LISK]: new Token(
    ChainId.LISK,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MANTLE]: new Token(
    ChainId.MANTLE,
    '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
    18,
    'WMNT',
    'Wrapped Mantle'
  ),
  [ChainId.BOBA]: new Token(
    ChainId.BOBA,
    '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BOBA]: new Token(
    ChainId.BOBA,
    '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GOERLI]: new Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BOB]: new Token(
    ChainId.BOB,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    18,
    'WETH',
    'Wrapped Ether'
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
  [ChainId.BASE_GOERLI]: new Token(
    ChainId.BASE_GOERLI,
    '0x4200000000000000000000000000000000000006',
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
  [ChainId.SCROLL]: new Token(
    ChainId.SCROLL,
    '0x5300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0x4300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MANTA]: new Token(
    ChainId.MANTA,
    '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.LINEA]: new Token(
    ChainId.LINEA,
    '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.POLYGON_ZKEVM]: new Token(
    ChainId.POLYGON_ZKEVM,
    '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.XLAYER]: new Token(
    ChainId.XLAYER,
    '0xe538905cf8410324e03a5a23c1c177a474d59b2b',
    18,
    'WOKB',
    'Wrapped OKB'
  ),
  [ChainId.GNOSIS]: new Token(
    ChainId.GNOSIS,
    '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    18,
    'WXDAI',
    'Wrapped xDai'
  ),
  [ChainId.CORN]: new Token(
    ChainId.CORN,
    '0xda5dDd7270381A7C2717aD10D1c0ecB19e3CDFb2',
    18,
    'WBTCN',
    'Wrapped BTCN'
  ),
  [ChainId.ETHERLINK]: new Token(
    ChainId.ETHERLINK,
    '0xc9B53AB2679f573e480d01e0f49e2B5CFB7a3EAb',
    18,
    'WXTZ',
    'Wrapped XTZ'
  ),
  [ChainId.METAL]: new Token(
    ChainId.METAL,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SONIC]: new Token(
    ChainId.SONIC,
    '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38',
    18,
    'wS',
    'Wrapped Sonic'
  ),
  [ChainId.XDC]: new Token(
    ChainId.XDC,
    '0x951857744785e80e2de051c32ee7b25f9c458c42',
    18,
    'WXDC',
    'Wrapped XDC'
  ),
  [ChainId.WORLDCHAIN]: new Token(
    ChainId.WORLDCHAIN,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.LIGHTLINK]: new Token(
    ChainId.LIGHTLINK,
    '0x7EbeF2A4b1B09381Ec5B9dF8C5c6f2dBECA59c73',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GOAT]: new Token(
    ChainId.GOAT,
    '0xbC10000000000000000000000000000000000000',
    18,
    'WGBTC',
    'Wrapped Goat Bitcoin'
  ),
  [ChainId.REDBELLY]: new Token(
    ChainId.REDBELLY,
    '0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076',
    18,
    'WRBNT',
    'Wrapped RBNT'
  ),
  [ChainId.SAGA]: new Token(
    ChainId.SAGA,
    '0xE3dbcD53f4Ce1b06Ab200f4912BD35672e68f1FA',
    18,
    'wGAS',
    'Wrapped Gas'
  ),
  [ChainId.TELOS]: new Token(
    ChainId.TELOS,
    '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    18,
    'WTLOS',
    'Wrapped TLOS'
  ),
  [ChainId.HEMI]: new Token(
    ChainId.HEMI,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.LENS]: new Token(
    ChainId.LENS,
    '0x6bDc36E20D267Ff0dd6097799f82e78907105e2F',
    18,
    'WGHO',
    'Wrapped GHO'
  ),
  [ChainId.NIBIRU]: new Token(
    ChainId.NIBIRU,
    '0x0CaCF669f8446BeCA826913a3c6B96aCD4b02a97',
    18,
    'WNIBI',
    'Wrapped NIBI'
  ),
};
