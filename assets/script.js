
var quizQuestions = [
  {
    question: "What is the correct syntax for declaring a variable in JavaScript?",
    options: ["var x = 5;", "variable x = 5;", "x = 5;", "int x = 5;"],
    answer: "var x = 5;"
  },
  {
    question: "Which of the following is a primitive data type in JavaScript?",
    options: ["Array", "String", "Object", "Function"],
    answer: "String"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Highly Typed Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which event is triggered when a user clicks on an HTML element?",
    options: ["onload", "onchange", "onclick", "onsubmit"],
    answer: "onclick"
  },
  {
    question: "What is the result of the following expression: 5 + '2'?",
    options: ["7", "52", "5 + 2", "Type Error"],
    answer: "52"
  }
];

var questionText = document.getElementById("question-text");
var startButton = document.getElementById("start-btn");
var mainBox = document.getElementById("main-box");
var answerButtons = document.getElementById("answer-buttons");
var timerElement = document.getElementById("timer");
var scoreName = document.getElementById("score-name");
var nextButton = document.getElementById("next-btn");
var score = 0;
var timerSeconds = 5;
var countdownInterval;

startButton.addEventListener("click", startQuiz);
answerButtons.addEventListener("click", checkAnswer);
saveScoreBtn.addEventListener("click", saveScore);

function startQuiz() {
  startButton.classList.add("hide");
  setNextQuestion();
  startTimer();
}

function setNextQuestion() {
  if (currentQuestion >= quizQuestions.length) {
    // All questions have been asked
    console.log("All questions have been asked");
    endQuiz();
    return;
  }

  var question = quizQuestions[currentQuestion];
  questionText.innerText = question.question;

  // Clear answer buttons
  answerButtons.innerHTML = "";

  // Create answer buttons dynamically
  for (var i = 0; i < question.options.length; i++) {
    var option = question.options[i];
    var answerButton = document.createElement("button");
    answerButton.innerText = option;
    answerButton.classList.add("answer-btn");
    answerButtons.appendChild(answerButton);
  }

  console.log(question);
}

function checkAnswer(event) {
  var selectedAnswer = event.target.innerText;
  var question = quizQuestions[currentQuestion];

  if (selectedAnswer === question.answer) {
    console.log("Correct!");
    score += 10;
  } else {
    console.log("Incorrect!");
    timerSeconds -= 10;
    if (timerSeconds < 0) {
      timerSeconds = 0;
    }
  }

  currentQuestion++;
  setNextQuestion();
}

function startTimer() {
  countdownInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timerSeconds > 0) {
    timerSeconds--;
    timerElement.innerText = timerSeconds;
  } else {
    clearInterval(countdownInterval);
    timerElement.innerText = "Time's up!";
    endQuiz();
  }
}

function endQuiz() {
  answerButtons.innerHTML = "";
  scoreName.classList.remove("hide");
  questionText.innerText = "Your score is " + score;
  timerElement.classList.add("hide");
  score.classList.remove("hide");
}

function saveScore() {
  var playerName = scoreName.value;
  var playerScore = score;

  localStorage.setItem("playerName", playerName);
  localStorage.setItem("playerScore", playerScore);
}

