
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


## Projet réalisé

Voir code source sur Git.

### Problème rencontré

#### Réception des données des contrats

Pour réceptionner les données souhaité, il faut bien mentionné l'adresse d'expédition coté react :
``` js
    // Obtenir une naissance enregistrée par l'utilisateur connecté
    async function obtenirNaissance() {
        try {
            const result = await contract.methods.obtenirNaissance(acteIndex).call({ from: accounts[0] });
            setNaissance(result);
        } catch (err) {
            console.error(err);
            alert("Cet acte n'existe pas.");
        }
    }
```

L'IDE peut provoquer des erreurs qui n'en sont pas, par exemple, lorsque j'essaaie d'appeler la fonction d'un autre contre, VSCode m'indique une erreur alors que sous l'IDE REMIX, aucune erreur n'est présente et le code fonctionne ! `acteNaissance.transactionExists(transactionHash)`
```js
    function enregistrerDeces(string memory prenom, string memory nom, string memory dateDeces, string memory circonstanceDeces, bytes32 transactionHash ) public {
        //bool test = bool(acteNaissance.transactionExists(transactionHas));
        try acteNaissance.transactionExists(transactionHash) returns (bool result) {
            Deces memory nouveauDeces = Deces(prenom, nom, dateDeces, circonstanceDeces);
            deces[msg.sender].push(nouveauDeces);
            emit DecesEnregistree(msg.sender, prenom, nom, dateDeces, circonstanceDeces);
        } catch {
            emit Log("external call failed");
        }
    }
```


Sous Remix, lorsque j'apelle cette fonction avec un bon **transactionHash**, je crée bien mon acte de décès :
```js
[ { "from": "0xf8e81D47203A594245E36C48e151709F0C19fBe8", "topic": "0xcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab", "event": "Log", "args": { "0": "ff", "message": "ff" } }, { "from": "0xf8e81D47203A594245E36C48e151709F0C19fBe8", "topic": "0x4edf535cafe2b41133942e2cc6a9e0ba67308480c9cd5d3e0aa7b7278cbd3d21", "event": "DecesEnregistree", "args": { "0": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "1": "jhgjhg", "2": "kjkj,bkjb", "3": "kjbkjb", "4": "kjbkbjk", "utilisateur": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "prenom": "jhgjhg", "nom": "kjkj,bkjb", "dateDeces": "kjbkjb", "circonstanceDeces": "kjbkbjk" } } ]
```

Cependant, lorsque j'insère un mauvais **transactionHash**, Remix m'indique une erreur car je rentre dans le catch de la fonction :
```js
transact to ActeDeces.enregistrerDeces errored: Error encoding arguments: Error: invalid arrayify value (argument="value", value="0xec05df040g38c0c6ebfcddc1be686313b49822bee326ca68078f08198b1767d2", code=INVALID_ARGUMENT, version=bytes/5.5.0)
```

### Contrat créé

#### SUDToken.sol
Ce contrat génère des tokens SUDIST.
```js
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
```

#### ActeNaissance.sol
Ce contrat possède 3 méthodes :
- `enregistrerNaissance` qui va permettre de générer un contrat de naissance avec les données  et lui affecté un **transactionhash** envoyé depuis réact
- ``obtenirNaissance`` qui va permettre d'afficher un contrat en fonction de son index.
- `transactionExists` qui va permettre de vérifier si le **transactionhash** fournit depuis react existe bien dans le contrat.
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract ActeNaissance {

        struct Naissance {
            string prenom;
            string nom;
            string perePrenom;
            string pereNom;
            string merePrenom;
            string mereNom;
            string dateNaissance;
            string villeNaissance;
        }

        bytes32[] public transactions;
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, block.timestamp));

        mapping (address => Naissance[]) naissances;
        event NaissanceEnregistree(address indexed utilisateur, string prenom, string nom, string perePrenom, string pereNom, string merePrenom, string mereNom, string dateNaissance, string villeNaissance, bytes32 txHash);

        function enregistrerNaissance(string memory prenom, string memory nom, string memory perePrenom, string memory pereNom, string memory merePrenom, string memory mereNom, string memory dateNaissance, string memory villeNaissance) public {
            Naissance memory nouvelleNaissance = Naissance(prenom, nom, perePrenom, pereNom, merePrenom, mereNom, dateNaissance, villeNaissance);
            naissances[msg.sender].push(nouvelleNaissance);
            transactions.push(txHash);
            emit NaissanceEnregistree(msg.sender, prenom, nom, perePrenom, pereNom, merePrenom, mereNom, dateNaissance, villeNaissance, txHash);
        }

        function obtenirNaissance(uint256 acteIndex) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, bytes32) {
            Naissance[] memory actesPersonne = naissances[msg.sender];
            require(acteIndex < actesPersonne.length, "Cet acte n'existe pas.");
            Naissance memory acteNaissance = actesPersonne[acteIndex];
            return (acteNaissance.prenom, acteNaissance.nom, acteNaissance.perePrenom, acteNaissance.pereNom, acteNaissance.merePrenom, acteNaissance.mereNom, acteNaissance.dateNaissance, acteNaissance.villeNaissance, txHash);
        }

        function transactionExists(bytes32 transactionHash) public view returns (bool) {
            uint256 numTransactions = transactions.length;
            for (uint256 i = 0; i < numTransactions; i++) {
                if (transactions[i] == transactionHash) {
                    return true;
                }
            }
            return false;
        }
    }
```

#### ActeDeces.sol
Ce contrat est similaire au contrat `ActeNaissance.sol` sauf que celui-ci va réutiliser une des méthodes de `ActeNaissance.sol` pour enregistrer un acte de décès. En effet, afin qu'un acte de décès puissent être réaliser, il faut qu'un acte de naissance est été réaliser. Pour cela, dans la fonction `enregistrerDeces` nous allons faire appel à la méthode `transactionExists` de `acteNaissance.sol` afin de vérifier que le **transactionHash** fournit depuis le front est bien un **transactionHash** délivré lors de l'enregistrement de l'acte de naissance.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Importer le contrat 'ActeNaissance.sol'
import "./ActeNaissance.sol";

contract ActeDeces {
    event Log(string message);
    event LogBytes(bytes data);

    struct Deces {
        string prenom;
        string nom;
        string dateDeces;
        string circonstanceDeces;
    }

    // Créer une instance de acteNaissance
    ActeNaissance public acteNaissance;

    // Définir un constructeur pour initialiser l'instance de acteNaissance
    constructor(address adresseActeNaissance) {
        acteNaissance = ActeNaissance(adresseActeNaissance);
    }
    mapping (address => Deces[]) deces;
    event DecesEnregistree(address indexed utilisateur, string prenom, string nom, string dateDeces, string circonstanceDeces);

    function enregistrerDeces(string memory prenom, string memory nom, string memory dateDeces, string memory circonstanceDeces, bytes32 transactionHash ) public {
        try acteNaissance.transactionExists(transactionHash) returns (bool result) {
            Deces memory nouveauDeces = Deces(prenom, nom, dateDeces, circonstanceDeces);
            deces[msg.sender].push(nouveauDeces);
            emit DecesEnregistree(msg.sender, prenom, nom, dateDeces, circonstanceDeces);
        } catch {
            emit Log("external call failed");
        }
    }

      function obtenirDeces(uint256 acteIndex) public view returns (string memory, string memory, string memory, string memory) {
        Deces[] memory actesPersonne = deces[msg.sender];
        require(acteIndex < actesPersonne.length, "Cet acte nexiste pas.");
        Deces memory acteDeces = actesPersonne[acteIndex];
        return (acteDeces.prenom, acteDeces.nom, acteDeces.dateDeces, acteDeces.circonstanceDeces);
    }
}
```

#### Counter.sol
Ce contrat ets un des premier créé pour se faire la main avec solidity. Il incrémente et décrémente un compteur en générant des transactions.
```js
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
```