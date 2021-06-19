// variables
let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout; 
let currentQuestion = 0;

const start_button = document.getElementById("start-button");
const time_remaining = document.getElementById("time-remaining");
const quiz_section = document.querySelectorAll("quiz-questions");




//questions for quiz
class Question {
    constructor(question, choices, indexOfCorrectChoice) {
      this.question = question;
      this.choices = choices;
      this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
  }

const q_1 = new Question("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
const q_2 = new Question("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
const  q_3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
const  q_4 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
const  q_5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
const question_list = [ q_1,  q_2,  q_3,  q_4,  q_5];


// event listeners 
start_button.addEventListener('click', startQuiz);

//start game function
 function startQuiz(){
     
 }


 // Timer 
 function displayTime() {
    time_remaining.textContent = totalTime;
  }

  function startTimer() {
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

//right answer

//wrong answer





 //end game function


