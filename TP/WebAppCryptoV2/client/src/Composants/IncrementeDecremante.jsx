import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CounterContract from "../contracts/Counter.json";

export default function IncrementeDecremante() {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = CounterContract.networks[networkId];
          const contract = new web3.eth.Contract(
            CounterContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contract);

          const value = await contract.methods.getValue().call();
          setCount(value);
        } catch (error) {
          console.error(error);
        }
      }
    }
    init();
  }, []);

  const handleIncrement = async () => {
    try {
      await contract.methods.increment().send({ from: accounts[0] });
      const value = await contract.methods.getValue().call();
      setCount(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrement = async () => {
    try {
      await contract.methods.decrement().send({ from: accounts[0] });
      const value = await contract.methods.getValue().call();
      setCount(value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {contract && accounts && (
        <div>
          <p>Account: {accounts[0]}</p>
          <p>Count: {count}</p>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
      )}
    </div>
  );
}

