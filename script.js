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
                      'Backspace'])

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
                             'Backspace'])

const OP_KEYS = new Set(['/',
                         '*',
                         '-',
                         '+',
                         '=',
                         'Enter',])

const calculator = {
    operandA: null,
    operandB: null,
    operator: null,
    operandATyping: true,
    operandBTyping: false,
    startedTyping: false,
    setOperandA(num) {
        this.operandA = num;
    },
    setOperandB(num) {
        this.operandB = num;
    },
    setOperator(op) {
        this.operator = op;
    },
    reset() {
        this.operandB = null;
        this.operator = null;
        this.hasDecimal = false;
        this.startedTyping = false;
    },
    divide() {
        this.operandA = this.operandA / this.operandB;
        return this.operandA;
    },
    multiply() {
        this.operandA = this.operandA * this.operandB;
        return this.operandA;
    },
    subtract() {
        this.operandA = this.operandA - this.operandB;
        return this.operandA;
    },
    add() {
        this.operandA = this.operandA + this.operandB;
        return this.operandA;
    },
    calculate() {
        if (!(this.operator === null && this.operandB === null)) {
            switch (this.operator) {
                case '/':
                    return this.divide();
                case '*':
                    return this.multiply();
                case '-':
                    return this.subtract();
                case '+':
                    return this.add();
            }
            this.reset();
        }
    }
}

const display = {
    hasDecimal: false,
    numberCount: 1,
}

const para = document.querySelector('p');
console.log(para.textContent);

const body = document.querySelector('body');
body.addEventListener('keydown', event => {
    const key = event.key
    const text = para.textContent;
    if (NUMBER_KEYS.has(key)) {
        if (!calculator.startedTyping && 
            calculator.operandB === null && 
            calculator.operator !== null) {
            if (key !== 'Backspace') {
                if (key === '.') {
                    para.textContent = '0.';
                } else {
                    para.textContent = key;
                }
                calculator.startedTyping = true;
            }
        } else if (key === 'Backspace') {
            if (text.length === 1) {
                if (text !== '0') {
                    para.textContent = '0';
                }
            } else {
                display.numberCount--;
                para.textContent = text.slice(0, -1);
            }
        } else if (key === '.') {
            if (!display.hasDecimal) {
                display.hasDecimal = true;
                para.textContent = text + key;
            }
        } else if (display.numberCount < 9) {
            if (text === '0') {
                para.textContent = key;
            } else {
                display.numberCount++;
                para.textContent = text + key;
            }
        }
    }
    if (OP_KEYS.has(key)) {
        switch (key) {
            case '/':
            case '*':
            case '-':
            case '+':
                calculator.setOperandA(Number(para.textContent));
                calculator.setOperator(key);
                break;
            case '=':
            case 'Enter':
                calculator.setOperandB(Number(para.textContent))
                para.textContent = calculator.calculate();
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
})