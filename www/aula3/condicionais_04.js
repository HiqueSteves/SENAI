let idade = 18;

if (idade <= 15) {
    console.log("Você não pode votar.");
} else if (idade <= 17 || idade >= 70 ) {
    console.log("Seu voto é opicional");
} else {
    console.log("Seu voto é obrigatório.");
}