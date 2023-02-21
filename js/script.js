//selecionando elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordBtn = document.querySelector("#copy-password");


//funções do sistema

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = "";

    const passwordLength = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked){
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked){
        generators.push(getNumber);
    }

    if(symbolsInput.checked){
        generators.push(getSymbol);
    }

    if(generators.length === 0){
        return;
    }


    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        })
    }

    password = password.slice(0, passwordLength);




    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;

}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*?+";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}



//eventos
generatePasswordButton.addEventListener("click", (e) => {
    generatePassword(getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol);
})

openCloseGeneratorButton.addEventListener("click", () => { 

    generatePasswordContainer.classList.toggle("hide");

});

copyPasswordBtn.addEventListener("click",(e) => {

    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordBtn.innerText = "Senha copiada com sucesso";

        setTimeout(() => {
            copyPasswordBtn.innerHTML = "Copiar";
        }, 1000)
    });

});