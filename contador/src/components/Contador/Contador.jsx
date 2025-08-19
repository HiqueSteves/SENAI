import React, { useState } from "react";
 function Contador() {
    const [contador, setContador] = useState(0);
 function Nomes() {
    const [nome, setNome] = useState("Maria")
 }

    return (
        <div>
            <h2>Contador: {contador}</h2>
            <button onClick={() => setContador(contador + 1)}>Adicionar</button>
            <button onClick={() => setContador(contador - 1)}>Remover</button>
        </div>

    )


 }

 export default Contador;

 <h2>Nome: {nome}</h2>
 <button onClick={() => setNome(nome == 'João' ? 'Maria' : 'João' )}>Mudar</button>

