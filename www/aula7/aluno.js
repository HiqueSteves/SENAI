class Aluno {
    nome;
    idade;
    curso;

    souAluno(nome, idade, curso){
        this.nome = nome
        this.idade = idade
        this.curso = curso    
        console.log("Meu nome é " + nome + ", tenho " + idade + " anos, e estou cursando " + curso)
    }    
}

var exibirAluno = new Aluno()
exibirAluno.souAluno("Henrique", "18", "Back-End")