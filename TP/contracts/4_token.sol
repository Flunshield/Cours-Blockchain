pragma solidity >=0.7.0 <0.9.0;
import "./ERC20.sol";
contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("LeSudist", "SUDIST") {
        _mint(msg.sender,initialSupply);
    }
}
