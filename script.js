
const LIST_EMOJI = {
    STONE: "&#9994",
    PAPER: "&#128400",
    SCISSORS: "&#9996",
    MACHINE: "&#129302",
    PLAYER: "&#128526"
}

const LIST_CHOICE = {
    STONE: 'pedra',
    PAPER: 'papel',
    SCISSORS: 'tesoura'
}

let container1 = document.querySelector(".container-1")
let container2 = document.querySelector(".container-2")
let container3 = document.querySelector(".container-3")

let button = document.querySelector(".div-button")
let boxStyleEmojiChoiceButton = document.querySelector(".box-style-emoji-choice")
let styleEmojiChoiceButton = document.querySelector(".style-emoji-choice")

let playerScoreElem = document.getElementById("you-score")
let machineScoreElem = document.getElementById("machine-score")

let boxResult = document.querySelector(".box-result")

let emojiPlayer = document.querySelector(".style-emoji-player")
let emojiMachine = document.querySelector(".style-emoji-machine")

let resultWinner = document.querySelector(".container-3-title")
let paragPoint = document.querySelector(".container-3-point")
let emojiWinner = document.querySelector(".container-3-emoji")
let nameWinner = document.querySelector(".container-3-name-winner")

const jokenpoTitle = document.getElementById("jo-ken-po")
const soundJO = new Audio("sounds/jo.mp3")
const soundKen = new Audio("sounds/ken.mp3")
const soundPo = new Audio("sounds/po.mp3")
const soundDefeat = new Audio("sounds/defeat.mp3")
const soundWin = new Audio("sounds/win.mp3")
const soundHeartBeat = new Audio("sounds/batidaCoracao.mp3")
const soundTransition = new Audio("sounds/cenaDeTransicao.mp3")

let playerScore = 0
let machineScore = 0


const playerChoice = (playerChoiceValue) => {
    buttonChoice(playerChoiceValue)

    const machine = machineChoice()
    playJokenPo(playerChoiceValue, machine)
}

const machineChoice = () => {
    const choice = [LIST_CHOICE.STONE, LIST_CHOICE.PAPER, LIST_CHOICE.SCISSORS]
    const choiceRandom = Math.floor(Math.random() * 3)

    return choice[choiceRandom]
}

const rulesGame = (playerChoice, machineChoice) => {
    if ((playerChoice === machineChoice)) {
        console.log("EMPATE") //empate
        empat()
    } else if (
        (playerChoice === LIST_CHOICE.STONE && machineChoice === LIST_CHOICE.SCISSORS) ||
        (playerChoice === LIST_CHOICE.PAPER && machineChoice === LIST_CHOICE.STONE) ||
        (playerChoice === LIST_CHOICE.SCISSORS && machineChoice === LIST_CHOICE.PAPER)
    ) {
        console.log("VITORIA")
        winner()
    } else {
        console.log("DERROTA") //defeat
        defeat()
    }
}

const empat = () => {
    playerScore++
    machineScore++
    playerScoreElem.innerHTML = playerScore
    machineScoreElem.innerHTML = machineScore
    transitionEmpat()
    resultWinner.innerHTML = "NA TRAVEEEE.."
    paragPoint.innerHTML = "Empate É 1 Ponto Para cada"
    emojiWinner.innerHTML = ""
    nameWinner.innerHTML = ""
}

const winner = () => {
    playerScore = playerScore + 2
    playerScoreElem.innerHTML = playerScore
    transitionWin()
    resultWinner.innerHTML = "ÓIA, VOCÊ GANHOU!"
    paragPoint.innerHTML = "2 Pontos Pra Conta.. he,he!!"
    emojiWinner.innerHTML = LIST_EMOJI.PLAYER
    nameWinner.innerHTML = "PLAYER WIN"
}

const defeat = () => {
    machineScore = machineScore + 2
    machineScoreElem.innerHTML = machineScore
    transitionDefeat()
    resultWinner.innerHTML = "CHORA NÃO, BÊBÊ!!"
    paragPoint.innerHTML = "Mais 2 Pontos!"
    emojiWinner.innerHTML = LIST_EMOJI.MACHINE
    nameWinner.innerHTML = "MACHINE WIN"
}

const changeEmoji = (playerChoice, machineChoice) => {

    if (playerChoice === 'pedra') {
        emojiPlayer.innerHTML = LIST_EMOJI.STONE
    } else if (playerChoice === 'papel') {
        emojiPlayer.innerHTML = LIST_EMOJI.PAPER
    } else if (playerChoice === 'tesoura') {
        emojiPlayer.innerHTML = LIST_EMOJI.SCISSORS
    }

    if (machineChoice === 'pedra') {
        emojiMachine.innerHTML = LIST_EMOJI.STONE
    } else if (machineChoice === 'papel') {
        emojiMachine.innerHTML = LIST_EMOJI.PAPER
    } else if (machineChoice === 'tesoura') {
        emojiMachine.innerHTML = LIST_EMOJI.SCISSORS
    }

    console.log(`PLAYER JOGOU "${playerChoice}" E MAQUINA JOGOU "${machineChoice}"`)
}

const colorPoint = () => {
    if (playerScore === machineScore) {
        playerScoreElem.style.color = "rgb(0, 132, 255)";
        playerScoreElem.style.transition = 10000;
        machineScoreElem.style.color = "rgb(0, 132, 255)";
    } else if (playerScore > machineScore) {
        playerScoreElem.style.color = "rgb(63, 160, 19)";
        machineScoreElem.style.color = "rgb(255, 0, 0)";
    } else if (playerScore < machineScore) {
        playerScoreElem.style.color = "rgb(255, 0, 0)";
        machineScoreElem.style.color = "rgb(63, 160, 19)";
    }
}


const playJokenPo = (playerChoiceValue, machine) => {
    setTimeout(() => {
        container1.style.display = "none"
        container2.style.display = "block"
        boxResult.style.display = "none"
        transitionWorm()
    }, 2500);

    setTimeout(() => {
        jokenpoTitle.innerHTML = "JO..."
        soundJO.play()
        rulesGame(playerChoiceValue, machine)
    }, 7000);

    setTimeout(() => {
        jokenpoTitle.innerHTML = "JO...KEN..."
        soundKen.play()
    }, 8500)

    setTimeout(() => {
        jokenpoTitle.innerHTML = "JO...KEN...PÔ!"
        changeEmoji(playerChoiceValue, machine)
        boxResult.style.display = "flex"
        soundPo.play()
    }, 10000)

    setTimeout(() => {
        container2.style.display = "none"
        container3.style.display = "flex"
    }, 13000)

    setTimeout(() => {
        soundTransition.play()
    }, 16500)

    setTimeout(() => {
        soundTransition.play()
        colorPoint()
        container3.style.display = "none"
        button.style.display = "flex"
        boxStyleEmojiChoiceButton.style.display = "none"
        container1.style.display = "flex"
    }, 17000)
}

const transitionWorm = () => {
    setTimeout(() => {
        jokenpoTitle.innerHTML = ""
    }, 0);

    setTimeout(() => {
        soundHeartBeat.play()
        jokenpoTitle.innerHTML = "   .   "
    }, 1500);

    setTimeout(() => {
        soundHeartBeat.play()
        jokenpoTitle.innerHTML = "   .   .   "
    }, 2500);

    setTimeout(() => {
        soundHeartBeat.play()
        jokenpoTitle.innerHTML = "   .   .   .   "
    }, 3500);
}

const transitionWin = () => {
    setTimeout(() => {
        soundWin.play()
    }, 6000);
}

const transitionEmpat = () => {
    setTimeout(() => {
        soundDefeat.play()
    }, 6000);
}

const transitionDefeat = () => {
    setTimeout(() => {
        soundDefeat.play()
    }, 6000);
}

const buttonChoice = (buttonClicked) => {
    button.style.display = "none"

    if (buttonClicked === 'pedra') {
        boxStyleEmojiChoiceButton.style.display = "flex"
        styleEmojiChoiceButton.innerHTML = LIST_EMOJI.STONE
    } else if (buttonClicked === 'papel') {
        boxStyleEmojiChoiceButton.style.display = "flex"
        styleEmojiChoiceButton.innerHTML = LIST_EMOJI.PAPER
    } else if (buttonClicked === 'tesoura') {
        boxStyleEmojiChoiceButton.style.display = "flex"
        styleEmojiChoiceButton.innerHTML = LIST_EMOJI.SCISSORS
    }
}
