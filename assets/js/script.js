// variables
let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout; 
let index = 0;
let correctChoices = 0;

const start_button = document.getElementById("start-button");
const time_remaining = document.getElementById("time-remaining");
const quiz_section = document.getElementById("quiz-questions");
const choices_section = document.getElementById("quiz-choices");
const main_section = document.getElementById("intro");
const correct_wrong = document.getElementById("correctWrong")


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
    if ( answeredCorrectly) {
        totalTime-=10;
    }else{
        correctChoices++;
    }
        index++;
    if (question_list.length===index){
        endGame();
    }else{
        displayQuestion();
        correctWrong(answeredCorrectly);
    }   
  };

  function correctWrong (isCorrect){
    const correctAlert = document.createElement("p");
    correctAlert.innerHTML = isCorrect ? 'Correct!' : 'Wrong!'
    correct_wrong.appendChild(correctAlert);
    
  };

  console.log(correctChoices)

//end game function
function endGame() {

}


