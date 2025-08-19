/*import Contador from './components/Contador/Contador'

function App() {
  return ( 

    <Contador/>

  )
}

export default App;*/

import React from 'react';

function ListaNomes() {
  const [nomes, setNomes] = useState([]);
  const [novoNome, setNovoNome] = useState("");

  const adicionarNome = () => {
    if (novoNome.trim() === "") return;
    setNomes([...nomes, novoNome])
    setNovoNome("")
  }

  return (
    <div>
      <h2>Lista de Nomes</h2>

      <input
      type='text'
      value={novoNome}
      onChange={(e) => setNovoNome(e.target.value)}
      placeholder='Digite um nome'
      />
      <button onClick={adicionarNome}>Adicionar</button>

      <ul>
        {nome.map((nome, index) => (
          <li key={index}>{nome}</li>
        ))}
      </ul>
    </div>
  )

  
}

export default App