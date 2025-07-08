let numeros = [1, 2, 3, 4, 5, 6, 7, 8]
let numerosImpares = []

for (let i = 0; i < numeros.length; ++i) {
    if (numeros[i] % 2 == 1 ) {
        numerosImpares.push(numeros[i])
    }
}

console.log(numerosImpares)
