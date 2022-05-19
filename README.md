# Developing your first Dapp (QM talk)

- Basic knowledge
- What I do demo today
- Prerequisites
- Web page with React
- Solidiy smart contract
- Connect the web page with the smart contracts
- Advanced
  - Modify the smart contract
  - Polygon
  - Hardhat
## Basic knowledge

Dapp(A decentralized application): an application built on a decentralized network that combines a smart contract and a frontend user interface.
Solidity: a programming language for smart contracts

## What I do demo today

## Prerequisites

- Metamask Chrome extension
- [Testnet faucet](https://faucet.paradigm.xyz/)

## Web page with React

```
npx create-react-app dapp-demo
cd dapp-demo
npm start
```

## Solidiy smart contract

- Go to [Remix](https://remix.ethereum.org/): online IDE(integrated development environment)
- Write a contract

```javascript
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Greeting {
    string greeting;

    //create a function that writes a greeting to the smart contract
    function postGreeting(string memory _greeting) public{
        greeting = _greeting;
    }
    
    //create a function the reads the greeting from the smart contract
    function getGreeting() public view returns(string memory){
        return greeting;
    }

}
```
- Connect to the wallet
- Compile
- Deploy
  - Select `Injected Web3`

## Connect the web page with the smart contracts

- Import the Ethers.js
- Copy and paste the contract address
- Copy and paste ABI(Application Binary Interface): Interface between client-side and blockchain. A representation of the contract's methods in JSON format.
## Advanced

### Modify the smart contract

- Use array instead of string
### Polygon

- Deploy on Polygon chain
### Hardhat

