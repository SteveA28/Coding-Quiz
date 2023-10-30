const questions = [
  {
    question: "Commonly used data types DO NOT Include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correct: 2,
  },
  {
    question: "The condition in an if/else statement is enclosed with ______.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: 1,
  },
  {
    question: "Arrays in JavaScript can be used to store ______",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: 3,
  },
  {
    question:
      "String values must be enclosed within ______ when being assinged to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: 2,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
    correct: 3,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let highScores = [];

document.getElementById("view-scores-link").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("high-scores").scrollIntoView({ behavior: "smooth" });
});

function displayQuestion() {
  if (currentQuestion < questions.length) {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const feedbackElement = document.getElementById("feedback");

    questionElement.textContent = questions[currentQuestion].question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = questions[currentQuestion].choices[i];
      choiceButton.className = "choice-button";
      choiceButton.onclick = function () {
        checkAnswer(i);
      };
      choicesElement.appendChild(choiceButton);
    }

    feedbackElement.textContent = "";
  } else {
    endQuiz();
  }
}

function checkAnswer(userChoice) {
  const correctAnswer = questions[currentQuestion].correct;
  const feedbackElement = document.getElementById("feedback");

  if (userChoice === correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong.";
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(displayQuestion, 1000);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const feedbackElement = document.getElementById("feedback");
  const timerElement = document.getElementById("timer");
  const startOverButton = document.getElementById("start-over-button");
  const clearButton = document.getElementById("clear-button"); // Add this line to get the clear button

  questionElement.textContent = "All Done!";
  choicesElement.innerHTML = "";
  feedbackElement.textContent = "Your Score: " + score + " out of " + questions.length;
  clearInterval(timerInterval);

  const playerName = prompt("Enter your name for the high scores:");
  highScores.push({ name: playerName, score });
  updateHighScores();
  document.getElementById("high-scores").style.display = "block";

  startOverButton.style.display = "block";
  clearButton.style.display = "block";
}



function startQuiz() {
  
  localStorage.clear();
  const highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";
  document.getElementById("intro").style.display = "none";

  document.getElementById("start-quiz-button").style.display = "none";

  document.getElementById("quiz").style.display = "block";

  displayQuestion();
  startTimer();
}

function startOver() {
  
  const highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";

  currentQuestion = 0;
  score = 0;
  timeLeft = 60;
  clearInterval(timerInterval);

  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  displayQuestion();  
  startTimer();

  document.getElementById("start-over-button").style.display = "none";
  document.getElementById("clear-button").style.display = "none";
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = "";
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Time Left: " + timeLeft + " seconds";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}


function updateHighScores() {
  highScores.sort((a, b) => b.score - a.score);

  const highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";

  for (let i = 0; i < highScores.length && i < 10; i++) {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = highScores[i].name + ": " + highScores[i].score;
    highScoresList.appendChild(scoreItem);
  }

  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function clearLocalStorage() {
  localStorage.clear();
  renderScore();
}

const clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearLocalStorage);

function clearLocalStorage() {
  localStorage.clear();
  updateHighScores();
}

window.addEventListener("load", function () {
  const storedHighScores = localStorage.getItem("highScores");
  if (storedHighScores) {
    highScores = JSON.parse(storedHighScores);
    updateHighScores();
  }
});

