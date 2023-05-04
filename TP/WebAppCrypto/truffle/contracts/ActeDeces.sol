// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract ActeDeces {
    
    struct Deces {
        string prenom;
        string nom;
        string dateDeces;
        string circonstanceDeces;
    }

    mapping (address => Deces[]) deces;
    event DecesEnregistree(address indexed utilisateur, string prenom, string nom, string dateDeces, string circonstanceDeces);

function enregistrerDeces(string memory prenom, string memory nom, string memory dateDeces, string memory circonstanceDeces) public {
    Deces memory nouveauDeces = Deces(prenom, nom, dateDeces, circonstanceDeces);
    deces[msg.sender].push(nouveauDeces);
    emit DecesEnregistree(msg.sender, prenom, nom, dateDeces, circonstanceDeces);
}

    function obtenirDeces(uint256 acteIndex) public view returns (string memory, string memory, string memory, string memory) {
        Deces[] memory actesPersonne = deces[msg.sender];
        require(acteIndex < actesPersonne.length, "Cet acte nexiste pas.");
        Deces memory acteDeces = actesPersonne[acteIndex];
        return (acteDeces.prenom, acteDeces.nom, acteDeces.dateDeces, acteDeces.circonstanceDeces);
    }
}
