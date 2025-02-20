const word = document.getElementById('word');
const text = document.getElementById('text');
const tscore = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgame = document.getElementById('end-game');
const button = document.getElementById('setting-btn');
const f = document.getElementById('setting-form');
const select = document.getElementById('difficulty');
const nav = document.getElementById('nav');

const words = [
    "apple", "breeze", "chocolate", "dolphin", "elephant",
    "forest", "galaxy", "harmony", "island", "jungle", "hello",
    "lighthouse", "moonlight", "nebula", "ocean", "puzzle",
    "quartz", "rainbow", "sunflower", "treasure", "umbrella",
    "volcano", "whisper", "sulphur", "yacht", "table"
];

let randomWord;
let score = 0;
let time = 10;

// Get saved difficulty or default to medium
let difficulty = localStorage.getItem('difficulty') || 'medium';
select.value = difficulty;

let interval;

// Focus on text input
text.focus();

// Generate a random word from the list
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Update time every second
function updateTime() {
    time--;
    timeElement.innerHTML = `${time}s`;

    if (time === 0) {
        clearInterval(interval);
        gameOver();
    }
}

// End game function
function gameOver() {
    endgame.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your Final Score: ${score}</p>
        <button onclick="location.reload()">Restart</button>
    `;
    endgame.style.display = "flex";
}

// Add word to DOM
function addToDom() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Increase score
function updateScore() {
    score++;
    tscore.innerHTML = score;
}

// Start game
function startGame() {
    clearInterval(interval);
    time = 10;
    timeElement.innerHTML = `${time}s`;
    interval = setInterval(updateTime, 1000);
    addToDom();
}

// Handle typing input
text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addToDom();
        updateScore();
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

// Toggle difficulty menu
button.addEventListener('click', () => {
    nav.classList.toggle('hide');
});

// Handle difficulty change
f.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    startGame();
});

// Start the game initially
startGame();
