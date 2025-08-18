import "./card.css"
import teclado from "../../assets/teclado.jpg"
import mouse from '../../assets/mouse.jpg'
import headset from "../../assets/headset.jpg"
import cadeira from "../../assets/cadeira.jpg"


export default function Card() {
    const produtos = [
        {
            nome: "Teclado Mecânico",
            descricao: "Switches lineares, keycaps PBT e RGB per-key",
            preco: 399.90,
            imagem: teclado
        },
        {
            nome: "Mouse Gamer",
            descricao: "Sensor de alta precisão e design ergonômico.",
            preco: 249.90,
            imagem: mouse
        },
        {
            nome: "Headset Gamer",
            descricao: "Áudio imersivo 7.1 com microfone removível.",
            preco: 549.90,
            imagem: headset
        },
        {
            nome: "Cadeira Gamer",
            descricao: "Cadeira da Skol",
            preco: 49.90,
            imagem: cadeira
        }

    ];


    return (
        <>
            {produtos.map((produto, index) => (
                <article className="card" key={index}>
                    <img
                        className="card__img"
                        src={produto.imagem}
                        alt={produto.nome}
                    />
                    <div className="card__body">
                        <h3 className="card__tittle">{produto.nome}</h3>
                        <p className="card__desc">{produto.descricao}</p>
                    </div>
                    <div className="card__footer">
                        <span className="card__price">
                            R$ {produto.preco.toFixed(2).replace(".", ",")}
                        </span>
                        <button
                            className="card__btn"
                            onClick={() => alert(`Ver mais: ${produto.nome}`)}>
                            Ver mais
                        </button>
                    </div>
                </article>
            ))}
        </>
    )
}
