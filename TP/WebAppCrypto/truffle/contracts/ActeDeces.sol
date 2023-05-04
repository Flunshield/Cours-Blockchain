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
        //bool test = bool(acteNaissance.transactionExists(transactionHas));
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
