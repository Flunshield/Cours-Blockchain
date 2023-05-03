// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Counter {
    uint256 private count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }

    function getValue() public view returns (uint256) {
        return count;
    }
}
