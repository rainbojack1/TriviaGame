let question = $("#question");
//let answer = $("#answer");
let timer = $("#timer");
//let results = $("#results");
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
    },
    q4:{
        question: "Which TV character said, “Live long and prosper”?",
        answer: "Mr. Spock",
        wrong1: "Shrek",
        wrong2: "Buzz Lightyear",
        wrong3: "Mork"
    },
    q5:{
        question: "What is the name of Batman’s butler?",
        answer: "Alfred",
        wrong1: "Geoffrey",
        wrong2: "Calvin",
        wrong3: "Bruce"
    },
    q6:{
        question: "How is the groundnut better known?",
        answer: "Peanut",
        wrong1: "Hazelnut",
        wrong2: "Walnut",
        wrong3: "Pecan"
    },
    q7:{
        question: "According to Greek mythology who was the first woman on earth?",
        answer: "Pandora",
        wrong1: "Medusa",
        wrong2: "Diomede",
        wrong3: "Theonoe"
    },
    q8:{
        question: "Cruella de Vil is the villain in which Disney movie?",
        answer: "101 Dalmatians",
        wrong1: "Oliver and Company",
        wrong2: "Lady and the Tramp",
        wrong3: "Snow White"
    },
    q9:{
        question: "What does the crocodile swallow in Peter Pan?",
        answer: "A clock",
        wrong1: "A pair of scissors",
        wrong2: "A book",
        wrong3: "A violin"
    },
    q10:{
        question: "Scar is a villain in which Disney movie?",
        answer: "The Lion King",
        wrong1: "Atlantis",
        wrong2: "Black Panther",
        wrong3: "Mulan"
    }
};

let picArr = ['assets/images/alphabet.jpeg', 'assets/images/months.png', 'assets/images/weeks.jpg', 'assets/images/spock.jpg', 'assets/images/alfred.jpg', 'assets/images/mrpeanut.jpg', 'assets/images/pandora.jpg', 'assets/images/cruella.png', 'assets/images/crocodile.jpg', 'assets/images/scar.jpg', 'assets/images/gameOver.jpg'];

$("#start-btn").click(function () {
    $("#start-btn").hide();
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
        displayResult();
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
    $("#picture").empty();
    var showAnswer = $("<div>");

    if(completeFlag === true){
        showAnswer.append("<p><h2>Game Over</h2></p>");
        showAnswer.append("<p> You got " + winCount + " correct!</p>");
        showAnswer.append("<p> You got " + loseCount + " wrong.</p>");
        $("#restart-btn").show();
    }else if(correctFlag === true ){
        showAnswer.append("<p>Correct!</p>");
        showAnswer.append("<p><h2>" + qAndA[qNum].answer + "</h2></p>");
    }else{
        showAnswer.append("<p>Wrong Answer</p>");
        showAnswer.append("<p><h2>" + qAndA[qNum].answer + "</h2></p>");
    }

    $("#picture").append("<img src=" + picArr[n - 1] + " alt='answerPic'/>");
    
    $("#restart-btn").on("click", function(){
        console.log("Play Again");
        clearInterval();
        $("#answer").empty();
        n = 0;
        showPlayingField();
    });

    console.log("displayResult n= ", n);

    $("#results").html(showAnswer);

    setTimeout(function(){
        if(!exitFlag){
            showPlayingField();
        }
    }, 1000 * 2);
}

function showPlayingField(){
    $("#timeLeft").show();
    $("#questionRow").show();
    $("#answerRow").show();
    $("#resultRow").hide();
    startGame();
}
