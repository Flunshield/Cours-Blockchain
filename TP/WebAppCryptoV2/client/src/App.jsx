import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BirthCertificateContract from "./contracts/ActeNaissance.json";

function App() {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherFirstName, setFatherFirstName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [motherFirstName, setMotherFirstName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [, setTransactionHash] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await contract.methods
        .ajouterActe(
          firstName,
          lastName,
          fatherFirstName,
          fatherLastName,
          motherFirstName,
          motherLastName,
          birthCity
        )
        .send({ from: accounts[0] });
      setTransactionHash(result.transactionHash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {contract && accounts && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fatherFirstName">Father's first name:</label>
            <input
              type="text"
              id="fatherFirstName"
              value={fatherFirstName}
              onChange={(e) => setFatherFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fatherLastName">Father's last name:</label>
            <input
              type="text"
              id="fatherLastName"
              value={fatherLastName}
              onChange={(e) => setFatherLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="motherFirstName">Prénom de la mère :</label>
            <input
              type="text"
              id="motherFirstName"
              value={motherFirstName}
              onChange={(event) => setMotherFirstName(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="motherLastName"
              value={motherLastName}
              onChange={(event) => setMotherLastName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birthCity">Ville de naissance :</label>
            <input
              type="text"
              id="birthCity"
              value={birthCity}
              onChange={(event) => setBirthCity(event.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Générer l'acte de naissance</button>
        </form>
     ) }
    </div>
  )
}

export default App;
