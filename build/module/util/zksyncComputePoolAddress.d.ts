import { Token } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
export declare const POOL_INIT_CODE_HASH = "0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed";
export declare const CONSTRUCTOR_INPUT_HASH = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
export declare const PREFIX = "0x2020dba91b30cc0006188af794c2fb30dd8520db7e2c088b7fc7c103c00ca494";
export declare function computeZkPoolAddress({ factoryAddress, tokenA, tokenB, fee, initCodeHashManualOverride, }: {
    factoryAddress: string;
    tokenA: Token;
    tokenB: Token;
    fee: FeeAmount;
    initCodeHashManualOverride?: string;
}): string;
