class Calculadora {
    valor1;
    valor2;

    somar(valor1, valor2) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        var resultado = this.valor1 + this.valor2;
        console.log("Resultado da soma: " + resultado)
    }

    multiplicar(valor1, valor2) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        var resultado = this.valor1 * this.valor2;
        console.log("Resultado da multiplicação: " + resultado)
    }

    dividir(valor1, valor2) {
        this.valor1 = valor1;
        this.valor2 = valor2;
        var resultado = this.valor1 / this.valor2;
        console.log("Resultado da divisão: " + resultado)
    }
}

var calc = new Calculadora();
calc.somar(7,3);
calc.multiplicar(7,3);
calc.dividir(7,3);