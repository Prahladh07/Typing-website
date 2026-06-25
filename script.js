const practiceParagraphs = [
    "exploring the vastness of space requires incredible mathematical computing skills and massive rockets engineering deep technology can change humanity's baseline coordinates.",
    "never look back at errors for too long instead focus heavily on maintaining a smooth operational rhythm across each line item key strike combinations build muscle memory.",
    "cybernetic systems adapt smoothly when user input structures remain cleanly managed simple logic structures form the foundation of complicated software loops."
];

const textDisplayBox = document.getElementById("text-display-box");
const userTypingField = document.getElementById("user-typing-field");
const liveTimer = document.getElementById("live-timer");
const resetBtn = document.getElementById("reset-engine-btn");
const timeButtonsList = document.querySelectorAll(".time-btn");

const statWpm = document.getElementById("stat-wpm");
const statCpm = document.getElementById("stat-cpm");
const statAccuracy = document.getElementById("stat-accuracy");
const statPersona = document.getElementById("stat-persona");

let selectedSecondsLimit = 15; 
let remainingClockTime = 15;
let backgroundTicker = null;
let runningStateFlag = false;

let keystrokeCount = 0;
let validatedMatches = 0;

function bootTestEngine() {
    textDisplayBox.innerHTML = "";
    
    const stringSelection = practiceParagraphs[Math.floor(Math.random() * practiceParagraphs.length)];
    
    stringSelection.split("").forEach(characterItem => {
        const spanElement = document.createElement("span");
        spanElement.innerText = characterItem;
        textDisplayBox.appendChild(spanElement);
    });

    userTypingField.value = "";
    userTypingField.disabled = false;
    remainingClockTime = selectedSecondsLimit;
    liveTimer.innerText = "Remaining: " + remainingClockTime + "s";

    clearInterval(backgroundTicker);
    runningStateFlag = false;
    keystrokeCount = 0;
    validatedMatches = 0;

    statWpm.innerText = "0";
    statCpm.innerText = "0";
    statAccuracy.innerText = "0%";
    statPersona.innerText = "-";
}

timeButtonsList.forEach(button => {
    button.addEventListener("click", (e) => {
        timeButtonsList.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        
        selectedSecondsLimit = parseInt(e.target.getAttribute("data-time"));
        bootTestEngine();
    });
});

function startTickerCountdown() {
    runningStateFlag = true;
    backgroundTicker = setInterval(() => {
        if (remainingClockTime > 0) {
            remainingClockTime--;
            liveTimer.innerText = "Remaining: " + remainingClockTime + "s";
        } else {
            haltTestExecution();
        }
    }, 1000);
}

userTypingField.addEventListener("input", () => {
    if (!runningStateFlag) {
        startTickerCountdown();
    }

    const domSpans = textDisplayBox.querySelectorAll("span");
    const inputsArray = userTypingField.value.split("");

    keystrokeCount++;
    validatedMatches = 0;

    domSpans.forEach((spanNode, locatorIndex) => {
        const correspondingChar = inputsArray[locatorIndex];

        if (correspondingChar == null) {
            spanNode.classList.remove("correct", "incorrect");
        } else if (correspondingChar === spanNode.innerText) {
            spanNode.classList.add("correct");
            spanNode.classList.remove("incorrect");
            validatedMatches++;
        } else {
            spanNode.classList.add("incorrect");
            spanNode.classList.remove("correct");
        }
    });

    if (inputsArray.length >= domSpans.length) {
        haltTestExecution();
    }
});

function computeLiveAnalytics() {
    let secondsSpentTime = selectedSecondsLimit - remainingClockTime;
    if (secondsSpentTime <= 0) secondsSpentTime = 1; 

    const dynamicMinutesRatio = secondsSpentTime / 60;

    const rawCpm = Math.round(validatedMatches / dynamicMinutesRatio);
    const rawWpm = Math.round((validatedMatches / 5) / dynamicMinutesRatio);

    let precisionPercentage = 0;
    if (keystrokeCount > 0) {
        precisionPercentage = Math.round((validatedMatches / keystrokeCount) * 100);
    }

    statWpm.innerText = rawWpm;
    statCpm.innerText = rawCpm;
    statAccuracy.innerText = precisionPercentage + "%";

    if (rawWpm === 0) {
        statPersona.innerText = "-";
    } else if (rawWpm <= 35) {
        statPersona.innerText = "Tortoise 🐢";
    } else if (rawWpm > 35 && rawWpm <= 65) {
        statPersona.innerText = "Horse 🐎";
    } else {
        statPersona.innerText = "Cheetah 🐆";
    }
}

function haltTestExecution() {
    clearInterval(backgroundTicker);
    userTypingField.disabled = true;
    computeLiveAnalytics(); 
}

resetBtn.addEventListener("click", bootTestEngine);

// Run on page load
bootTestEngine();