import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BirthCertificateContract from "../contracts/ActeDeces.json";

export default function ActeDeNaissance() {
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [Prenom, setPrenom] = useState("");
    const [Nom, setNom] = useState("");
    const [DateDeces, setDateDeces] = useState("");
    const [Circonstance, setCirconstance] = useState("");
    const [transactionHash, setTransactionHash] = useState(null);
    const [acteIndex, setActeIndex] = useState(0);
    const [deces, setDeces] = useState(null);

    // Enregistrement de l'acte de naissance par l'utilisateur connecté
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await contract.methods
                .enregistrerDeces(
                    Prenom,
                    Nom,
                    DateDeces,
                    Circonstance
                )
                .send({ from: accounts[0] });
            setTransactionHash(result.transactionHash);
        } catch (error) {
            console.error(error);
        }
    };

    // Obtenir une naissance enregistrée par l'utilisateur connecté
    async function obtenirDeces() {
        try {
            const result = await contract.methods.obtenirDeces(acteIndex).call({ from: accounts[0] });
            setDeces(result);
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
        <div className="acte-deces-container">
            {contract && accounts && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2>Enregistrer un acte de decès</h2>
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
                            <label htmlFor="DateDeces">Date de naissance :</label>
                            <input
                                type="date"
                                id="DateDeces"
                                value={DateDeces}
                                onChange={(event) => setDateDeces(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="Circonstance">Ville de naissance :</label>
                            <input
                                type="text"
                                id="Circonstance"
                                value={Circonstance}
                                onChange={(event) => setCirconstance(event.target.value)} />
                        </div>
                        <div className="acte-deces-transaction">
                            <button onClick={handleSubmit}>Générer l'acte de naissance</button>
                            <p>Numéro de la transaction : {transactionHash}</p>
                        </div>
                    </form>
                    <div>
                        <h2>Obtenir un acte de decès</h2>
                        <label>
                            Index de l'acte :
                            <input type="number" value={acteIndex} onChange={(e) => setActeIndex(e.target.value)} />
                        </label>
                        <button onClick={obtenirDeces}>Obtenir l'acte</button>
                        {deces && (
                            <div>
                                <h2>Acte de deces</h2>
                                <p>Prénom : {deces[0]}</p>
                                <p>Nom : {deces[1]}</p>
                                <p>Date du decès : {deces[2]}</p>
                                <p>Circonstante : {deces[3]}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

