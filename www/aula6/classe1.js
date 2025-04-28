class Carro {
    marca;
    modelo;
    ano;

    ligar() {
        console.log("O carro está ligado.");
    }
}
 

var carro1 = new Carro()
carro1.marca = "Mercedes-Benz"
carro1.modelo = "AMG"
carro1.ano = 2025

console.log(carro1.marca, carro1.modelo, carro1.ano)

var carro2 = new Carro()
carro2.marca = "Nissan"
carro2.modelo = "R34"
carro2.ano = 1999

console.log(carro2.marca, carro2.modelo, carro2.ano)

var carro3 = new Carro()
carro3.marca = "Toyota"
carro3.modelo = "Supra"
carro3.ano = 1978

console.log(carro3.marca, carro3.modelo, carro3.ano)