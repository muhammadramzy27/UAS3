// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Snake and game variables
let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

// Game loop
function gameLoop() {
    moveSnake();
    checkCollisions();
    draw();
    setTimeout(gameLoop, 100);
}

// Move snake
function moveSnake() {
    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Check for collisions
function checkCollisions() {
    const head = snake[0];
    // Collision with walls
    if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10) {
        resetGame();
    }
    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Generate random food
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / 10));
    const y = Math.floor(Math.random() * (canvas.height / 10));
    food = { x, y };
}

// Draw game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

// Reset game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 1, y: 0 };
    score = 0;
    document.getElementById('score').innerText = score;
}

// Control snake direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && snakeDirection.y !== 1) {
        snakeDirection = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && snakeDirection.y !== -1) {
        snakeDirection = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && snakeDirection.x !== 1) {
        snakeDirection = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && snakeDirection.x !== -1) {
        snakeDirection = { x: 1, y: 0 };
    }
});

// Start the game loop
gameLoop();
