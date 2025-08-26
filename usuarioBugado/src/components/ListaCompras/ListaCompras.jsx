import React, { useState } from 'react';

function ListaCompras() {
    const [compras, setCompras] = useState([]);
    const [novaCompra, setNovaCompra] = useState("");

    const adicionarCompra = () => {
        if (novaCompra.trim() === "") return;
        setCompras([...compras, novaCompra])
        setNovaCompra("")
    }

    return (
        <div>
            <h2>Lista de Compras</h2>

            <input
                type='text'
                value={novaCompra}
                onChange={(e) => setNovaCompra(e.target.value)}
                placeholder='Digite um item para compra'
            />
            <button onClick={adicionarCompra}>Adicionar</button>

            <ul>
                {compras.map((compra, index) => (
                    <li key={index}>{compra}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListaCompras;