// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract ActeNaissance {
    
    struct Acte {
        string prenom;
        string nom;
        uint256 dateCreation;
        string prenomPere;
        string nomPere;
        string prenomMere;
        string nomMere;
        string villeNaissance;
    }
    
    mapping (address => Acte[]) actes;
    
    function ajouterActe(string memory _prenom, string memory _nom, string memory _prenomPere, string memory _nomPere, string memory _prenomMere, string memory _nomMere, string memory _villeNaissance) public {
        actes[msg.sender].push(Acte(_prenom, _nom, block.timestamp, _prenomPere, _nomPere, _prenomMere, _nomMere, _villeNaissance));
    }
    
    function obtenirActe(uint256 _index) public view returns (string memory, string memory, uint256, string memory, string memory, string memory, string memory, string memory) {
        Acte[] memory actesPersonne = actes[msg.sender];
        require(_index < actesPersonne.length, "Cet acte nexiste pas.");
        Acte memory acte = actesPersonne[_index];
        return (acte.prenom, acte.nom, acte.dateCreation, acte.prenomPere, acte.nomPere, acte.prenomMere, acte.nomMere, acte.villeNaissance);
    }

    function afficherActes() public view returns (Acte[] memory) {
    return actes[msg.sender];
}

}
