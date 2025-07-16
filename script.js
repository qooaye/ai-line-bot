class WhackAMoleGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.gameTimer = null;
        this.moleTimer = null;
        this.currentMole = null;
        
        this.scoreElement = document.getElementById('score');
        this.timeElement = document.getElementById('time');
        this.startButton = document.getElementById('start-button');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-button');
        this.holes = document.querySelectorAll('.hole');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.restartGame());
        
        this.holes.forEach(hole => {
            hole.addEventListener('click', (e) => this.whackMole(e));
        });
    }
    
    startGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = true;
        this.updateDisplay();
        this.startButton.style.display = 'none';
        this.gameOverElement.classList.add('hidden');
        
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        this.spawnMole();
    }
    
    spawnMole() {
        if (!this.gameActive) return;
        
        this.hideMole();
        
        const randomTime = Math.random() * 2000 + 500;
        
        this.moleTimer = setTimeout(() => {
            if (!this.gameActive) return;
            
            const randomHole = Math.floor(Math.random() * this.holes.length);
            this.currentMole = this.holes[randomHole];
            this.currentMole.classList.add('up');
            
            setTimeout(() => {
                this.hideMole();
                this.spawnMole();
            }, Math.random() * 1500 + 800);
        }, randomTime);
    }
    
    hideMole() {
        this.holes.forEach(hole => {
            hole.classList.remove('up');
        });
        this.currentMole = null;
    }
    
    whackMole(e) {
        if (!this.gameActive) return;
        
        const hole = e.currentTarget;
        if (hole.classList.contains('up')) {
            this.score++;
            this.updateDisplay();
            hole.classList.remove('up');
            this.currentMole = null;
            
            this.showHitEffect(hole);
        }
    }
    
    showHitEffect(hole) {
        hole.style.transform = 'scale(1.1)';
        hole.style.background = '#FFD700';
        
        setTimeout(() => {
            hole.style.transform = 'scale(1)';
            hole.style.background = '#654321';
        }, 150);
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timeElement.textContent = this.timeLeft;
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        clearTimeout(this.moleTimer);
        this.hideMole();
        
        this.finalScoreElement.textContent = this.score;
        this.gameOverElement.classList.remove('hidden');
        this.startButton.style.display = 'inline-block';
    }
    
    restartGame() {
        this.gameOverElement.classList.add('hidden');
        this.startGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WhackAMoleGame();
});