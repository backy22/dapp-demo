# Developing your first Dapp (QM talk)

## Table of Contents
- [Developing your first Dapp (QM talk)](#developing-your-first-dapp-qm-talk)
  - [Table of Contents](#table-of-contents)
  - [Terminology](#terminology)
  - [What I demo today](#what-i-demo-today)
  - [Preparation](#preparation)
  - [Web page with React](#web-page-with-react)
  - [Solidiy smart contract](#solidiy-smart-contract)
  - [Connect the web page with the smart contracts](#connect-the-web-page-with-the-smart-contracts)
  - [In real life](#in-real-life)
    - [Modify the smart contract](#modify-the-smart-contract)
    - [Deploy on Polygon](#deploy-on-polygon)
    - [Hardhat](#hardhat)
## Terminology

- Dapp(A decentralized application)
  >[an application built on a decentralized network that combines a smart contract and a frontend user interface](https://ethereum.org/en/developers/docs/dapps/#top)
- Blockchain:
    >[a public database that is updated and shared across many computers in a network.](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
- Smart Contract:
    >[a reusable snippet of code (a program) which a developer publishes into EVM state.](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
- Solidity: a programming language for smart contracts
- Web3: 
    >[the stack of protocols that enable fully decentralized applications.](https://twitter.com/jbrukh/status/1449734638788821002)
    >[Web3 uses blockchains, cryptocurrencies, and NFTs to give power back to the users in the form of ownership. ](https://ethereum.org/en/web3/#introduction)

## What I demo today

![diagram](/dapp-diagram.png)

## Preparation

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
  - memory: _greeting variable should be stored in memory. The variable is used only inside function. This will disappear when the function call ends.
    - cf storage: stored permanently on the blockchain. State variables is stored in storage. This means that it costs gas fee.
  - public: function is public by default
    - cf private, internal, external
  - view: it's only viewing the data but not modifying it. doesn't cost gas fee.

```javascript
// Specift the solidity version and add a license
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Greeter {
    string greeting;

    //create a function that writes a greeting to the smart contract
    function postGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
    
    //create a function that reads the greeting from the smart contract
    function getGreeting() public view returns(string memory) {
        return greeting;
    }

}
```

- Connect to the wallet
  - Select Rinkeby network
- Compile
  - Generate bytecode that EVM can read, and ABI that web application can understand the contract
- Deploy
  - Select `Injected Web3` to connect Metamask
  - Gas: fee to execute transactions
- Check on Etherscan: blockchain explorer that lets you view public data on transactions, smart contracts, addresses etc.
- Test on Remix

## Connect the web page with the smart contracts

- Write the code to connect account
- Import the [Ethers.js](https://docs.ethers.io/v5/)
  - Ethers.js: Ethereum Web Client Library. Interact with Ethereum Blockchain from client-side.

```
npm i ethers
```
- Connect the smart contract
  - Copy and paste the contract address
  - Copy and paste ABI(Application Binary Interface)
    - [ABI](https://docs.soliditylang.org/en/develop/abi-spec.html): Interface between client-side and blockchain. A representation of the contract's methods in JSON format.
- Test on the browser
  - Connect the wallet
  - See the transactions on etherscan
## In real life

### Modify the smart contract

- Use array

```javascript
string[] greetings;


function getAllGreetings() public view returns(string[] memory) {
    return greetings;
}
```

- Use struct: you can create custom data type using struct
  - msg.sender: global variables that are available to all functions. the address of the person (or smart contract) who called the current function.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Greeter {

    struct Greeting {
        address sender;
        string greeting;
    }

    Greeting[] greetings;

    function postGreeting(string memory _greeting) public {
        greetings.push(Greeting(msg.sender, _greeting));
    }

    function getAllGreetings() public view returns(Greeting[] memory) {
        return greetings;
    }

}
```

※ Smart contracts in Ethereum are immutable by default. Once you create them, there is no way to alter them. If you upgrade the contract, you need to migrate all data from the old contract manually, which costs gas fees.

https://github.com/backy22/dapp-demo/tree/modify-contract

### Deploy on Polygon

- What is Polygon?
  - Ethereum sidechain. parallel blockchain running alongside the main Ethereum blockchain
- Why Polygon?
  - Speedy transactions and low fees
- Add Polygon and Mumbai(Polygon Testnet) network on your Metamask
- [Faucet](https://mumbaifaucet.com/)
- Connect Polygon network on Remix and deploy (same process)
  - Check the [polygon scan](https://mumbai.polygonscan.com/tx/0xf7a1a2b3ac9496433796aa3ba458b0eaffe2e20cc0deb032ee179f54188781c5)
- Connect Polygon network on frontend (manually for now)
  - Check the network

https://github.com/backy22/dapp-demo/tree/polygon-network
### Hardhat

- What is [Hardhat](https://hardhat.org/getting-started/#overview)?
  - Hardhat: Ethereum Developement environment(EVM)
  - Enable to deploy your contracts, run tests, debug Solidity code without live environment
- [hardhat-demo-app](https://github.com/backy22/hardhat-dapp-demo)

compile

```
npx hardhat compile
```

run the test accounts

```
npx hardhat node
```

deploy to the local network

```
npx hardhat run scripts/deploy.js --network localhost
```

- connect the local account in metamask to test
