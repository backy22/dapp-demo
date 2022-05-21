import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { networks } from './utils/networks';

function App() {
  const [greeting, setGreeting] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');

  const greetingContractAddress = '0xF0077df358b1Fc15FcAFCD6950c6EAC280ca7bD2';
  const greetingContractABI = [
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
      "stateMutability": "nonpayable",
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

  const [greetingContract, setGreetingContract] = useState(null);

  const connectAccount = async () => {
    const { ethereum } = window;
    // Request access to account.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log('accounts', accounts);
    setAccount(accounts[0])
  }

  const checkNetwork = async () => {
    const { ethereum } = window;
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log('chainId', networks[chainId]);

    ethereum.on('chainChanged', handleChainChanged);

		// Reload the page when they change networks
		function handleChainChanged(_chainId) {
			window.location.reload();
		}
  }

  useEffect(() => {
    connectAccount();
    checkNetwork();
    if (account) {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum); // provider: connection to the ethereum network
      const signer = provider.getSigner(); // signer: holds your private key and can sign things
      const _greetingContract = new ethers.Contract(greetingContractAddress, greetingContractABI, signer); // define the contract object
      setGreetingContract(_greetingContract);
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
    const postGreetingPromise = greetingContract.postGreeting(greeting);
    await postGreetingPromise;
  }

  const getGreeting = async() => {
    const getGreetingPromise = greetingContract.getGreeting();
    const Greeting = await getGreetingPromise;
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
