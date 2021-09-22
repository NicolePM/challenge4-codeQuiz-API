/* ------- global variable declarations ------- */
let shuffledQuestions, currentQuestionIndex;


/* --------------- doc query selectors --------------- */
const beginQuiz=document.getElementById("beginQuiz");
const startQuiz= document.getElementById("startQuiz");
const informationContainerEl= document.getElementById("infoContainer");
const introContainerEl=document.getElementById("introduction");
const quizContainerEl=document.getElementById("quiz_box");
const quizQuestionEl=document.getElementById("question");
const answerButtonEl=document.getElementById("answer-btn");
const timerEl = document.getElementById("timer");
const answerMeter=document.getElementById("footer-text");
const allDoneEl=document.getElementById("allDoneContainer");
const enterInitials=document.getElementById("enterInitials");


var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var choice5 = document.getElementById("btn4");
var totalTime= 75;
var checkedAns;

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

enterInitials.addEventListener("click", function(){
    var saveToLocalStorage=document.getElementById("scores");
    localStorage.setItem(saveToLocalStorage, timerEl.innerText);
    console.log()
})

function getRules()
{ 
    debugger
    introContainerEl.style.visibility="hidden";
    informationContainerEl.style.visibility="visible";
    startQuiz.addEventListener("click", populateQuiz);
    return;
}

function populateQuiz()
{
    //debugger;
    runTimer();
    checkLocalStorageAvailability();
    console.log("started");
    currentQuestionIndex = 0;
    informationContainerEl.style.visibility="hidden";
    quizContainerEl.style.visibility="visible";
    shuffledQuestions=quizArray.sort(()=> Math.random() -.5)
  
    populateNextQuestions()
    

}

function populateNextQuestions()
{
   debugger;
    //conditional loop to check index value to stop the quiz
    if (currentQuestionIndex <10 && totalTime>1){
    showQuestions(shuffledQuestions[currentQuestionIndex])
    }
    else{
        gameOver();
    }
    return true;
    
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
         for (i of btns) {
         i.addEventListener('click', function() {
             event.preventDefault();
             checkAnswer(this.innerText);
            populateNextQuestions();
              }); 
            }
    
}
 
  
    //Checking answers if they are correct or not
    function checkAnswer(answer)
    {
        
        debugger
            if(answer===quizArray[currentQuestionIndex].correct)
            {
                answerMeter.textContent="Correct!";
                    answerMeter.style="text-align: center; font-weight: bold;"
                    currentQuestionIndex++;
                    checkedAns=answerMeter.textContent;
            }
            else{
                answerMeter.textContent="Wrong";
                answerMeter.style="text-align: center; font-weight: bold;"
                currentQuestionIndex++;
                totalTime= totalTime-10;
                timerEl.innerText=totalTime;
                checkedAns=answerMeter.textContent;
            }
           // answerMeter.textContent=""
           
            
    }
    
    function runTimer()
    {
        // Timer that counts down from 60 seconds
  totalTime=75;
    var timeInterval = setInterval(function() {
      // As long as the `timeLeft` is greater than 1
      if (totalTime > 1) {
        timerEl.innerText = totalTime 
        totalTime--;
      }
        else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'Times UP!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
       
      }
    }, 1000);
    }

    function checkLocalStorageAvailability()
    {
            var test = 'NM:' + " 58";
            try {
                localStorage.setItem(test, test);
                console.log(test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        }
    
        function gameOver()
        {
        if (totalTime==0)
        {
            quizQuestionEl.style.visibility="hidden"
            quizContainerEl.style.visibility="hidden"
            allDoneEl.style.visibility="visible";
            answerMeter.innerText= "TIMES UP!";
        }
        else{
            quizQuestionEl.style.visibility="hidden";
            quizContainerEl.style.visibility="hidden";
            allDoneEl.style.visibility="visible";
            document.getElementById("final").innerText=checkedAns;
            document.getElementById("final-score").innerText=totalTime;
        
        }
    }

  
      



  
