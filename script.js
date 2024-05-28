const BUTTON_CODES = {
    0: 'ac',
    1: 'sign',
}

const KEYS = new Set(['0',
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '.',
                      '/',
                      '*',
                      '-',
                      '+',
                      '=',
                      'Enter',
                      'Backspace']);

const NUMBER_KEYS = new Set(['0',
                             '1',
                             '2',
                             '3',
                             '4',
                             '5',
                             '6',
                             '7',
                             '8',
                             '9',
                             '.',
                             'Backspace']);

const NUM_KEYS = new Set(['0',
                             '1',
                             '2',
                             '3',
                             '4',
                             '5',
                             '6',
                             '7',
                             '8',
                             '9',]);

const OP_KEYS = new Set(['/',
                         '*',
                         '-',
                         '+',
                         '=',
                         'Enter',]);

const calculator = {
    operandA: null,
    operandB: null,
    operator: null,
    result: null,
    setOperandA(num) {
        this.operandA = num;
    },
    setOperandB(num) {
        this.operandB = num;
    },
    setOperator(op) {
        this.operator = op;
    },
    setResult(num) {
        this.result = num;
    },
    nullOperator() {
        this.operator = null;
    },
    nullOperandA() {
        this.operandA = null;
    },
    nullOperandB() {
        this.operandB = null;
    },
    nullResult() {
        this.result = null;
    },
    reset() {
        this.operandA = null;
        this.operandB = null;
        this.operator = null;
        this.result = null;
    },
    divide() {
        this.result = this.operandA / this.operandB;
    },
    multiply() {
        this.result = this.operandA * this.operandB;
    },
    subtract() {
        this.result = this.operandA - this.operandB;
    },
    add() {
        this.result = this.operandA + this.operandB;
    },
    calculate() {
        if (!(this.operator === null && this.operandB === null)) {
            switch (this.operator) {
                case '/':
                    this.divide();
                    break;
                case '*':
                    this.multiply();
                    break;
                case '-':
                    this.subtract();
                    break;
                case '+':
                    this.add();
                    break;
            }
        }
    },
    inputOperation(op) {
        if (op === '=' || op === 'Enter') {
            if (this.operandA !== null && this.display.getStartedTyping()) {
                this.operandB = Number(this.display.getText());
                this.calculate();
                this.display.setText(this.result);
                para.textContent = this.display.getText()
                this.display.setStartedTyping(false);
            }
        } else {
            if (this.result !== null && !this.display.getStartedTyping()) {
                this.operandA = this.result;
                this.operator = op;
                this.operandB = null;
                this.result = null;
                this.display.setStartedTyping(false);
            } else if (this.operator !== null && this.display.getStartedTyping()) {
                this.operandB = Number(this.display.getText());
                this.calculate();
                this.display.setText(this.result);
                para.textContent = this.display.getText()
                this.operandA = this.result;
                this.operator = op;
                this.operandB = null;
                this.result = null;
                this.display.setStartedTyping(false);
            } else if (this.operator === null) {
                this.operandA = Number(this.display.getText());
                this.operator = op;
                this.display.setStartedTyping(false);
            } else if (!this.display.getStartedTyping()) {
                this.operator = op;
            }
        }
    },
    display: {
        hasDecimal: false,
        numberCount: 1,
        startedTyping: false,
        calculated: false,
        text: '0',
        setText(text) { this.text = text; },
        getText() { return this.text; },
        getHasDecimal() { return this.hasDecimal; },
        setStartedTyping(bool) { this.startedTyping = bool; },
        getStartedTyping() { return this.startedTyping; },
        negateStartedTyping() { return !this.startedTyping; },
        resetNumberCount() { this.numberCount = 1; },
        // reset() {
        //     this.hasDecimal = false;
        //     this.numberCount = 1;
        // },
        format(numberString) {
            if (!numberString.includes('.')) {
                if (this.numberCount % 3 === 1) {
                    return numberString[0] + ',' + numberString.slice(1);
                }
            }
        },
        input(input) {
            if (!this.startedTyping) {
                this.text = '0';
                this.numberCount = 1;
                this.startedTyping = true;
            }
            if (calculator.result !== null) {
                calculator.reset();
            }
            switch (input) {
                case '0':
                    this.inputZero(input);
                    break;
                case '.':
                    this.inputDecimal(input);
                    break;
                case 'Backspace':
                    this.inputBackspace();
                    break;
                default:
                    this.inputNum(input);
            }
            return this.text;
        },
        inputZero(input) {
            if (this.text !== '0') {
                if (this.numberCount < 9) {
                    this.text = this.text + input;
                    this.numberCount++;
                }
            }
        },
        inputNum(input) {
            if (this.text !== '0') {
                if (this.numberCount < 9) {
                    this.text = this.text + input;
                    this.numberCount++;
                }
            } else {
                this.text = input;
            }
        },
        inputDecimal(input) {
            if (!this.hasDecimal) {
                this.text = this.text + input;
                this.hasDecimal = true;
            }
        },
        inputBackspace() {
            if (this.text.at(-1) === '.') {
                this.text = this.text.slice(0, -1);
                this.hasDecimal = false;
            } else if (this.numberCount > 1) {
                this.text = this.text.slice(0, -1);
                this.numberCount--;
            } else if (this.numberCount === 1 && this.text !== '0') {
                this.text = '0'
            }
        }
    }
}

const para = document.querySelector('p');
para.textContent = calculator.display.getText();
console.log(para.textContent);

const body = document.querySelector('body');
body.addEventListener('keydown', event => {
    const key = event.key
    if (NUMBER_KEYS.has(key)) {
        para.textContent = calculator.display.input(key);
    }
    if (OP_KEYS.has(key)) {
        calculator.inputOperation(key);
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', () => {
        console.log(button);
    });
});