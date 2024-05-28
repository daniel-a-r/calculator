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
        this.operandB = null;
        this.operator = null;
    },
    divide() {
        this.result = this.operandA / this.operandB;
        return this.result;
    },
    multiply() {
        this.result = this.operandA * this.operandB;
        return this.result;
    },
    subtract() {
        this.result = this.operandA - this.operandB;
        return this.result;
    },
    add() {
        this.result = this.operandA + this.operandB;
        return this.result;
    },
    calculate() {
        if (!(this.operator === null && this.operandB === null)) {
            let result;
            switch (this.operator) {
                case '/':
                    result = this.divide();
                    break;
                case '*':
                    result = this.multiply();
                    break;
                case '-':
                    result = this.subtract();
                    break;
                case '+':
                    result = this.add();
                    break;
            }
            this.nullOperandB();
            return result;
        }
    },
    display: {
        hasDecimal: false,
        numberCount: 1,
        startedTyping: false,
        calculated: false,
        text: '0',
        getText() { return this.text; },
        getHasDecimal() {
            return this.hasDecimal;
        },
        negateStartedTyping() {
            return !this.startedTyping;
        },
        resetNumberCount() {
            this.numberCount = 1;
        },
        reset() {
            this.hasDecimal = false;
            this.numberCount = 1;
        },
        format(numberString) {
            if (!numberString.includes('.')) {
                if (this.numberCount % 3 === 1) {
                    return numberString[0] + ',' + numberString.slice(1);
                }
            }
        },
        input(input) {
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
    const text = para.textContent;
    if (NUMBER_KEYS.has(key)) {
        para.textContent = calculator.display.input(key);
    }

    if (OP_KEYS.has(key)) {
        // if (key === '/' ||
        //     key === '*' ||
        //     key === '-' ||
        //     key === '+') {

        // } else {

        // }
        switch (key) {
            case '/':
            case '*':
            case '-':
            case '+':
                if (calculator.operator === null) {
                    calculator.setOperandA(Number(para.textContent));
                    calculator.setOperator(key);
                } else if (calculator.operator !== null && !calculator.display.startedTyping) {
                    calculator.setOperator(key);
                } else {
                    calculator.setOperandB(Number(para.textContent));
                    para.textContent = calculator.calculate();
                    calculator.setOperator(key);
                    calculator.display.startedTyping = false;
                }
                break;
            case '=':
            case 'Enter':
                calculator.setOperandB(Number(para.textContent))
                para.textContent = calculator.calculate();
                calculator.nullOperator();
                calculator.display.startedTyping = false;
                calculator.display.calculated = true;
                break;
        }
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', () => {
        console.log(button);
    });
});