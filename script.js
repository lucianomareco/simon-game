const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnEmpezar = document.getElementById('btnEmpezar')
const LAST_LEVEL = 10

class Game {
    constructor() {
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        btnStart.classList.add('hide')
        this.level = 1
        this.colors = {
            lightBlue,
            violet,
            orange,
            green
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    transformNumberToColor(num) {
        switch (num) {
            case 0:
                return 'lightBlue';
            case 1:
                return 'violet';
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
            case 'violet':
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
    }

    illuminateColor(color) {
        debugger
        this.colors[color].classList.add('light')
        setTimeout(() => this.toTurnOff(color), 350)
    }

    toTurnOff(color) {
        this.colors[color].classList.remove('light')
    }

    addClickEvents() {
        this.colors.lightBlue.addEventListener('click', this.chooseColor)
        this.colors.violet.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
    }

    removeClickEvents() {
        this.colors.lightBlue.removeEventListener('click', this.chooseColor)
        this.colors.violet.removeEventListener('click', this.chooseColor)
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
                if (this.level === (LAST_LEVEL + 1)) { }
                //gano
                else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            //perdio
        }
    }
}

function startGame() {
    window.game = new Game()
}