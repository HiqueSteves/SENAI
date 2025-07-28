/*const myHeading = document.querySelector("h1");
myHeading.textContent = "Olá mundo!";*/

/*document.querySelector("html").addEventListener("click", function () {
    alert("Você clicou aqui")
})*/

/*const myImage = document.querySelector("img");

myImage.onClick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/logo-senai.jpg") {
        myImage.setAttribute("src", "images/logo-senai2.png");
    } else {
        myImage.setAttribute("src", "images/logo-senai.jpg")
    }    
}*/

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1")

function setUserName() {
    const myName = prompt("Por favor, digite o seu nome")
    localStorage.setItem("name", myName)
    myHeading.textContent = `Bem-vindo ao SENAI, ${myName}`

    if (!localStorage.getItem("name")) {
        setUserName()
    } else {
        const storedName = localStorage.getItem("name")
        myHeading.textContent = `Bem-vindo ao SENAI, ${storedName}`
    }
}

myButton.onclick = () => {
    setUserName()
}