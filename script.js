const KEY_CODES = {
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    96: 0,
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    110: '.',
    190: '.',
    191: '/',
    173: '-',
    61: '=',
    111: '/',
    106: '*',
    109: '-',
    107: '+',
    13: '=',
    8: 'del'
}

const KEY_SHIFT_CODES = {
    56: '*',
    61: '+',
}

const body = document.querySelector('body');
body.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        console.log(event);
    } else {
        console.log(event);
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button, key) => {
    console.log(button);
    button.addEventListener('click', () => {
        console.log(button);
    })
})

// const equal = document.querySelector('#equals');
// console.log(equal.dataset);