import { defaultAbiCoder } from '@ethersproject/abi';
import { getAddress } from '@ethersproject/address';
import { Token } from '@uniswap/sdk-core';
import { INIT_CODE_HASH } from '@uniswap/v2-sdk';
import { FeeAmount } from '@uniswap/v3-sdk';
import {
  concat,
  hexDataSlice,
  keccak256,
  Logger,
  solidityKeccak256,
} from 'ethers/lib/utils';

const logger = new Logger('zksync-address/5.0.10');

export const POOL_INIT_CODE_HASH =
  '0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed';
export const FACTORY_HASH =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
export const PREFIX =
  '0x2020dba91b30cc0006188af794c2fb30dd8520db7e2c088b7fc7c103c00ca494';

computeAddress({
  factory: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
  pkey: getPoolKey({
    tokenA: new Token(
      324,
      '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
      6,
      'USDC',
      'USD Coin',
    ),
    tokenB: new Token(
      324,
      '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
      18,
      'WETH',
      'Wrapped ETH',
    ),
    fee: 3000,
  }),
});

type PoolKey = {
  token0: string;
  token1: string;
  fee: number;
};

export function getPoolKey({
  tokenA,
  tokenB,
  fee,
}: {
  tokenA: Token;
  tokenB: Token;
  fee: FeeAmount;
  initCodeHashManualOverride?: string;
}): PoolKey {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks
  return {
    token0: token0.address,
    token1: token1.address,
    fee: fee,
  };
}

export function computeAddress({
  factory,
  pkey,
}: {
  factory: string;
  pkey: PoolKey;
}): string {
  const pool = getAddress(
    hexDataSlice(
      keccak256(
        concat([
          PREFIX,
          factory,
          solidityKeccak256(
            ['bytes'],
            [
              defaultAbiCoder.encode(
                ['address', 'address', 'uint24'],
                [pkey.token0, pkey.token1, pkey.fee],
              ),
            ],
          ),
          INIT_CODE_HASH,
          FACTORY_HASH,
        ]),
      ),
      12,
    ),
  );
  logger.info('out:', pool);
  logger.info('expected: 0xff577f0e828a878743ecc5e2632cbf65cecf17cf');
  return pool;
}
