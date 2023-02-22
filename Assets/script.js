//Questions stored as objects
var quizQuestions = [
  {
  questionText: "Which of the following is not a primitive type?", 
  answers: ["1. boolean", "2. symbol", "3. object", "4. array"],
  correct: "4. array"
  },
  {
    questionText: "What will the following operator return? 15 % 2", 
    answers: ["1. 0.3", "2. 7.5", "3. 1", "4. an error message"],
    correct: "3. 1"
  },
  {
    questionText: "Which of these is not a valid string method?", 
    answers: ["1. slice()", "2. truncate()", "3. charAt()", "4. match()"],
    correct: "2. truncate()"
  },
  {
    questionText: "Which of the following will return a random number between 0 and 100?", 
    answers: ["1. math.floor(Math.random(*100))", "2. math.floor(Math.random()*101)", "3. math.floor(Math.random()+100)", "4. math.floor(Math.random()*100)"],
    correct: "2. math.floor(Math.random()*101)"
  },
  {
    questionText: "What will the array 'var desserts = ['cake', 'ice cream', 'pie', 'profiteroles']' look like after execution of 'desserts.unshift('butter tart')'?", 
    answers: ["1. ['butter tart', 'cake', 'ice cream', 'pie', 'profiteroles']", "2. ['butter tart', 'ice cream', 'pie', 'profiteroles']", "3. ['cake', 'ice cream', 'pie', 'profiteroles', 'butter tart']", "4. ['ice cream', 'pie', 'profiteroles', 'butter tart']"],
    correct: "2. math.floor(Math.random()*101)"
  }
]

// Initialise Timer
var timerElement = document.querySelector("#timer");
var secondsRemaining = 120;
timerElement.textContent = "Time: " + secondsRemaining + " seconds 🕐";
var timerInterval;
var endReason;
var userScore;

// Start Button
var startBtn = document.querySelector("#start-btn");
// Add event listener to Start Button
startBtn.addEventListener("click", startQuiz);

// View high scores button
var scoresBtn = document.getElementById("scores-btn");
// Add event listener to Start Button
scoresBtn.addEventListener("click", function () {
  displayScores();
});

//Clear the screen below the header and display the introduction
function init() {
  document.getElementById("intro").style.display = "flex";
  document.getElementById("question-card").style.display = "none";
  document.getElementById("save-score").style.display = "none";
}

//Countdown timer
function quizTimer() {
  timerElement.textContent = "Seconds Remaining: " + secondsRemaining;  
  timerInterval = setInterval(function () {
    secondsRemaining--;
    timerElement.textContent = "Seconds Remaining: " + secondsRemaining;
    if(secondsRemaining === 0) {
      console.log("Time's Up!");
      endReason = "Time's Up!";
      endQuiz();
    }
  }, 1000);  
}

//Start the quiz
function startQuiz() {
  //Remove the introduction
  document.getElementById("intro").style.display = "none";
  //Remove the high scores (if displayed)
  document.getElementById("scores-list").style.display = "none";
  //Load the question box
  document.getElementById("question-card").style.display = "flex";
  //Initialise the timer
  timerElement.textContent = "Time Remaining: " + secondsRemaining + " seconds";
  //Start the timer counting down
  quizTimer();
  //Reset the question number and user score to 0
  var questionPosition = 0;
  userScore = 0;
  //Display the first question
  getQuestion(questionPosition);
}

//Display a question and the answer choices
function getQuestion(questionPosition) {
  console.log("This is getQuestion");
  //Question
  document.getElementById("question-text").innerHTML = quizQuestions[questionPosition].questionText;
  console.log(quizQuestions[questionPosition].questionText);
  
  //Answers
  document.getElementById("button-0").innerHTML = quizQuestions[questionPosition].answers[0];
  document.getElementById("button-0").addEventListener("click", whatWasClicked);

  document.getElementById("button-1").innerHTML = quizQuestions[questionPosition].answers[1];
  document.getElementById("button-1").addEventListener("click", whatWasClicked);

  document.getElementById("button-2").innerHTML = quizQuestions[questionPosition].answers[2];
  document.getElementById("button-2").addEventListener("click", whatWasClicked);

  document.getElementById("button-3").innerHTML = quizQuestions[questionPosition].answers[3];
  document.getElementById("button-3").addEventListener("click", whatWasClicked);

  //Get the user's answer
  function whatWasClicked(event) {
    document.getElementById("button-0").removeEventListener("click", whatWasClicked);
    document.getElementById("button-1").removeEventListener("click", whatWasClicked);
    document.getElementById("button-2").removeEventListener("click", whatWasClicked);
    document.getElementById("button-3").removeEventListener("click", whatWasClicked);
    var userChoice = event.target.textContent;
    checkAnswer (questionPosition, userChoice)
  }
}

//Compare the user's answer to the correct answer
function checkAnswer(questionPosition, userAnswer) {
  var correctAnswer = quizQuestions[questionPosition].correct;
  console.log("This is checkAnswer");
  if (userAnswer === correctAnswer) {
    //Display "correct" and increment user score
    console.log("This is rightAnswer");
    userScore++;
    document.getElementById("message-box").innerHTML = "Correct! 😃";
  } 
  else {
    //Display "incorrect" and deduct 15 seconds
    console.log("This is wrongAnswer");
    document.getElementById("message-box").innerHTML = "Incorrect! 🤬";
    secondsRemaining = secondsRemaining - 15;
  }
  clearAnswer();
  getNextQuestion(questionPosition);
}

//Clear the correct/incorrect message
function clearAnswer() {
  console.log("this is clearAnswer");
  setTimeout(function() {
    console.log("setTimeout");
    document.getElementById("message-box").innerHTML = "";
  }, 1000);
}

//Check if there is another question
function getNextQuestion(questionPosition) {
  console.log("This is getNextQuestion");
  questionPosition++;
  if (questionPosition < quizQuestions.length) {
    getQuestion(questionPosition);
  }
  else {
    endQuiz();
  }
}
  
//End the quiz
function endQuiz() {
  console.log("this is endQuiz");
  //Stop the timer
  timerElement.textContent = "Seconds Remaining: " + secondsRemaining;
  clearInterval(timerInterval);
  //Remove the question box
  document.getElementById("question-card").style.display = "none";
  //Display the user's results
  document.getElementById("save-score").style.display = "block";
  document.getElementById("score").innerHTML = userScore;
  document.getElementById("q-count").innerHTML = quizQuestions.length;
  saveScore();  
}

var scoreArray = [];

function saveScore() {
  //Retrieve and sort saved scores
  var savedScores = JSON.parse(localStorage.getItem("savedScores"));
  if (savedScores !== null) {
  scoreArray = savedScores;
  }
  var saveButton = document.querySelector("#save-btn");
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    var finalScore = {
      "initials": document.querySelector("#initials").value,  
      "score": userScore
    }
    if (finalScore.initials === "") {
      document.getElementById("message-box").innerHTML = "Initials cannot be blank";
    } 
    else {
      //Save current score in array of stored scores
      document.getElementById("save-btn").disabled = true;
      scoreArray.push(finalScore);
      localStorage.setItem("savedScores", JSON.stringify(scoreArray));
      document.getElementById("message-box").innerHTML = "Initials and score saved!";
      setTimeout(function() {
        document.getElementById("message-box").innerHTML = "";
        document.getElementById("save-score").style.display = "none";
        displayScores();
      }, 2000);
    }
  });
}

//Sort saved score data in descending order of score
function displayScores() {
  var savedScores = JSON.parse(localStorage.getItem("savedScores"));
  if (savedScores === null) {
    displayMessage("There are no saved scores to display.");
  }
  else {
    document.getElementById("scores-list").style.display = "block";
    document.getElementById("rankings").innerHTML = "";
    sortedScores = savedScores;
    sortedScores.sort((a, b) => b.score - a.score);
    for (var i = 0; i < sortedScores.length; i++) {
      var scoreListItem = document.createElement("li");
      scoreListItem.textContent = (sortedScores[i].initials) + " - " + sortedScores[i].score;
      scoreList = document.querySelector("#rankings")
      scoreList.appendChild(scoreListItem);
    }
  }
}