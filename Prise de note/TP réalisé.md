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

**_mint_**: permet la génération de token.

Ensuite, nous devons paramétré remix :

![[Pasted image 20230502154934.png]]
![[Pasted image 20230502154950.png]]

Enfin, nous devons associé le contrat à notre wallet en important notre adresse du contrat.
![[Pasted image 20230502155513.png]]

## ERC20
ERC20 est une norme technique pour les jetons (ou "tokens") émis sur la blockchain Ethereum. "ERC" signifie "Ethereum Request for Comments" et "20" est le numéro attribué à cette norme.

La norme ERC20 établit un ensemble de règles et de fonctions de base que tout jeton Ethereum doit respecter pour être considéré comme un jeton ERC20 standard. Ces règles incluent la façon dont les transferts de jetons doivent être effectués, comment les soldes doivent être tenus à jour et comment les utilisateurs peuvent accorder des autorisations à des tiers pour dépenser leurs jetons.

L'avantage de la norme ERC20 est qu'elle permet une interopérabilité facile entre les différents jetons ERC20, les portefeuilles et les échanges, simplifiant ainsi le développement d'applications basées sur les jetons Ethereum. En effet, en respectant cette norme, les développeurs peuvent s'assurer que leur jeton sera compatible avec un large éventail de portefeuilles et de plateformes d'échange. Cela facilite également la création de contrats intelligents qui interagissent avec des jetons ERC20.

En bref, la norme ERC20 est une norme technique commune qui définit la manière dont les jetons Ethereum doivent fonctionner, ce qui simplifie leur utilisation et leur échange sur la blockchain Ethereum.

## Installer Truffle et Ganache
``` npm
npm install truffle -g

Pour ganache, c'ets un éxécutable
```