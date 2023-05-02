# Envoyer recevoir de l'argent

Pour **Recevoir**, il suffit de partager sa clef public.

Pour **envoyer**,  il faut renseigner la clef public de la eprsonne voulu

# Deployer un contrat

## 1er contrat déployer :

![[Pasted image 20230502135851.png]]

Transaction Hash : 0xb107d42710fcb04ef20541b98b4eafe55c1282785e0b9e91f5efc0398efdf46e

Code source : 
``` js
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract Storage {
    uint256 number;
    /**
     * @dev Store value in variable
     * @param num value to store
     */

    function store(uint256 num) public {
        number = num;
    }
    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

## Créer sa propre crypto
Pour la créer, il faut 4 fichiers :
- IERC20metaData
- IERC20
- ERC20
- context

En plus de cela, il faut créer un contrat qui va paramétrer la crypto. 

``` js
pragma solidity >=0.7.0 <0.9.0;
import "./ERC20.sol";

contract Token is ERC20 {

    constructor(uint256 initialSupply) ERC20("LeSudist", "SUDIST") {
        _mint(msg.sender,initialSupply);
    }

}
```

Ensuite, nous devons paramétré remix :

![[Pasted image 20230502154934.png]]
![[Pasted image 20230502154950.png]]

Enfin, nous devons associé le contrat à notre wallet en important notre adresse du contrat.
![[Pasted image 20230502155513.png]]

