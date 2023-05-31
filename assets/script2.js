
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
    },
    {
      question: "What is the correct syntax for a 'for' loop in JavaScript?",
      options: ["for (i = 0; i <= 5; i++)", "for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i <= 5)"],
      answer: "for (i = 0; i <= 5; i++)"
    },
    {
      question: "Which symbol is used for single-line comments in most programming languages?",
      options: ["#", "//", "/*", "<!--"],
      answer: "//"
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What is the purpose of the 'return' statement in JavaScript?",
      options: ["To restart the program execution", "To define a new function", "To exit a loop or function and return a value", "To comment out code"],
      answer: "To exit a loop or function and return a value"
    },
    {
      question: "What is the result of the following expression: 10 % 3?",
      options: ["3", "1", "0.1", "Error"],
      answer: "1"
    }
  ];
  
  
  var questionText = document.getElementById("question-text");
  var startButton = document.getElementById("start-btn");
  var mainBox = document.getElementById("main-box");
  var answerButtons = document.getElementById("answer-buttons");
  var timerElement = document.getElementById("timer");
  var scoreName = document.getElementById("score-name");
  var nextButton = document.getElementById("next-btn"); 
  var scoreValue = document.getElementById("score").innerText;
  var saveScoreBtn = document.getElementById("save-score-btn");
  var scoreSection = document.getElementById("score-section");
  var scoreboardButton = document.getElementById("scoreboard-btn");
  var visualScore = document.getElementById("visual-score");
  var rulesButton = document.getElementById("rules-btn");




  var currentQuestion = 0;
  var score = 0;
  var timerSeconds = 60;
  var countdownInterval;
  saveScoreBtn.disabled = true;
  
  startButton.addEventListener("click", startQuiz);
  answerButtons.addEventListener("click", checkAnswer);
  saveScoreBtn.addEventListener("click", saveScore);
  scoreboardButton.addEventListener("click", listTopScores);
  rulesButton.addEventListener("click", showRules);
  scoreName.addEventListener("input", function() {
    saveScoreBtn.disabled = scoreName.value.length !== 3;
  });
  nextButton.addEventListener("click", function() {
    location.reload();
  });
  
  function startQuiz() {
    startButton.classList.add("hide");
    nextButton.classList.add("hide");
    timerElement.classList.remove("hide");
    scoreboardButton.classList.add("hide");
    visualScore.classList.remove("hide");
    rulesButton.classList.add("hide");
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
        score+=10
        document.documentElement.style.background = "green";
       updateScoreDisplay();
    } else {
        console.log("Incorrect!");
        timerSeconds-=10;
        if(timerSeconds<0){
            timerSeconds=0;
        }
        document.documentElement.style.background = "red";


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
  
  
  function endQuiz(){
    answerButtons.innerHTML = "";
    scoreName.classList.remove("hide");
    questionText.innerText = "Your score is " + score;
    timerElement.classList.add("hide");
    scoreSection.classList.remove("hide");
    document.documentElement.style.background = "";

  }

function saveScore(){
    var playerName = scoreName.value;
    var playerScore = score;

    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ name: playerName, score: playerScore });
  
    localStorage.setItem("scores", JSON.stringify(scores));
    listTopScores();

    nextButton.classList.remove("hide");

}

function listTopScores() {
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function(a, b) {
      return b.score - a.score;
    });
    
    var topScores = scores.slice(0, 10);
    
    var scoreListHTML = "";
    
    for (var i = 0; i < topScores.length; i++) {
      scoreListHTML += topScores[i].name + ": " + topScores[i].score + "<br>";
    }
    
    questionText.innerHTML = "Top Scores:<br>" + scoreListHTML;

    scoreSection.classList.add("hide");
    scoreboardButton.classList.add("hide");
    nextButton.classList.remove("hide");
    startButton.classList.add("hide");

  }
  
  
  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }
  

  // Update the score display
function updateScoreDisplay() {
  var scoreDisplay = document.getElementById("score-value");
  scoreDisplay.textContent = score;
}

function showRules(){
  startButton.classList.add("hide");
  rulesButton.classList.add("hide");
  nextButton.classList.remove("hide");
  questionText.innerText = "You will have 60 seconds to answer as many questions as you can. When you guess correctly the screen will turn green and you will earn 10 points. When you guess a question incorrectly the screen will turn red and you will lose 10 seconds. Good luck!";
}

