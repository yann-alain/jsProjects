const mainScreen = document.querySelector('#mainScreen'),
      otherScreen = document.querySelector('#otherScreen'),
      operators = document.querySelectorAll('.operators'),
      number = document.querySelectorAll('.number'),
      period = document.querySelector('#period'),
      equals = document.querySelector('#equals'),
      clear = document.querySelector('#clear'),
      clearAll = document.querySelector('#clearAll'),
      del = document.querySelector('#delete'),
      sign = document.querySelector('#sign'),
      memorySave = document.querySelectorAll('[data-save]'),
      memoryShow = document.querySelectorAll('[data-show]'),
      memoryScreen = document.querySelector('#memScreen'),
      memoryDelete = document.querySelector('[data-delete]'),
      memoryClear = document.querySelector('[data-clear]');


class MyCalculator{
    constructor(mainScreen, otherScreen, memoryScreen) {
        this.mainScreen = mainScreen;
        this.otherScreen = otherScreen;
        this.memoryScreen = memoryScreen;
        this.memoryArray = [];

        this.allClear();
        this.currentSign = false;
    }

    allClear(){
        this.currentInput = ''; //The number on the main Screen
        this.previousInput = ''; //The number on the other Screen
        this.operator = ''; //The operator chosen +, -, *, / ..etc
    }

    appendNumber(numberValue){
        this.currentInput += numberValue.toString();
    }

    changeSign(){
        this.currentSign = !this.currentSign;

        if (this.currentSign){
            this.currentInput = -(this.currentInput);
        }
        else{
            this.currentInput = -(this.currentInput);
        }
    }

    clear(){
        this.currentInput = ''; //The number on the main Screen
    }

    delete(){
        this.currentInput = String(this.currentInput).slice(0, -1);
    }

    memorySave(){
        if (this.saveOtherScreen != null) {
            if (this.saveOtherScreen == '') {
                return
            }
            else {
                this.memoryArray.push(this.saveOtherScreen);
                const p = document.createElement('p');

                let numInt = 0;
                switch (this.operator) {
                    case "+":
                        numInt = parseFloat(this.previousInput) + parseFloat(this.currentInput);
                        break;

                    case "%":
                        numInt = parseFloat(this.previousInput) % parseFloat(this.currentInput);
                        break;

                    case "−":
                        numInt = parseFloat(this.previousInput) - parseFloat(this.currentInput);
                        break;

                    case "×":
                        numInt = parseFloat(this.previousInput) * parseFloat(this.currentInput);
                        break;

                    case "÷":
                        numInt = parseFloat(this.previousInput) / parseFloat(this.currentInput);
                        break;

                    case "x²":
                        numInt = Math.pow(parseFloat(this.previousInput), 2);
                        break;

                    case "¹⁄×":
                        numInt = 1 / parseFloat(this.previousInput);
                        break;

                    case "✓":
                        numInt = Math.sqrt(parseFloat(this.previousInput));
                        break;
                }

                let text = `${this.saveOtherScreen} ${this.currentInput} = ${numInt}`;

                p.setAttribute('class', 'memoryitem');
                p.innerText = text;
                this.memoryScreen.append(p);
                window.alert('saved');

            }
        }
        else{
            return window.alert('The Screen Shouldn\'t be empty');
        }
    }

    memoryClear(){
        if (this.memoryArray.length < 0){
            window.alert('Memory is already empty');
        }
        else{
            for(let i = 0; i <= this.memoryArray.length; i++){
                memoryScreen.childNodes.forEach(p =>{
                    p.remove()
                })
            }
            this.memoryArray = [];
            window.alert('Memory cleared');
        }
    }

    memoryDelete(){
        if (this.memoryArray.length < 0){
            window.alert('Nothing to delete');
        }
        else{
            this.memoryArray.shift();
            memoryScreen.childNodes.forEach(p =>{
                p.remove()
            })
            window.alert('Item removed');
        }
    }

    operate(operate){
        if(this.currentInput == ''){
            return
        }
        if(this.previousInput != ''){
            this.solve()
        }
        this.operator = operate;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }

    period(period){
        if(!this.currentInput.includes('.')){
            this.currentInput += period
        }
    }

    solve(){
        let result = 0;
        let operator = this.operator;
        const previousNumber = this.previousInput;
        const currentNumber = this.currentInput;

        switch (operator){
            case "+":
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;

            case "%":
                result = parseFloat(previousNumber) % parseFloat(currentNumber);
                break;

            case "−":
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;

            case "×":
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;

            case "÷":
                result = parseFloat(previousNumber) / parseFloat(currentNumber);
                break;

            case "x²":
                result = Math.pow(parseFloat(previousNumber), 2);
                break;

            case "¹⁄×":
                result = 1 / parseFloat(previousNumber);
                break;

            case "✓":
                result = Math.sqrt(previousNumber);
                break;

            default:
                return;
        }
        if (isNaN(result)){
            result = 'Invalid Input'
        }
        this.currentInput = result;
        this.previousInput = '';
        this.operator = undefined;

    }

    updateScreen(){
        this.mainScreen.innerText = this.currentInput;
        this.saveOtherScreen = ''
        if(this.operator != null){
            if (this.operator == '✓') {
                this.saveOtherScreen = `${this.operator}${this.previousInput}`;
            }
            else if(this.operator == 'x²'){
                this.saveOtherScreen = `${this.previousInput}² `;
            }
            else if(this.operator == '¹⁄×'){
                this.saveOtherScreen = `(¹⁄${this.previousInput}) `;
            }
            else{
                this.saveOtherScreen = `${this.previousInput} ${this.operator}`;
            }
        }
        else{
            this.saveOtherScreen = `${this.previousInput}`;
        }
        this.otherScreen.innerText = this.saveOtherScreen;
    }

}

const calc = new MyCalculator(mainScreen, otherScreen, memoryScreen);

/***************** Different Operations Done In the Calculator *******************/

/**Append Number **/
number.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        calc.appendNumber(btn.innerText);
        calc.updateScreen();
    })
});

/** Clearing the Screen **/
clearAll.addEventListener('click', ()=>{
    calc.allClear();
    calc.updateScreen();
});

clear.addEventListener('click', ()=>{
    calc.clear();
    calc.updateScreen();
});

/** Deleting **/
del.addEventListener('click', ()=>{
    calc.delete();
    calc.updateScreen();
});

/** Operations **/
operators.forEach(value => {
    value.addEventListener('click', ()=>{
        calc.operate(value.innerText);
        calc.updateScreen()
    })
});

/** Adding Period **/
period.addEventListener('click', ()=>{
    calc.period(period.innerText);
    calc.updateScreen();
});

/** Compute **/
 equals.addEventListener('click', ()=>{
     calc.solve();
     calc.updateScreen();
 });

/** Change Sign **/
sign.addEventListener('click', ()=>{
    calc.changeSign();
    calc.updateScreen();
});

/** Add To Memory **/
memorySave.forEach(btn =>{
    btn.addEventListener('click', ()=> {
        calc.memorySave();
    })
});

/** View Memory **/
memoryShow.forEach(btn =>{
    btn.addEventListener('click', ()=> {
        show()
    })
});

/** Delete Last Memory **/
memoryDelete.addEventListener('click', ()=>{
    calc.memoryDelete();
});

/** Clear memory **/
memoryClear.addEventListener('click', ()=>{
    calc.memoryClear();
});

/** Show Memory **/
let showToggler = true;
function show(){
    showToggler = !showToggler;

    if (!showToggler){
        memoryScreen.style.display = 'block';
    }
    else{
        memoryScreen.style.display = 'none';
    }
}