import {useState, default as React} from 'react';
import logo from './logo.svg';
import './App.css';

var socket = require('socket.io-client')('http://192.168.3.153:3000');

function App() {

  const [sensor, setSensor] = useState({});

  socket.on('connect', function(){
    console.log('connected');
    socket.emit('test', 'WORKS!');
  });

  socket.on('clientData', (data) => {
    console.log(data);
    setSensor(data);
  });
  
  return (
    <div className="App">
      <header className="App-header">
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
          <p>temprature: {sensor.temprature}</p>
          <p>humidity: {sensor.humidity}</p>
        </a>
      </header>
    </div>
  );
}

export default App;
