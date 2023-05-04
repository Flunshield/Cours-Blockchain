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

