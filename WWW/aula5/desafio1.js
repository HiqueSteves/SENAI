let valores = [3, 12, 8, 25, 7]

let contador = 0

for (let i = 0; i < valores.length; ++i) {
    if (valores[i] > 10) {
        ++contador
    }
}

console.log(contador)