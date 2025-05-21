const frutas = ['Maçã', 'Uva', 'Laranja']

console.log(frutas[1])
frutas.push('Abacate')

console.log(frutas)

frutas.pop();
console.log(frutas)

let numeros = [10,20,30,40];
console.log(numeros.length)

let nomes = ['Ana', 'Beatriz', 'João', 'Carlos'];
let nomeFiltrado = nomes.filter(nome => nome == "João");
console.log(nomeFiltrado);

let cores = ['azul', 'vermelho', 'verde'];
cores.forEach(cor => {
    console.log('Cor: ', cor)
});
