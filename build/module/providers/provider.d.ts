import { BigNumber } from '@ethersproject/bignumber';
export type ProviderConfig = {
    /**
     * The block number to use when getting data on-chain.
     */
    blockNumber?: number | Promise<number>;
    additionalGasOverhead?: BigNumber;
    debugRouting?: boolean;
};
export type LocalCacheEntry<T> = {
    entry: T;
    blockNumber: number;
};
