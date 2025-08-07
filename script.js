let timerElement = document.getElementById("timer");
let quoteDisplayElement = document.getElementById("quoteDisplay");
let quoteInputElement = document.getElementById("quoteInput");
let resultElement = document.getElementById("result");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");

let timer = 0;
let intervalId;

function startTimer() {
    timer = 0;
    timerElement.textContent = timer;
    intervalId = setInterval(() => {
        timer += 1;
        timerElement.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function fetchQuote() {
    spinner.classList.remove("d-none");
    quoteDisplayElement.textContent = "";
    fetch("https://apis.ccbp.in/random-quote")
        .then(response => response.json())
        .then(data => {
            spinner.classList.add("d-none");
            quoteDisplayElement.textContent = data.content;
            startTimer();
        });
}

submitBtn.onclick = function() {
    let userInput = quoteInputElement.value.trim();
    let actualQuote = quoteDisplayElement.textContent.trim();
    if (userInput === actualQuote) {
        stopTimer();
        resultElement.textContent = `You typed in ${timer} seconds 🎉`;
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Text doesn't match. Please try again.";
        resultElement.style.color = "red";
    }
};

resetBtn.onclick = function() {
    stopTimer();
    quoteInputElement.value = "";
    resultElement.textContent = "";
    timerElement.textContent = "0";
    fetchQuote();
};

window.onload = fetchQuote;
