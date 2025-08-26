import { useEffect, useState } from "react";

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [teste, setTeste] = useState(0);

    async function buscarUsuarios() {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        const dados = await resposta.json();
        setUsuarios(dados);
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div>
            <h2>Lista de Usuários</h2>
            <ul>
                {usuarios.map(usuario => {
                    <li key={usuario.id}>{usuario.name}</li>
                })}
            </ul>

        </div>
    );
}