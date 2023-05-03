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

    mapping (address => Naissance) naissances;
    event NaissanceEnregistree(address indexed utilisateur, string prenom, string nom, string perePrenom, string pereNom, string merePrenom, string mereNom, string villeNaissance);

    function enregistrerNaissance(string memory prenom, string memory nom, string memory perePrenom, string memory pereNom, string memory merePrenom, string memory mereNom, string memory villeNaissance) public {
        Naissance memory nouvelleNaissance = Naissance(prenom, nom, perePrenom, pereNom, merePrenom, mereNom, villeNaissance);
        naissances[msg.sender] = nouvelleNaissance;
        emit NaissanceEnregistree(msg.sender, prenom, nom, perePrenom, pereNom, merePrenom, mereNom, villeNaissance);
    }

    function obtenirNaissance() public view returns (string memory prenom, string memory nom, string memory perePrenom, string memory pereNom, string memory merePrenom, string memory mereNom, string memory villeNaissance) {
        Naissance memory naissance = naissances[msg.sender];
        return (naissance.prenom, naissance.nom, naissance.perePrenom, naissance.pereNom, naissance.merePrenom, naissance.mereNom, naissance.villeNaissance);
    }
}

