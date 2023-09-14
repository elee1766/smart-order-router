"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeZkPoolAddress = exports.PREFIX = exports.CONSTRUCTOR_INPUT_HASH = exports.POOL_INIT_CODE_HASH = void 0;
const abi_1 = require("@ethersproject/abi");
const address_1 = require("@ethersproject/address");
const utils_1 = require("ethers/lib/utils");
exports.POOL_INIT_CODE_HASH = '0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed';
exports.CONSTRUCTOR_INPUT_HASH = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.PREFIX = '0x2020dba91b30cc0006188af794c2fb30dd8520db7e2c088b7fc7c103c00ca494';
function computeZkPoolAddress({ factoryAddress, tokenA, tokenB, fee, initCodeHashManualOverride, }) {
    const salt = (0, utils_1.solidityKeccak256)(['bytes'], [
        abi_1.defaultAbiCoder.encode(['address', 'address', 'uint24'], [tokenA.address, tokenB.address, fee]),
    ]);
    const pool = (0, address_1.getAddress)((0, utils_1.hexDataSlice)((0, utils_1.keccak256)((0, utils_1.concat)([
        exports.PREFIX,
        (0, utils_1.zeroPad)(factoryAddress, 32),
        salt,
        initCodeHashManualOverride !== null && initCodeHashManualOverride !== void 0 ? initCodeHashManualOverride : exports.POOL_INIT_CODE_HASH,
        exports.CONSTRUCTOR_INPUT_HASH,
    ])), 12));
    return pool;
}
exports.computeZkPoolAddress = computeZkPoolAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemtzeW5jQ29tcHV0ZVBvb2xBZGRyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvemtzeW5jQ29tcHV0ZVBvb2xBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUFxRDtBQUNyRCxvREFBb0Q7QUFHcEQsNENBTTBCO0FBRWIsUUFBQSxtQkFBbUIsR0FDOUIsb0VBQW9FLENBQUM7QUFDMUQsUUFBQSxzQkFBc0IsR0FDakMsb0VBQW9FLENBQUM7QUFDMUQsUUFBQSxNQUFNLEdBQ2pCLG9FQUFvRSxDQUFDO0FBRXZFLFNBQWdCLG9CQUFvQixDQUFDLEVBQ25DLGNBQWMsRUFDZCxNQUFNLEVBQ04sTUFBTSxFQUNOLEdBQUcsRUFDSCwwQkFBMEIsR0FPM0I7SUFDQyxNQUFNLElBQUksR0FBRyxJQUFBLHlCQUFpQixFQUM1QixDQUFDLE9BQU8sQ0FBQyxFQUNUO1FBQ0UscUJBQWUsQ0FBQyxNQUFNLENBQ3BCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFDaEMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQ3RDO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBQSxvQkFBVSxFQUNyQixJQUFBLG9CQUFZLEVBQ1YsSUFBQSxpQkFBUyxFQUNQLElBQUEsY0FBTSxFQUFDO1FBQ0wsY0FBTTtRQUNOLElBQUEsZUFBTyxFQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7UUFDM0IsSUFBSTtRQUNKLDBCQUEwQixhQUExQiwwQkFBMEIsY0FBMUIsMEJBQTBCLEdBQUksMkJBQW1CO1FBQ2pELDhCQUFzQjtLQUN2QixDQUFDLENBQ0gsRUFDRCxFQUFFLENBQ0gsQ0FDRixDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBckNELG9EQXFDQyJ9