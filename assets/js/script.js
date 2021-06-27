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
let final_score_section;
let no_time;
let page_content_section;


//questions for quiz 
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
    //final_score_section.setAttribute("class", "hide")
    console.log(page_content_section);
    if(page_content_section){
        page_content_section.remove();
    }

    if(no_time){
        no_time.remove();
    }

   // common_quiz_section.removeChild();
    
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
    finalScore = totalTime;
    
if (totalTime === 0 || finalScore<=0){
    quiz_section.innerHTML = "";
    choices_section.innerHTML = "";
    no_time = document.getElementById("noTime");
    const timeOut = document.createElement("p");
    timeOut.innerHTML = "Sorry! Time out!";
    no_time.appendChild(timeOut);
    finalScore = 0;
    const startAgain = document.createElement("button");
    startAgain.innerHTML = "Start Quiz"
    no_time.appendChild(startAgain);
    
     startAgain.addEventListener("click", () => {
         totalTime = 75;
         index = 0;
        console.log("what")
         startQuiz();
     });
   


}else{
    finalScore = totalTime;
    final_score_section = document.getElementById("finalScore");
    final_score_section.innerHTML = `<p>All done!</p><br><p>Your final score is ${finalScore}</p>
                                    <p>Enter initials:</p> <input/> <button id="submit">Submit</button>`;
    final_score_section.style.display = "block"

    
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
            //final_score_section.remove(); 
            final_score_section.style.display = "none";
            displayScores();
        }
    })   
    
}
 
}

function displayScores () { 
    let highScores = document.createElement("section");
    highScores.id = "page-content";
    document.body.append(highScores);
    page_content_section = document.getElementById("page-content");
    let scoresHeader = document.createElement("h2");
    scoresHeader.textContent = "High Scores";
    highScores.append(scoresHeader);
    // create list to display high scores
    let scoresList = document.createElement("ol");
    scoresList.id = "scoresList";
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
    restartButtonEl.textContent = "Start Quiz"
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
        totalTime = 75;
        index = 0;
    
        startQuiz();
    });
}


