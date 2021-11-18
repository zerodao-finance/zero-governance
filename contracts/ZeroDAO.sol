// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract ZeroDAO is Initializable, ERC20Upgradeable {

    address mintAuthority;

    modifier onlyMintAuthority {
        require(msg.sender == mintAuthority, '!mintAuthority');
        _;
    }

    function initialize(string memory name, string memory symbol, uint256 initialSupply) public virtual initializer {
        __ERC20_init(name, symbol);
        mintAuthority = msg.sender;
        _mint(_msgSender(), initialSupply);
    }

    function mint(address _account, uint256 _amount) public onlyMintAuthority {
        _mint(_account, _amount);
    }

    function setMintAuthority(address _account) public onlyMintAuthority {
        mintAuthority = _account;
    }
}