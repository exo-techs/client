import {useState, default as React} from 'react';
import logo from './logo.svg';
import './App.css';

var socket = require('socket.io-client')('http://192.168.3.153:3001');

function App() {

  const [sensor, setSensor] = useState({});
  const [relay1, setRelay1] = useState(0);
  const [relay2, setRelay2] = useState(0);

  socket.on('connect', function(){
    console.log('connected');
    socket.emit('userConnect', {
      userId: Date.now() // TODO: Get better id for user
    });
  });

  socket.on('clientData', (data) => {
    console.log(data);
    setSensor(data);
  });

  // TODO: Duplicate code fix
  const toggleRelay1 = () => {
    socket.emit("toggleRelay", {
      pin: 1,
      state: relay1
    });
    setRelay1(!relay1);
  }

  const toggleRelay2 = () => {
    socket.emit("toggleRelay", {
      pin: 2,
      state: relay2
    });
    setRelay2(!relay2);
  }
  
  return (
    <div className="App">
          <p>temprature: {sensor.temprature}</p>
          <p>humidity: {sensor.humidity}</p>

          <button onClick={toggleRelay1}>Toggle relay 1</button>
          <button onClick={toggleRelay2}>Toggle relay 2</button>
    </div>
  );
}

export default App;
