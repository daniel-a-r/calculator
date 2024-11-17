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

const OP_KEYS = new Set(['/',
                         '*',
                         '-',
                         '+',
                         '=',
                         'Enter',]);

const BUTTON_CODES = new Set(['clear', 'sign']);

const KEY_ID_MAP = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '.': 'decimal',
    'Backspace': 'del',
    '/': 'divide',
    '*': 'times',
    '-': 'minus',
    '+': 'plus',
    '=': 'equals',
    'Enter': 'equals'
};

const calculator = {
    operandA: null,
    operandB: null,
    operator: null,
    result: null,
    reset() {
        this.operandA = null;
        this.operandB = null;
        this.operator = null;
        this.result = null;
        this.buttons.resetOpButtonColor();
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
                this.display.setText(this.result, true);
                para.textContent = this.display.getText()
                this.display.setStartedTyping(false);
                this.buttons.resetOpButtonColor();
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
                this.display.setText(this.result, true);
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
        altText: '',
        setText(text, setNumberCount=false) {
            if (setNumberCount) {
                let numCount = text.toString().length;
                if (!Number.isInteger(parseFloat(text))) {
                    numCount--;
                }
                this.numberCount = numCount;
            }
            this.text = this.format(text);
        },
        getText() { return this.text; },
        setStartedTyping(bool) { this.startedTyping = bool; },
        getStartedTyping() { return this.startedTyping; },
        format(numberString) {
            if (this.numberCount > 9) {
                return Number.parseFloat(numberString).toExponential(1);
            }
            return numberString;
        },
        inputSetting(input) {
            if (input === 'clear') {
                this.text = '0';
                this.numberCount = 1;
                this.hasDecimal = false;
                calculator.reset();
                para.textContent = this.text;
            } else {
                this.text = `${Number(this.text) * -1}`
                para.textContent = this.text;
            }
        },
        input(input) {
            if (!this.startedTyping) {
                this.text = '0';
                this.numberCount = 1;
                this.hasDecimal = false;
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
                    this.setText(this.text + input);
                    this.numberCount++;
                }
            }
        },
        inputNum(input) {
            if (this.text !== '0') {
                if (this.numberCount < 9) {
                    this.setText(this.text + input);
                    this.numberCount++;
                }
            } else {
                this.setText(input);
            }
        },
        inputDecimal(input) {
            if (!this.hasDecimal) {
                this.setText(this.text + input);
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
    },
    // TODO: add transition to non-operator buttons.
    buttons: {
        highlightedOperation: null,
        resetOpButtonColor() {
            // uses optional chaining to check if 'operation-alt' class exists and remove it if it does.
            document.querySelector('.operation-alt')?.classList.remove('operation-alt');
        },
        updateButtonColor(button) {
            const baseClass = button.classList[0];
            const altClass = `${baseClass}-alt`;
            if (button.className === 'operation' && button.id !== 'equals') {
                this.resetOpButtonColor();
                button.classList.add(altClass);
            } else if (!button.className.includes('-alt')) {
                button.classList.add(altClass);
                setTimeout(() => {
                    button.classList.remove(altClass);
                }, 100);
            }
        }
    }
};

const para = document.querySelector('p');
para.textContent = calculator.display.getText();

const body = document.querySelector('body');

body.addEventListener('dblclick', event => {
    event.preventDefault();
});

body.addEventListener('keydown', event => {
    const key = event.key
    if (NUMBER_KEYS.has(key)) {
        para.textContent = calculator.display.input(key);
    }
    if (OP_KEYS.has(key)) {
        calculator.inputOperation(key);
        if (key === '/') {
            event.preventDefault();
        }
    }
    if (KEY_ID_MAP[key] !== undefined) {
        const button = document.getElementById(KEY_ID_MAP[key]);
        // console.log(button);
        calculator.buttons.updateButtonColor(button);
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.dataset.key
        if (NUMBER_KEYS.has(key)) {
            para.textContent = calculator.display.input(key);
        }
        if (OP_KEYS.has(key)) {
            calculator.inputOperation(key);
        }
        if (BUTTON_CODES.has(key)) {
            calculator.display.inputSetting(key);
        }
        calculator.buttons.updateButtonColor(button);
    });
});