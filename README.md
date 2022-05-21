# Developing your first Dapp (QM talk)

## Table of Contents
- [Developing your first Dapp (QM talk)](#developing-your-first-dapp-qm-talk)
  - [Table of Contents](#table-of-contents)
  - [Basic knowledge](#basic-knowledge)
  - [What I do demo today](#what-i-do-demo-today)
  - [Prerequisites](#prerequisites)
  - [Web page with React](#web-page-with-react)
  - [Solidiy smart contract](#solidiy-smart-contract)
  - [Connect the web page with the smart contracts](#connect-the-web-page-with-the-smart-contracts)
  - [Advanced](#advanced)
    - [Modify the smart contract](#modify-the-smart-contract)
    - [Deploy on Polygon](#deploy-on-polygon)
    - [Hardhat](#hardhat)
## Basic knowledge

- Dapp(A decentralized application): an application built on a decentralized network that combines a smart contract and a frontend user interface.
- Blockchain:
- Smart Contract:
- Ethereun:
- Solidity: a programming language for smart contracts
- Web3:

## What I do demo today

![diagram](/dapp-diagram.png)

## Prerequisites

- [Metamask Chrome extension](https://metamask.io/)
- [Testnet faucet](https://faucet.paradigm.xyz/)

## Web page with React

```
npx create-react-app dapp-demo
cd dapp-demo
npm start
```

https://github.com/backy22/dapp-demo/tree/starter

## Solidiy smart contract

- Go to [Remix](https://remix.ethereum.org/): online IDE(integrated development environment)
- Write a contract

```javascript
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract GreetingContract {
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
  - Select Rinkeby network
- Compile
- Deploy
  - Select `Injected Web3`
  - Gas
- Check on Etherscan
- Test on Remix

## Connect the web page with the smart contracts

- Import the [Ethers.js](https://docs.ethers.io/v5/)
  - Ethers.js: Ethereum Web Client Library. Interact with Ethereum Blockchain from client-side.

```
npm i ethers
```

- Copy and paste the contract address
- Copy and paste ABI(Application Binary Interface)
  - ABI: Interface between client-side and blockchain. A representation of the contract's methods in JSON format.
## Advanced

### Modify the smart contract

- Use array instead of string

```javascript
string[] greetings;


function getAllGreetings() public view returns(string[] memory) {
    return greetings;
}
```

- Use struct

```javascript
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract GreetingContract {

    struct Greeting {
        address sender;
        string greeting;
    }

    Greeting[] public greetings;

    function postGreeting(string memory _greeting) public {
        greetings.push(Greeting(msg.sender, _greeting));
    }

    function getAllGreetings() public view returns(Greeting[] memory) {
        return greetings;
    }

}
```
### Deploy on Polygon

- What is Polygon?
- Why Polygon?
- Add Polygon and Mumbai(Polygon Testnet) network on your Metamask
  - Network: 
- Faucet
- Connect Polygon network on Remix and deploy (same process)
### Hardhat

- What is [Hardhat](https://hardhat.org/)?
  - Hardhat: Ethereum Developement environment(EVM)