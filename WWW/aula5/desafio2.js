let notas = [7, 5, 6, 4, 8]
let notasTrocadas = []

for (let i = 0; i < notas.length; ++i) {
    if (notas[i] < 6) {
        notasTrocadas.push(6)
    } else {
        notasTrocadas.push(notas[i])
    }
}

console.log(notasTrocadas)