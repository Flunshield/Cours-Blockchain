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
        string villeNaissance;
    }

    mapping (address => Naissance[]) naissances;
    event NaissanceEnregistree(address indexed utilisateur, string prenom, string nom, string perePrenom, string pereNom, string merePrenom, string mereNom, string villeNaissance);

function enregistrerNaissance(string memory prenom, string memory nom, string memory perePrenom, string memory pereNom, string memory merePrenom, string memory mereNom, string memory villeNaissance) public {
    Naissance memory nouvelleNaissance = Naissance(prenom, nom, perePrenom, pereNom, merePrenom, mereNom, villeNaissance);
    naissances[msg.sender].push(nouvelleNaissance);
    emit NaissanceEnregistree(msg.sender, prenom, nom, perePrenom, pereNom, merePrenom, mereNom, villeNaissance);
}

    function obtenirNaissance(uint256 acteIndex) public view returns (string memory prenom, string memory nom, string memory perePrenom, string memory pereNom, string memory merePrenom, string memory mereNom, string memory villeNaissance) {
        Naissance[] memory actesPersonne = naissances[msg.sender];
        require(acteIndex < actesPersonne.length, "Cet acte nexiste pas.");
        Naissance memory acteNaissance = actesPersonne[acteIndex];
        return (acteNaissance.prenom, acteNaissance.nom, acteNaissance.perePrenom, acteNaissance.pereNom, acteNaissance.merePrenom, acteNaissance.mereNom, acteNaissance.villeNaissance);
    }
}
