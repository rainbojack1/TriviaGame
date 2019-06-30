let question = $("#question");
let answer = $("#answer");
let timer = $("#timer");
let results = $("#results");
let intervalId;
let time = 10;
let answerArr = [];
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



// console.log("qAndA object: ", qAndA);
// console.log("First question: ", qAndA.q1.question);

$("#start-btn").click(function () {
    $("#start-btn").hide();
    $("#gameField").show();
    //countdown();
    startGame();
});

function startGame(){
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
    }
}

function scrambleAnswers(aNum){
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

function displayQuestion(number){
    
    var qArr = [];
    for(var q in qAndA){
        //prints out the keys
        //console.log("q= ", q);
        qArr.push(q);
    }
    console.log("qArr: ", qArr);

    qNum = qArr[number];
    
    $("#question").text(qAndA[qNum].question);

    scrambleAnswers(qNum);
}

function displayAnswers(){
    
    let secondArray = [];
    for(var y = answerArr.length -1; y >= 0; y--){
        let randomNum = Math.floor(Math.random() * y);
        //console.log("Pushing value: " + answerArr[randomNum] + " from index: " + randomNum);
        secondArray.push(answerArr[randomNum]);
        //console.log(answerArr);
        answerArr.splice(randomNum, 1);
        //console.log(answerArr);
    }
    
    secondArray.forEach(element => {
        $("#answer").append("<p><a href='#' class='choice' data-val='" + element + "'>" + element + "</a><p>")
    });

    console.log("qNum in displayAnswers: ", qNum);
    checkAnswer(qNum);
    //$(".choice").click(checkAnswer(qNum));
    //$(document).on("click", ".choice", checkAnswer(qNum));
}

function checkAnswer(caNum){
    $(".choice").click(function(){
        //$(document).on("click", ".choice", function(){ 
        console.log("You chose ", $(this).data('val'));
        if(($(this).data('val').toString() === qAndA[caNum].answer)){
            console.log("Correct!");
        }
        else{
            console.log("Wrong!");
        }
        n++;
        console.log("n= ", n);
        $("#answer").empty();

        // setTimeout(function(){
        //     startGame();
        // }, 1000);

        startGame();
        
    })
    
}

