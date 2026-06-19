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

  const voidfunc = () => {

  }


  return (
    <div className="App">

      <div className='min-w-80 mx-auto text-center' >
        <h1 className="text-3xl font-bold">
          TestBrailleRAP 
        </h1>
        <h2>Version:{`${process.env.REACT_APP_VERSION}`}</h2>

      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={connected}
          onClick={setConnectedState}>

          Connexion
        </button>
        <p className='labelelm'>&nbsp;com port:</p>
        
        <select className='select'
        disabled = {connected}>
          <option value="1">COM1</option>
          <option value="2">COM2</option>
          <option value="3">COM3</option>
        </select>
        
        <button
          disabled={connected}
          class="btn btn-blue"
          onClick={voidfunc}>
          Refresh COM
        </button>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={! connected}
          onClick={setDisconnected}>

          Déconnecter
        </button>

      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Etat des fin de course
        </button>

      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Home X
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Home Y
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Home XY
        </button>
      </div>
      <div class="centralgrid">
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y++
        </button>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y+
        </button>
        <div class=""></div>
        <div class=""></div>

        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X--
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X-
        </button>
        
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Embosser 1 point
        </button>
        
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X++
        </button>

        <div class=""></div>

        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y-
        </button>
        <div class="">  </div>
        <div class="">  </div>
        <div class=""></div>
        <div class=""></div>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y--
        </button>
        <div class="">  </div>
        <div class="">  </div>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y+
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          X-
        </button>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Y-
        </button>
      </div>
      <div className='flex'>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Embosser 1 point
        </button>

      </div>
      <div className='flex'>
        <input type="text" className='textedit'></input>
        <button class="btn btn-blue"
          disabled={!connected}
          onClick={voidfunc}>

          Envoyer une commande GCODE
        </button>

      </div>
    </div>
  );
}

export default App;
