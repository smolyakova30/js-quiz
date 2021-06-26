// variables
let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout; 
let index = 0;
let finalScore = 0;
let scoresArr = [];

const start_button = document.getElementById("start-button");
const time_remaining = document.getElementById("time-remaining");
const quiz_section = document.getElementById("quiz-questions");
const choices_section = document.getElementById("quiz-choices");
const main_section = document.getElementById("intro");
const correct_wrong = document.getElementById("correctWrong");
const common_quiz_section = document.getElementById("main-quiz");
const final_score_section = document.getElementById("finalScore");


//questions for quiz
class Question {
    constructor(question, choices, indexOfCorrectChoice) {
      this.question = question;
      this.choices = choices;
      this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
  }
const question_list = [
{
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
},

{
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    correctAnswer: "Parentheses",
},

{
    question: "Arrays in JavaScript can be used to store ____.",
    choices: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],
    correctAnswer: "All of the above",
},

{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    correctAnswer: "Quotes",
},

{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
    correctAnswer: "console.log",
},
];



// event listeners 
start_button.addEventListener('click', startQuiz);

//start game function
 function startQuiz(){
   displayTime();
   startTimer(); 
   displayQuestion(index); 
 }


 // Timer 
 function displayTime() {
    time_remaining.textContent = totalTime;
  }

  function startTimer() {
    main_section.setAttribute("id", "hide")
    totalTimeInterval = setInterval(function() {
      totalTime--;
      displayTime();
      checkTime();
  
    }, 1000);
  }

 function checkTime(){
     if (totalTime <=0){
         totalTime = 0;
         endGame();
     }
 }

// function for questions
// to display question
function displayQuestion(){
    quiz_section.textContent = question_list[index].question;
    var currentQuestion = question_list[index]
    choices_section.innerHTML="";
    console.log(currentQuestion);
    currentQuestion.choices.forEach(function(choice, i){
        var answerButton = document.createElement("button")
        answerButton.onclick = isChoiceCorrect
        answerButton.textContent = choice
        answerButton.setAttribute("value", choice)
        choices_section.appendChild(answerButton)
    }
    ) 
};


  //right answer
  function isChoiceCorrect(event) {
      let answeredCorrectly = event.target.innerHTML === question_list[index].correctAnswer;
    if ( answeredCorrectly !== true) {
        totalTime-=10;
    }
    
    index++;

    if (question_list.length===index){
        endGame();
        console.log("end game")
    }else{
        console.log("else statement")
        displayQuestion();
        correctWrong(answeredCorrectly);
    }   
  };

  function correctWrong (isCorrect){
    const correctAlert = document.createElement("p");
    correctAlert.innerHTML = isCorrect ? 'Correct!' : 'Wrong!'
    correct_wrong.innerHTML = "";
    correct_wrong.appendChild(correctAlert);
    setTimeout(function(){ correct_wrong.innerHTML = ""; }, 1000);
  };


//end game function
function endGame() {
    clearInterval(totalTimeInterval);
    quiz_section.innerHTML = "";
    choices_section.innerHTML = "";
    

if (totalTime === 0){
    const timeOut = document.createElement("p");
    timeOut.innerHTML = "Sorry! time out!";
    common_quiz_section.appendChild(timeOut);
     finalScore = 0;

}else{
    finalScore = totalTime;
    final_score_section.innerHTML = `<p>All done!</p><br><p>Your final score is ${finalScore}</p>
                                    <p>Enter initials:</p> <input/> <button id="submit">Submit</button>`;

    
    let button = document.querySelector("#submit")
     button.addEventListener("click", function(event){
        let playerInitials = event.target.parentElement.children[4].value;
        console.log(playerInitials);
        if (playerInitials === "") {
            alert("Initials cannot be blank!");
        } else {
            // save initials and score to localStorage, then remove content from screen and display high scores
            let obj = {
                player: playerInitials,
                score: finalScore
            }
            if(localStorage.getItem("scoreTable")){
                scoresArr = JSON.parse(localStorage.getItem("scoreTable"))
            }
            scoresArr.push(obj)
            localStorage.setItem("scoreTable", JSON.stringify(scoresArr))
            localStorage.setItem("playerInitials", playerInitials);
            localStorage.setItem("score", finalScore);
            final_score_section.remove(); 
            displayScores();
        }
    })   
    
}
    document.getElementById("timer").remove(); 
}


function displayScores () {
    let highScores = document.createElement("section");
    highScores.id = "page-content"
    document.body.append(highScores);
    
    let scoresHeader = document.createElement("h2");
    scoresHeader.textContent = "High Scores"
    highScores.append(scoresHeader);
    // create list to display high scores
    let scoresList = document.createElement("ol")
    scoresList.id = "scoresList"
    highScores.append(scoresList);
    let addScores = function () {
        let scoreScrnObj = JSON.parse(localStorage.getItem("scoreTable"))
        scoreScrnObj.sort((a, b) => b.score - a.score);
        for (i = 0; i < 3; i++) {
            let scoreItem = document.createElement("li");
            if (scoreScrnObj[i]){
                scoreItem.textContent = (scoreScrnObj[i].player + " " + scoreScrnObj[i].score);
            } else {
                scoreItem.textContent = ""
            }
            scoresList.append(scoreItem);
        }
    }
    addScores();
    // prompt user to take quiz again
    let buttonsDiv = document.createElement("div")
    buttonsDiv.className = "button-container"
    highScores.append(buttonsDiv);
    let restartButtonEl = document.createElement("button")
    restartButtonEl.textContent = "Start the Quiz!"
    restartButtonEl.id = "restart-btn"
    buttonsDiv.append(restartButtonEl);
    let clearScoresEl = document.createElement("button")
    clearScoresEl.textContent = "Clear High Scores"
    clearScoresEl.id = "clear-scores-btn"
    buttonsDiv.append(clearScoresEl);
    // function to clear high scores
    clearScoresEl.addEventListener("click", () => {
        localStorage.clear();
        scoresList.remove();
        clearScoresEl.remove();
    });
    // function to click start button and initiate quiz and timer
    restartButtonEl.addEventListener("click", () => {
        let timerCreate = document.createElement("h2");
        timerCreate.id = "timer"
        timer = 75;
        header.append(timerCreate);
        startQuiz();
    });
}


