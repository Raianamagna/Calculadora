//Operação anterior 
const previousOperationText = document.querySelector("#previous-operation");

//Operação atual
const currentOperationText = document.querySelector("#current-operation");

//Botoes
const buttons = document.querySelectorAll("#buttons-container button");
console.log(buttons);

/* Eventos dos botoes*/
buttons.forEach((btn) => {
 
    //Receber os valores dos botoes
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === "."){
            console.log(value);
            calc.addDigit(value); 
        } else {
           calc.processOperation(value);
        }
       
    });
    
});

/* Logica da aplicação*/
class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

     // Adiciona os digitos
     addDigit(digit){
        console.log(digit);

        // Verifica se o número já tem um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
     }

      // processa todas as operações da calculadora
      processOperation(operation){

        //Verifique se o valor atual está vazio
        if (this.currentOperationText.innerText === "" && operation !== "c"){
         // Muda a operação
         if (this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
         }
            return;

        }
         
        // Obtém valores atuais e anteriores
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }
         // Altera os valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {

      // Anexa número ao valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {

      // Verifica se o valor é zero, se for apenas adiciona o valor atual
      if (previous === 0) {
        operationValue = current;
      }

      // Adiciona o valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Altera a operação matemática
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Exclui um dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpa a operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpa todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processa uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

    
