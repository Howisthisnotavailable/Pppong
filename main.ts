function detectShadowStretch () {
    if (Score == 10 || (Score == 39 || Score == 79)) {
        ballShadowLength += 1
        ballShadowX.push(x)
        ballShadowY.push(y)
    }
}
function ballMovement () {
    if (ballDir == 1) {
        x += -1
        y += -1
    }
    if (ballDir == 2) {
        x += 1
        y += -1
    }
    if (ballDir == 3) {
        x += 1
        y += 1
    }
    if (ballDir == 4) {
        x += -1
        y += 1
    }
}
function createBallShadowonXY () {
    ballShadowX.push(x)
    ballShadowY.push(y)
    led.plotBrightness(ballShadowX[ballShadowLength], ballShadowY[ballShadowLength], 120)
    led.unplot(ballShadowX[0], ballShadowY[0])
    ballShadowX.shift()
    ballShadowY.shift()
    ballShadowCounter = 240
    ballShadowIdentifier = ballShadowLength
    for (let index = 0; index < ballShadowLength; index++) {
        ballShadowCounter = Math.round(ballShadowCounter * (2 / 3))
        led.plotBrightness(ballShadowX[ballShadowIdentifier - 1], ballShadowY[ballShadowIdentifier - 1], ballShadowCounter)
        ballShadowIdentifier += -1
    }
}
function detectTimerception () {
    if (timerception >= 3) {
        ballSpeed += randint(1, 2)
        timerception = 0
    }
}
function horizontalBounce () {
    if (ballDir == 1 || ballDir == 3) {
        ballDir += -1
    } else {
        if (ballDir == 2 || ballDir == 4) {
            ballDir += 1
        }
    }
    detectOverflow()
}
function ultiMovement () {
    detectDefeat()
    if (x == 1 && y == playerBoardY || x == 3 && y == opposeBoardY) {
        verticalBounce()
        detectShadowStretch()
        newTurn()
    }
    led.unplot(x, y)
    createBallShadowonXY()
    ballMovement()
    led.plot(x, y)
    if (y == 0 || y > 3) {
        horizontalBounce()
    }
    detectTimerception()
}
input.onButtonPressed(Button.A, function () {
    if (turnState == 1) {
        led.unplot(4, opposeBoardY)
        opposeBoardY += -1
        detectOpposeRollback()
    } else {
        led.unplot(0, playerBoardY)
        playerBoardY += 1
        detectPlayerRollback()
    }
})
function newTurn () {
    if (turnState == 0) {
        turnState = 1
    } else {
        turnState = 0
    }
}
function detectOpposeRollback () {
    if (opposeBoardY > 4) {
        opposeBoardY = 0
    }
    if (opposeBoardY < 0) {
        opposeBoardY = 4
    }
}
function detectDefeat () {
    if (x < 0 || x > 4) {
        music.playMelody("C5 A F - A F E - ", 240)
        music.playMelody("C5 A F - A F E - ", 240)
        music.playMelody("C C C - - - - - ", 480)
        while (true) {
            basic.showString("" + (Score))
        }
    }
}
function detectOverflow () {
    if (ballDir > 4) {
        ballDir = 1
    }
    if (ballDir < 1) {
        ballDir = 4
    }
}
function detectPlayerRollback () {
    if (playerBoardY > 4) {
        playerBoardY = 0
    }
    if (playerBoardY < 0) {
        playerBoardY = 4
    }
}
function verticalBounce () {
    if (ballDir == 1 || ballDir == 3) {
        ballDir += 1
    } else {
        if (ballDir == 2 || ballDir == 4) {
            ballDir += -1
        }
    }
    detectOverflow()
    Score += 1
    timerception += 1
    toneCurrent += randint(21, 25) * (3 / Score)
    music.playTone(toneCurrent, music.beat(BeatFraction.Eighth))
}
let ballShadowCounter = 0
let ballShadowIdentifier = 0
let ballShadowLength = 0
let ballShadowY: number[] = []
let ballShadowX: number[] = []
let toneCurrent = 0
let timerception = 0
let Score = 0
let opposeBoardY = 0
let playerBoardY = 0
let turnState = 0
let ballDir = 0
let y = 0
let x = 0
basic.clearScreen()
led.plot(4, 2)
led.plot(0, 2)
x = randint(1, 2)
y = randint(1, 3)
ballDir = 2
turnState = 1
let timer = 0
playerBoardY = 2
opposeBoardY = 2
Score = 0
timerception = 0
toneCurrent = 258
let ballSpeed = 10
ballShadowX = []
ballShadowY = []
ballShadowLength = 0
ballShadowIdentifier = 0
led.plot(x, y)
basic.pause(2000)
basic.forever(function () {
    timer += ballSpeed
    if (timer >= 500) {
        ultiMovement()
        timer = 0
    }
    led.plot(0, playerBoardY)
    led.plot(4, opposeBoardY)
})
