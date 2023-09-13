import { defaultAbiCoder } from '@ethersproject/abi';
import { getAddress } from '@ethersproject/address';
import { Token } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import {
  BytesLike,
  concat,
  hexDataLength,
  hexDataSlice,
  keccak256,
  Logger,
  solidityKeccak256,
  toUtf8Bytes,
} from 'ethers/lib/utils';

const logger = new Logger('zksync-address/5.0.10');

export const POOL_INIT_CODE_HASH =
  '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54';
export const FACTORY_HASH =
  '0x01000103b318c4d3e5e5a40dadf28886991e7b6ec31834c025a2644bfe888023';

computePoolAddress({
  factoryAddress: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
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
});

export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
}: {
  factoryAddress: string;
  tokenA: Token;
  tokenB: Token;
  fee: FeeAmount;
  initCodeHashManualOverride?: string;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks
  return getCreate2Address(
    factoryAddress,
    solidityKeccak256(
      ['bytes'],
      [
        defaultAbiCoder.encode(
          ['address', 'address', 'uint24'],
          [token0.address, token1.address, fee],
        ),
      ],
    ),
    FACTORY_HASH,
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH,
  );
}

export function getCreate2Address(
  from: string,
  salt: BytesLike,
  byteCodeHash: BytesLike,
  initCodeHash: BytesLike,
): string {
  if (hexDataLength(salt) !== 32) {
    logger.throwArgumentError('salt must be 32 bytes', 'salt', salt);
  }
  if (hexDataLength(initCodeHash) !== 32) {
    logger.throwArgumentError(
      'initCodeHash must be 32 bytes',
      'initCodeHash',
      initCodeHash,
    );
  }
  const computedAddress = getAddress(
    hexDataSlice(
      keccak256(
        concat([
          toUtf8Bytes('zksyncCreate2'),
          getAddress(from),
          salt,
          byteCodeHash,
          initCodeHash,
        ]),
      ),
      12,
    ),
  );
  logger.info('out:', computedAddress);
  logger.info('expected: 0xff577f0e828a878743ecc5e2632cbf65cecf17cf');
  return computedAddress;
}
