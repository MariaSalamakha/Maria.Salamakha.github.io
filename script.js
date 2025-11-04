const addWork = document.querySelector("#addWork");
const deductWork = document.querySelector("#deductWork");
const addWorkRest = document.querySelector("#addWorkRest");
const deductWorkRest = document.querySelector("#deductWorkRest");
const addWorkSet = document.querySelector("#addWorkSet");
const deductWorkSet = document.querySelector("#deductWorkSet");
const addPrepare = document.querySelector("#addPrepare");
const deductPrepare = document.querySelector("#deductPrepare");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");

const prepareTimer = document.querySelector("#prepareTimer");
const workTimer = document.querySelector("#workTimer");
const restTimer = document.querySelector("#restTimer");
const setTimer = document.querySelector("#setTimer");

const statusDisplay = document.querySelector("#status");
const minutesSeconds = document.querySelector("#minutesSeconds");
const showTotalTime = document.querySelector("#showTotalTime");

const roundDisplay = document.querySelector("#roundDisplay");

const ring = document.querySelector("#ring");
const bigRing = document.querySelector("#bigRing");

function getWorkTime() {
    return parseInt(workTimer.textContent);
}

function getRestTime() {
    return parseInt(restTimer.textContent);
}

function getTotalRounds() {
    return parseInt(setTimer.textContent);
}

function getPrepareTime() {
    return parseInt(prepareTimer.textContent);
}

let interval;
let prepareInterval;
let totalTimeInterval;
let isRunning = false;
let isWorking = true;
let round = 1;
let timeleft;
let prepareTimeLeft;
let showTotalTimeLeft;

let i = parseInt(workTimer.textContent);
let a = parseInt(restTimer.textContent);
let b = parseInt(setTimer.textContent);
let c = parseInt(prepareTimer.textContent);

addWork.addEventListener("click", () => {
    if (i < 59) {
        i++;
        workTimer.textContent = i;
        calculateTime();
    }
});

deductWork.addEventListener("click", () => {
    if (i > 0) {
        i--;
        workTimer.textContent = i;
        calculateTime();
    }
});

addWorkRest.addEventListener("click", () => {
    if (a < 59) {
        a++;
        restTimer.textContent = a;
        calculateTime();
    }
});

deductWorkRest.addEventListener("click", () => {
    if (a > 0) {
        a--;
        restTimer.textContent = a;
        calculateTime();
    }
});

addWorkSet.addEventListener("click", () => {
    if (b < 10) {
        b++;
        setTimer.textContent = b;
        calculateTime();
    }
});

deductWorkSet.addEventListener("click", () => {
    if (b > 0) {
        b--;
        setTimer.textContent = b;
        calculateTime();
    }
});

addPrepare.addEventListener("click", () => {
    if (c < 15) {
        c++;
        prepareTimer.textContent = c;
        calculateTime();
    }
});

deductPrepare.addEventListener("click", () => {
    if (c > 0) {
        c--;
        prepareTimer.textContent = c;
        calculateTime();
    }
});

function updateRoundDisplay() {
    roundDisplay.textContent = `Round: ${round}`;
}

function calculateTime() {
    if (timeleft >= 0) {
        let minutes = Math.floor(timeleft / 60);
        let seconds = timeleft % 60;
        minutesSeconds.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        statusDisplay.textContent = isWorking ? "Work" : "Rest";
    }
}


function displayPrepareTime() {
    if (prepareTimeLeft > 0) {
        let minutes = Math.floor(prepareTimeLeft / 60);
        let seconds = prepareTimeLeft % 60;
        minutesSeconds.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        statusDisplay.textContent = "Get Ready...";
        prepareTimeLeft--;
    } else {
        clearInterval(prepareInterval);
        ring.play(); 
        startMainInterval();
    }
}

function startMainInterval() {
    isWorking = true;
    timeleft = getWorkTime();
    calculateTime();

    interval = setInterval(() => {
        timeleft--;

        if (timeleft < 0) {
            ring.play(); 

            if (isWorking) {
                isWorking = false;
                timeleft = getRestTime();
            } else {
                isWorking = true;
                round++;
                updateRoundDisplay();

                if (round > getTotalRounds()) {
                    clearInterval(interval);
                    clearInterval(totalTimeInterval);
                    minutesSeconds.textContent = "Done!";
                    statusDisplay.textContent = " ";
                    showTotalTime.textContent = "Bravo!";
                    roundDisplay.textContent = " ";
                    bigRing.play(); 
                    isRunning = false;
                    return;
                }

                timeleft = getWorkTime();
            }
        }

        calculateTime();
    }, 1000);
}


function startTimer() {
    if (isRunning) return;
    isRunning = true;

    round = 1;
    updateRoundDisplay();
    prepareTimeLeft = getPrepareTime();

    showTotalTimeLeft = getPrepareTime() + (getWorkTime() + getRestTime()) * getTotalRounds();

    totalTimeInterval = setInterval(() => {
        if (showTotalTimeLeft > 0) {
            let minutes = Math.floor(showTotalTimeLeft / 60);
            let seconds = showTotalTimeLeft % 60;
            showTotalTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
            showTotalTime.textContent = "Bravo!";
            clearInterval(totalTimeInterval);
        }
    }, 1000);

    prepareInterval = setInterval(displayPrepareTime, 1000);
}

function stopTimer() {
    clearInterval(interval);
    clearInterval(prepareInterval);
    clearInterval(totalTimeInterval);
    isRunning = false;
    statusDisplay.textContent = "Stopped";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

calculateTime();

gsap.to ("#logo", {opacity:1, delay: .7, duration: 2, x: 2, ease: "bounce"})
gsap.to ("h1", {opacity:1, delay: 2.9, duration: 2, x: 2, ease: "bounce"})

