import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>MCC</Button>
        <Button>MC</Button>
        <Button>MCM</Button>
        <Button>GM</Button>
        <Button>MClC</Button>
      </ButtonGroup>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
