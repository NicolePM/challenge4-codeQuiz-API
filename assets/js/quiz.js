/* ------- global variable declarations ------- */

let availableQuesions = [];
let currentQuestion = {};
let shuffledQuestions, currentQuestionIndex=0;
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 60;

/* --------------- doc query selectors --------------- */
const beginQuiz=document.getElementById("beginQuiz");
const startQuiz= document.getElementById("startQuiz");
const informationContainerEl= document.getElementById("infoContainer");
const introContainerEl=document.getElementById("introduction");
const quizContainerEl=document.getElementById("quiz_box");
const quizQuestionEl=document.getElementById("question");
const answerButtonEl=document.getElementById("answer-btn");
const timer = document.getElementById("timer");
const answerMeter= document.getElementById("footer-text");
// const timeLeft = document.getElementById("timeLeft");
// const timesUp = document.getElementById("timesUp");
var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var choice5 = document.getElementById("btn4");

//const choices= Array.from(document.getElementsByClassName("list-group-item-action"));


/* --------------- quiz questions stored in an array --------------- */
let quizArray = [
    {
        question:
            "What data-type is not a non-primative type in JavaScript?",
        options: ["boolean", "string", "null", "var", "undefined"],
        correct: "var",
    },
    {
        question: "JavaScript is a ____________ typed language",
        options: ["statically", "dynamically", "programatically", "mathematically", "hybrid"],
        correct: "dynamically",
    },
    {
        question:
            "What does DOM stand for?",
        options: ["Dumb Object Model", "Data Object Model", "Document Object Model", "Different Object Model", "Domain Oriented Model"],
        correct: "Document Object Model",
    },
    {
        question:
            "Where is the correct place to insert a JavaScript?",
        options: ["the <body> section", "the <main> section", "the <title> section", "in a <div> section", "the <footer> section"],
        correct: "the <body> section",
    },
    {
        question:
            "How can you add a comment in a JavaScript?",
        options: ["<!--This is a comment-->", "'This is a comment'", "//This is a comment", "*This is a comment", "(This is a comment)"],
        correct: "//This is a comment",
    },
    {
        question:
            "Which event occurs when the user clicks on an HTML element?",
        options: ["onmouseover", "onclick", "onchange", ".click", "onhover"],
        correct: "onclick",
    },
    {
        question:
            "How do you declare a JavaScript variable?",
        options: ["variable name;", "var name;", "v name;", "name()", "name;"],
        correct: "var name;",
    },
    {
        question:
            "What will the following code return: Boolean(10 > 9)?",
        options: ["undefined;", "true;", "NaN;", "null", "false;"],
        correct: "true;",
    },

    {
        question:
            "Who invented JavaScript?",
        options: ["Bill Gates", "Steve Jobs", "Brendan Eich", "Mark Zuckerberg", "Larry Page"],
        correct: "Brendan Eich",
    },
    {
        question:
            "Which built-in method reverses the order of the elements of an array?",
        options: ["reverse()", "sort(order)", "changeOrder(order)", "None of the above.", "toString()"],
        correct: "reverse()",
    },
];
beginQuiz.addEventListener("click", getRules)

function getRules()
{
    console.log("started");
    introContainerEl.style.visibility="hidden";
    informationContainerEl.style.visibility="visible";
    startQuiz.addEventListener("click", populateQuiz);

    // if(document.getElementById("exitQuiz").clikced==true){
    //     alert("You are exiting the quiz");
    //     return false;
    //     windows.location.reload(true);}

}

function populateQuiz()
{
    console.log("started");
    //questionIndex = 0;
    currentQuestionIndex = 0
    //timeLeft.textContent = totalTime;
    informationContainerEl.style.visibility="hidden";
    quizContainerEl.style.visibility="visible";
    shuffledQuestions=quizArray.sort(()=> Math.random() -.5)
    currentQuestionIndex=0;
    populateNextQuestions();

}

function populateNextQuestions()
{
    showQuestions(shuffledQuestions[currentQuestionIndex])
}

function showQuestions(question)

    {
        quizQuestionEl.innerText = question.question;
        choice1.textContent=quizArray[currentQuestionIndex].options[0];
        choice2.textContent=quizArray[currentQuestionIndex].options[1];
        choice3.textContent=quizArray[currentQuestionIndex].options[2];
        choice4.textContent=quizArray[currentQuestionIndex].options[3];
        choice5.textContent=quizArray[currentQuestionIndex].options[4];
        
        let btns = document.querySelectorAll("[data-number]");
        //console.log(btns);
        for (i of btns) {
          i.addEventListener('click', function() {
            // console.log(this.innerText);
            // console.log(quizArray[currentQuestionIndex].correct);
           checkAnswer(this.innerText);
            
          }); 
    }
}
             //console.log(this);
            //var x= document.getElementById(this).ariaValueMax;

        //   });
        // }
    
    

    function checkAnswer(answer)
    {
            if(answer==quizArray[currentQuestionIndex].correct)
            {
                alert("You are right!")
                answerMeter.innerText="Correct";
                answerMeter.style="text-align: center; font-weight: bold; "
            }
            else{
                    alert("You are wrong!")
                    answerMeter.innerText="Wrong!";
                    answerMeter.style="text-align: center; font-weight: bold; "
            }
    }

    function runTimer()
    {}
        //   const button = document.createElement('button')
        //   button.innerText = option.text
        //   button.classList.add("list-group-item")
        //   button.classList.add('list-group-item-action')
        //   if (option.correct) {
        //     button.dataset.correct = option.correct
        //   }
        //   button.addEventListener('click', selectAnswer)
        //   answerButtonEl.appendChild(button)
        
      



  
