let nomes = ['João', 'Gabriel', 'Ana', 'Roberto']
let contador = 0

for (let i = 0; i <= nomes.length; ++i ) {
    if (nomes[i].length > 5) {
        ++contador
    }
}

console.log(contador)