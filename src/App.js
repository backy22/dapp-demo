import React, { useState } from 'react';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setGreeting(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postGreeting();
  }

  const postGreeting = async() => {
  }

  const getGreeting = async() => {
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
