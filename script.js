const lightBlue = document.getElementById('lightBlue');
const red = document.getElementById('red');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnEmpezar = document.getElementById('btnEmpezar');
const currentScore = document.getElementById('currentScore');
const bestScore = document.getElementById('bestScore');
const LAST_LEVEL = 10

class Game {
    constructor() {
        this.setMaxScore()
        this.initialize = this.initialize.bind(this)

    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
        this.chooseColor = this.chooseColor.bind(this)
        this.toggleBtnStart()
        this.level = 1
        this.colors = {
            lightBlue,
            red,
            orange,
            green
        }
        this.setScore();
    }

    setScore() {
        currentScore.innerHTML = '';
        currentScore.innerHTML = `
        <h2>Score: ${this.level - 1}</h2>
        `
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        }
        else btnStart.classList.add('hide')
    }
    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    transformNumberToColor(num) {
        switch (num) {
            case 0:
                return 'lightBlue';
            case 1:
                return 'red';
            case 2:
                return 'orange';
            case 3:
                return 'green';
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'lightBlue':
                return 0
            case 'red':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }

    nextLevel() {
        this.subLevel = 0
        this.illuminateSequence()
        this.addClickEvents()
        this.setScore()
    }

    saveScore() {
        let maxScore = localStorage.getItem('maxScore');
        if (maxScore === null) {
            localStorage.setItem('maxScore', JSON.stringify(this.level - 1));
            this.setMaxScore();
        } else if ((this.level - 1) > maxScore) {
            localStorage.setItem('maxScore', JSON.stringify(this.level - 1));
            this.setMaxScore()
        }
    }

    setMaxScore() {
        bestScore.innerHTML = `
        <h2>Best score: ${JSON.parse(localStorage.getItem('maxScore'))}</h2>
        `
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.toTurnOff(color), 350)
    }

    toTurnOff(color) {
        this.colors[color].classList.remove('light')
    }

    addClickEvents() {
        this.colors.lightBlue.addEventListener('click', this.chooseColor)
        this.colors.red.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
    }

    removeClickEvents() {
        this.colors.lightBlue.removeEventListener('click', this.chooseColor)
        this.colors.red.removeEventListener('click', this.chooseColor)
        this.colors.orange.removeEventListener('click', this.chooseColor)
        this.colors.green.removeEventListener('click', this.chooseColor)
    }


    chooseColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        this.illuminateColor(colorName)
        if (colorNumber === this.sequence[this.subLevel]) {
            this.subLevel++
            if (this.subLevel === this.level) {
                this.level++
                this.removeClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.wonTheGame()
                }
                else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.lostTheGame()
        }
    }

    wonTheGame() {
        swal('CONGRATULATIONS!', 'YOU WON', 'success')
            .then(this.initialize())
    }

    lostTheGame() {
        swal('SORRY :(', 'YOU LOST', 'error')
            .then(() => {
                this.removeClickEvents()
                this.saveScore()
                this.initialize()
            })
    }

}

function startGame() {
    window.game.initialize();
}

function setWindow() {
    window.game = new Game()
}

setWindow();