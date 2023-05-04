import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BirthCertificateContract from "../contracts/ActeNaissance.json";
import '../css/ActeDeNaissance.css'

export default function ActeDeNaissance() {
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fatherFirstName, setFatherFirstName] = useState("");
    const [fatherLastName, setFatherLastName] = useState("");
    const [motherFirstName, setMotherFirstName] = useState("");
    const [motherLastName, setMotherLastName] = useState("");
    const [dateBirthDay, setDateBirthDay] = useState("");
    const [birthCity, setBirthCity] = useState("");
    const [transactionHash, setTransactionHash] = useState(null);
    const [acteIndex, setActeIndex] = useState(0);
    const [naissance, setNaissance] = useState(null);

    // Enregistrement de l'acte de naissance par l'utilisateur connecté
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await contract.methods
                .enregistrerNaissance(
                    firstName,
                    lastName,
                    fatherFirstName,
                    fatherLastName,
                    motherFirstName,
                    motherLastName,
                    dateBirthDay,
                    birthCity
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
        <p>Compte réalisant la transaction : {accounts}</p>
            {contract && accounts && (
                <><form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="fatherFirstName">Father's first name:</label>
                        <input
                            type="text"
                            id="fatherFirstName"
                            value={fatherFirstName}
                            onChange={(e) => setFatherFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="fatherLastName">Father's last name:</label>
                        <input
                            type="text"
                            id="fatherLastName"
                            value={fatherLastName}
                            onChange={(e) => setFatherLastName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="motherFirstName">Prénom de la mère :</label>
                        <input
                            type="text"
                            id="motherFirstName"
                            value={motherFirstName}
                            onChange={(event) => setMotherFirstName(event.target.value)} />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="motherLastName"
                            value={motherLastName}
                            onChange={(event) => setMotherLastName(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="dateBirthDay">Date de naissance :</label>
                        <input
                            type="date"
                            id="dateBirthDay"
                            value={dateBirthDay}
                            onChange={(event) => setDateBirthDay(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="birthCity">Ville de naissance :</label>
                        <input
                            type="text"
                            id="birthCity"
                            value={birthCity}
                            onChange={(event) => setBirthCity(event.target.value)} />
                    </div>
                    <button onClick={handleSubmit}>Générer l'acte de naissance</button>
                    <div>
                        <p>Numéro de la transaction : {transactionHash}</p>
                    </div>
                </form><div>
                        <h1>Obtenir un acte de naissance</h1>
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

