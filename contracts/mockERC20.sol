// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25; // mock erc20 and is not suitable to be used in real world activities.

import {ERC20} from "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mockERC20 is ERC20 {
    constructor() ERC20("name", "symbol") {}

    function mint(address _account, uint256 _value) public {
        _mint(_account, _value);
    }
}
