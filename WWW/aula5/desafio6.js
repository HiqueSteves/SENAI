let saldo = [100, -20, 200, -30, 150]
let soma = 0

for (let i = 0; i < saldo.length; ++i) {
    if (saldo[i] > 0) {
        soma += saldo[i]
    }
}
console.log(soma)