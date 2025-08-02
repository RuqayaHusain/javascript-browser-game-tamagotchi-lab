/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let state = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
};
let timer;
let gameOver;

/*------------------------ Cached Element References ------------------------*/
const boredomStatEl = document.querySelector('#boredom-stat');
const hungerStatEl = document.querySelector('#hunger-stat');
const sleepinessStatEl = document.querySelector('#sleepiness-stat');

// const playBtnEl = document.querySelector('#play');
// const feedBtnEl = document.querySelector('#feed');
// const sleepBtnEl = document.querySelector('#sleep');

const gameMessageEl = document.querySelector('#message');

const resetBtnEl = document.querySelector('#restart');

const buttonElements = document.querySelectorAll('button');

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    resetBtnEl.classList.add('hidden');
    gameMessageEl.classList.add('hidden');
    state.boredom = 0;
    state.hunger = 0;
    state.sleepiness = 0;
    gameOver = false;
    timer = setInterval(runGame, 2000);
    render();
};

const runGame = () => {
    updateStates();
    checkGameOver();
    render();
};

const render = () => {
    boredomStatEl.textContent = state.boredom;
    hungerStatEl.textContent = state.hunger;
    sleepinessStatEl.textContent = state.sleepiness;

    if (gameOver) {
        clearInterval(timer);
        resetBtnEl.classList.remove('hidden');
        gameMessageEl.classList.remove('hidden');
    }
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const updateStates = () => {
    // set each property of state by a random number between 0 & 3
    state.boredom += getRandomInt(4);
    state.hunger += getRandomInt(4);
    state.sleepiness += getRandomInt(4);
};

const checkGameOver = () => {
    if ((state.boredom >= 10) || (state.hunger >= 10) || (state.sleepiness >= 10)) {
        gameOver = true;
    }
};

// const playBtnClick = () => {
//     state.boredom = 0;
//     render();
// };

// const feedBtnClick = () => {
//     state.hunger = 0;
//     render();
// };

// const sleepinessBtnClick = () => {
//     state.sleepiness = 0;
//     render();
// };

const handleClick = (buttonId) => {
    if (buttonId === 'play')
    {
        state.boredom = 0;
    }
    if (buttonId === 'feed')
    {
        state.hunger = 0;
    }
    if (buttonId === 'sleep')
    {
        state.sleepiness = 0;
    }
    render();
};

init();

/*----------------------------- Event Listeners -----------------------------*/
// playBtnEl.addEventListener('click', playBtnClick);
// feedBtnEl.addEventListener('click', feedBtnClick);
// sleepBtnEl.addEventListener('click', sleepinessBtnClick);

buttonElements.forEach((button) => { //DRY method for handling button clicks
    button.addEventListener('click', (event) => {
        handleClick(event.target.id);
    });
});

resetBtnEl.addEventListener('click', init);
