import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const [greeting, setGreeting] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');
  const [greeterContract, setGreeterContract] = useState(null);

  const greeterContractAddress = '0x2287786991A37fF7237AcE1d0dc3512573EceBfD';
  const greeterContractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "postGreeting",
      "outputs": [],
      "stateMutability": "nonpayable", // this function does not aceept any ether
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const connectAccount = async () => {
    const { ethereum } = window;
    // Request access to account.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log('accounts', accounts);
    setAccount(accounts[0])
  }

  useEffect(() => {
    connectAccount();
    if (account) {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum); // provider: connection to the ethereum network
      const signer = provider.getSigner(); // signer: holds your private key and can sign things
      const _greeterContract = new ethers.Contract(greeterContractAddress, greeterContractABI, signer); // define the contract object
      setGreeterContract(_greeterContract);
    }
  }, [account]);

  const handleChange = (e) => {
    setGreeting(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postGreeting();
  }

  const postGreeting = async() => {
    await greeterContract.postGreeting(greeting);
  }

  const getGreeting = async() => {
    const Greeting = await greeterContract.getGreeting();
    setResult(Greeting);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Greeting Dapp</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Greeting">Enter your greeting:</label>
          <textarea type="text" value={greeting} onChange={handleChange} />
          <button className="submit-btn" type="submit">Submit</button>
        </form>
        <button className="get-btn" type="button" onClick={getGreeting}>Get greeting</button>
        <div className="result">{result}</div>
      </div>
    </div>
  );
}

export default App;
