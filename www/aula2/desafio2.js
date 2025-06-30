let idade = 10

if (idade < 16) {
    console.log("Não pode votar")
} else if ( idade >= 16 && idade <= 17 || idade > 70) {
    console.log("Voto opcional")
} else {
    console.log("Voto é obrigatório")
}