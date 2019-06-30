let question = $("#question");
let answer = $("#answer");
let timer = $("#timer");
let results = $("#results");
let intervalId;
let time = 10;
let answerArr = [];
let correctFlag = false;
let completeFlag = false;
let exitFlag = false;
let winCount = 0;
let loseCount = 0;
let n = 0;
let qNum;
let qAndA = {
    q1:{
        question: "How many letters are in the American alphabet?",
        answer: "26",
        wrong1: "15",
        wrong2: "30",
        wrong3: "45"
    },
    q2:{
        question: "How many months are in a year?",
        answer: "12",
        wrong1: "15",
        wrong2: "10",
        wrong3: "24"
    },
    q3:{
        question: "How many weeks are in a year?",
        answer: "52",
        wrong1: "7",
        wrong2: "365",
        wrong3: "63"
    }
};


$("#start-btn").click(function () {
    $("#start-btn").hide();
    // $("#gameField").show();
    //countdown();
    startGame();
});

function startGame(){
    $("#gameField").show();
    time = 10;
    //make sure time is displayed.
    timer.text(time);
    countdown();
    timeRemaining();
    //scrambleAnswers();
    displayQuestion(n);
    //displayAnswers();
}

function countdown() {
    clearInterval(intervalId);
    intervalId = setInterval(timeRemaining, 1000);

}

function timeRemaining(){
    time--;
    timer.text(time);

    if(time === 0){
        clearInterval(intervalId);
        $("#answer").empty();
        n++;
        startGame();
    }
}

function displayQuestion(number){
    console.log("displayQuestion");
    
    correctFlag = false;
    
    var qArr = [];
    for(var q in qAndA){
        qArr.push(q);
    }
    console.log("qArr: ", qArr);
    console.log("n: ", n);
    if(n >= qArr.length){
        completeFlag = true;
        //stop the function if no more questions in the array
        exitFlag = true;
        displayResult();
        return;
    }
    
    qNum = qArr[number];
    
    $("#question").text(qAndA[qNum].question);

    scrambleAnswers(qNum);
    
    
}

function scrambleAnswers(aNum){
    console.log("scrambleAnswers");
    //use a for-in loop to put the answers in answerArr
    for(var x in qAndA[aNum]){
        //prints out the keys
        //console.log("x= ", x);
        if(x !== "question"){
            answerArr.push(qAndA[aNum][x]);
        }
        
    }
    console.log("answerArr: ", answerArr);
    displayAnswers();
}


function displayAnswers(){
    console.log("displayAnswers");
    let secondArray = [];
    for(var y = answerArr.length -1; y >= 0; y--){
        let randomNum = Math.floor(Math.random() * y);
        secondArray.push(answerArr[randomNum]);
        answerArr.splice(randomNum, 1);        
    }
    
    secondArray.forEach(element => {
        $("#answer").append("<p><a href='#' class='choice' data-val='" + element + "'>" + element + "</a><p>")
    });

    console.log("qNum in displayAnswers: ", qNum);
    checkAnswer(qNum);
    
}

function checkAnswer(caNum){
    console.log("checkAnswer");
    $(".choice").click(function(){
        console.log("You chose ", $(this).data('val'));
        
        if(($(this).data('val').toString() === qAndA[caNum].answer)){
            console.log("Correct!");
            correctFlag = true;
            winCount++;
        }
        else{
            console.log("Wrong!");
            loseCount++;
        }
        n++;
        console.log("n= ", n);
        
        $("#answer").empty();

        displayResult();
    })    
}

function displayResult(){
    console.log("displayResult");
    $("#timeLeft").hide();
    $("#questionRow").hide();
    $("#answerRow").hide();
    $("#resultRow").show();
    var showAnswer = $("<div>");
    
    if(completeFlag === true){
        showAnswer.append("<p><h2>Game Over</h2></p>");
        showAnswer.append("<p> You got " + winCount + " correct!</p>");
        showAnswer.append("<p> You got " + loseCount + " wrong.</p>");
        //showAnswer.append("<button id='playAgain'>Play again?</button>");        
    }else if(correctFlag === true ){
        showAnswer.append("<p>Correct!</p>");
        showAnswer.append("<p><h2>" + qAndA[qNum].answer + "</h2></p>");
    }else{
        showAnswer.append("<p>Wrong Answer</p>");
        showAnswer.append("<p><h2>" + qAndA[qNum].answer + "</h2></p>");
    }
    
    /*$(document).on("click","#playAgain", function(){
        console.log("Play Again");
        console.log("Why 4x ?");
    });*/

    $("#results").html(showAnswer);

    setTimeout(function(){
        if(!exitFlag){
            showPlayingField();
        }
    }, 1000 * 1);
}

function showPlayingField(){
    $("#timeLeft").show();
    $("#questionRow").show();
    $("#answerRow").show();
    $("#resultRow").hide();
    startGame();
}