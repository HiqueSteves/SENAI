class Livro {
    titulo;
    autor;

    meuLivro(titulo, autor){
        this.titulo = titulo
        this.autor = autor
        console.log("o título desse livro é " + this.titulo + ", do autor " + this.autor)
    }
        
}

var exibirInfo = new Livro()
exibirInfo.meuLivro("Livro1", "Autor1")