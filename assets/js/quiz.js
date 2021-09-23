// Query selectors
var beginQuiz=document.getElementById("beginQuiz");
var quizBody = document.getElementById("quiz");
var quiz_box= document.getElementById("quiz_box")
var resultsConainerEL = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var allDoneContainer = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var gameOverBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var informationContainerEl= document.getElementById("infoContainer");
var firstpageContainer=document.getElementById("firstQ");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question array
var quizQuestions = [{
    question: "JavaScript is a ____________ typed language?",
    choiceA: "statically",
    choiceB: "programatically",
    choiceC: "dynamically",
    choiceD: "mathematically",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "Which built-in method reverses the order of the elements of an array?",
    choiceA: "sort(order)",
    choiceB: "reverse()",
    choiceC: "changeOrder(order)",
    choiceD: "None of the above.",
    correctAnswer: "b"},
    {
    question: "Which event occurs when the user clicks on an HTML element??",
    choiceA: "onmouseover",
    choiceB: "onhover",
    choiceC: ".click",
    choiceD: "onclick",
    correctAnswer: "d"},
    {
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    {
    question: "What will the following code return: Boolean(10 > 9)?",
    choiceA: "NaN;",
    choiceB: "false;",
    choiceC: "true;",
    choiceD: "null;",
    correctAnswer: "c"},
    {
    question: "Who invented JavaScript?",
    choiceA: "Bill Gates",
    choiceB: "Brendan Eich",
    choiceC: "Larry Page",
    choiceD: "Steve Jobs",
    correctAnswer: "b"},
    ];
//  Global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    allDoneContainer.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function getRules()
{ 
    debugger
    firstpageContainer.style.display="none";
    informationContainerEl.style.visibility="visible";
    startQuizButton.addEventListener("click",startQuiz);
}
function startQuiz(){
    informationContainerEl.style.display="none";
    allDoneContainer.style.display = "none";
    quiz_box.style.visibility="visible";
    //startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
//  displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quiz_box.style.display = "none"
    allDoneContainer.style.visibility="visible"
    allDoneContainer.style.display ="flex"
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    document.getElementById("final-score")=timeLeft;
    document.getElementById("finalS").innerText= "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// submit progress to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        allDoneContainer.style.display = "none";
        highscoreContainer.style.visibility = "visible";
       
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

//  clears the high scores and generates a new high score list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// hides all of the other pages  
function showHighscore(){
    quiz_box.style.display = "none"
    allDoneContainer.style.visibility="hidden";
    highscoreContainer.style.visibility="visible";
    informationContainerEl.style.visibility="visible;"

    generateHighscores();
}

// clears the local storage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// sets all the variables back to their original values and shows the first page to enable replay of the quiz
function replayQuiz(){
    debugger
    highscoreContainer.style.display = "none";
    allDoneContainer.style.display = "none";
    informationContainerEl.style.display=none;
    firstpageContainer.style.visibility = "visible";
firstpageContainer.style.display="flex"
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

//  checks the answer agains quiz answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
     //display in the results div that the answer is correct..
        resultsConainerEL.innerText="Correct!"
        resultsConainerEL.style="text-align: center; font-weight: bold;"
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
       // alert("That Is Incorrect.")
       resultsConainerEL.innerText="Incorrect!"
       resultsConainerEL.style="text-align: center; font-weight: bold;"
        currentQuestionIndex++;
        timeLeft=timeLeft-10;
        generateQuizQuestion();
    }
     //if time runs out
        if(timeLeft==0){
        showScore();
    }
}

//  starts the quiz!
beginQuiz.addEventListener("click", getRules)


