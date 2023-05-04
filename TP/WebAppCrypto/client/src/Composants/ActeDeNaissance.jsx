import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BirthCertificateContract from "../contracts/ActeNaissance.json";

export default function ActeDeNaissance() {
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [Prenom, setPrenom] = useState("");
    const [Nom, setNom] = useState("");
    const [PrenomPere, setPrenomPere] = useState("");
    const [NomPere, setNomPere] = useState("");
    const [PrenomMere, setPrenomMere] = useState("");
    const [NomMere, setNomMere] = useState("");
    const [DateAnniversaire, setDateAnniversaire] = useState("");
    const [VilleNaissance, setVilleNaissance] = useState("");
    const [transactionHash, setTransactionHash] = useState(null);
    const [acteIndex, setActeIndex] = useState(0);
    const [naissance, setNaissance] = useState(null);

    // Enregistrement de l'acte de naissance par l'utilisateur connecté
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await contract.methods
                .enregistrerNaissance(
                    Prenom,
                    Nom,
                    PrenomPere,
                    NomPere,
                    PrenomMere,
                    NomMere,
                    DateAnniversaire,
                    VilleNaissance,
                )
                .send({ from: accounts[0] });
            setTransactionHash(result.transactionHash);
        } catch (error) {
            console.error(error);
        }
    };

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

    useEffect(() => {
        async function init() {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts);

                    const networkId = await web3.eth.net.getId();
                    const deployedNetwork = BirthCertificateContract.networks[networkId];
                    const contract = new web3.eth.Contract(
                        BirthCertificateContract.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(contract);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        init();
    }, []);

    return (
        <div>
            {contract && accounts && (
                <>
                <h2>Réaliser un acte de Naissance</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Prenom">Prénom :</label>
                        <input
                            type="text"
                            id="Prenom"
                            value={Prenom}
                            onChange={(e) => setPrenom(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Nom">Nom :</label>
                        <input
                            type="text"
                            id="Nom"
                            value={Nom}
                            onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="PrenomPere">Prénom du père :</label>
                        <input
                            type="text"
                            id="PrenomPere"
                            value={PrenomPere}
                            onChange={(e) => setPrenomPere(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="NomPere">Nom du père :</label>
                        <input
                            type="text"
                            id="NomPere"
                            value={NomPere}
                            onChange={(e) => setNomPere(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="PrenomMere">Prénom de la mère :</label>
                        <input
                            type="text"
                            id="PrenomMere"
                            value={PrenomMere}
                            onChange={(event) => setPrenomMere(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="NomMere">Nom de la mère :</label>
                        <input
                            type="text"
                            id="NomMere"
                            value={NomMere}
                            onChange={(event) => setNomMere(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="DateAnniversaire">Date de naissance :</label>
                        <input
                            type="date"
                            id="DateAnniversaire"
                            value={DateAnniversaire}
                            onChange={(event) => setDateAnniversaire(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="VilleNaissance">Ville de naissance :</label>
                        <input
                            type="text"
                            id="VilleNaissance"
                            value={VilleNaissance}
                            onChange={(event) => setVilleNaissance(event.target.value)} />
                    </div>
                    <button onClick={handleSubmit}>Générer l'acte de naissance</button>
                    <div>
                        <p>Numéro de la transaction : {transactionHash}</p>
                    </div>
                </form><div>
                        <h2>Obtenir un acte de naissance</h2>
                        <label>
                            Index de l'acte :
                            <input type="number" value={acteIndex} onChange={(e) => setActeIndex(e.target.value)} />
                        </label>
                        <button onClick={obtenirNaissance}>Obtenir l'acte</button>
                        {naissance && (
                            <div>
                                <h2>Acte de naissance</h2>
                                <p>Prénom : {naissance[0]}</p>
                                <p>Nom : {naissance[1]}</p>
                                <p>Prénom du père : {naissance[2]}</p>
                                <p>Nom du père : {naissance[3]}</p>
                                <p>Prénom de la mère : {naissance[4]}</p>
                                <p>Nom de la mère : {naissance[5]}</p>
                                <p>Date de naissance : {naissance[6]}</p>
                                <p>Ville de naissance : {naissance[7]}</p>
                            </div>
                        )}
                    </div></>
            )}
        </div>
    )
}

