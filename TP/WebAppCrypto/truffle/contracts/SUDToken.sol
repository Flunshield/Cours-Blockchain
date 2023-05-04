// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../Normes/ERC20/ERC20.sol";

contract SUDToken is ERC20 {
    constructor() ERC20("LeSudist", "SUDIST") {
        _mint(msg.sender,1000000000000000000000000);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    _transfer(_msgSender(), recipient, amount);
    return true;
}
}