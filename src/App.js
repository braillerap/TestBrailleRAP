import { useState } from 'react';
import logo from './logo.svg';


function App() {
  const [connected, setConnected] = useState(false)

  const setConnectedState = () => {
    setConnected(true);
  }

  const setDisconnected = () => {
    setConnected(false);
  }


  return (
    <div className="App">

      <div className='min-w-80 mx-auto bg-red-500 text-center' >
        <h1 className="text-3xl font-bold underline text-center">
          TestBrailleRAP 
        </h1>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={connected}
          onClick={setConnectedState}>

          Connexion
        </button>
        &nbsp;com port:
        <select className='select'
        disabled = {connected}>
          <option value="1">COM1</option>
          <option value="2">COM2</option>
          <option value="3">COM3</option>
        </select>
        
        <button
          disabled={!connected}
          class="btn btn-blue"
          onClick={setDisconnected}>
          Deconnexion
        </button>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Etat des fin de course
        </button>

      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Home X
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Home Y
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Home XY
        </button>
      </div>
      <div class="centralgrid">
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y++
        </button>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y+
        </button>
        <div class=""></div>
        <div class=""></div>

        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X--
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X-
        </button>
        
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Embosser 1 point
        </button>
        
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X++
        </button>

        <div class=""></div>

        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y-
        </button>
        <div class="">  </div>
        <div class="">  </div>
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y--
        </button>
        <div class="">  </div>
        <div class="">  </div>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          X-
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Y-
        </button>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Embosser 1 point
        </button>

      </div>
      <div className='flex'>
        <input type="text" className='textedit'></input>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={setConnectedState}>

          Envoyer une commande GCODE
        </button>

      </div>
    </div>
  );
}

export default App;
