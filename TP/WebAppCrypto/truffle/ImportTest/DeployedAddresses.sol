// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeployedAddresses {
    address public _target_address;

    constructor(address target) {
        _target_address = target;
    }
}
