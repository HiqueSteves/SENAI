function contarNegativos() {
    let numeros = [5, -2, 0, -7, 3,]
    let contador = 0
    
    for (let i = 0; i < numeros.length; ++i) {
        if (numeros[i] < 0 ) {
            contador++
        }
    }
    
    console.log(contador) 
}
contarNegativos()
