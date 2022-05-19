import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { shortenAddress } from './utils/shorten-address'

function App() {
  const [greeting, setGreeting] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');
  const [allGreetings, setAllGreetings] = useState([]);

  const greetingContractAddress = '0x53E926e287fCC768c511Dcc28d2f9004f41fAd21';
  const greetingContractABI =  [
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
      "name": "getAllGreetings",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "greeting",
              "type": "string"
            }
          ],
          "internalType": "struct GreetingContract.Greeting[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "greetings",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "greeting",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const [greetingContract, setGreetingContract] = useState(null);

  const connectAccount = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const accounts = await provider.listAccounts()
    setAccount(accounts[0])
  }

  useEffect(() => {
    connectAccount();
    if (account) {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log('signer', signer);
      const _greetingContract = new ethers.Contract(greetingContractAddress, greetingContractABI, signer);
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

  const getAllGreetings = async() => {
    const getAllGreetingsPromise = greetingContract.getAllGreetings();
    const Greetings = await getAllGreetingsPromise;
    console.log(Greetings)
    setAllGreetings(Greetings);
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
        <button className="get-btn" type="button" onClick={getAllGreetings}>Get All greetings</button>
        {allGreetings.map(item => (
          <div key={item.sender} className="greeting">
            <div className="sender">{shortenAddress(item.sender)}: {item.greeting}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
