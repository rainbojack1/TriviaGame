let question = $("#question");
let answer = $("#answer");
let timer = $("#timer");
let results = $("#results");
let intervalId;
let time = 10;
let answerArr = [];
//let scrambled = new Set();
let n = 1;
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



console.log("qAndA object: ", qAndA);
console.log("First question: ", qAndA.q1.question);

$("#start-btn").click(function () {
    $("#start-btn").hide();
    $("#gameField").show();
    //countdown();
    startGame();
});

//make sure time is displayed.
timer.text(time);
//make sure questions are displayed
// question.text(qAndA.q1.question);

function startGame(){
    countdown();
    timeRemaining();
    scrambleAnswers();
    displayQuestion(n);
    displayAnswers();
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

function scrambleAnswers(){
    //use a for-in loop to put the answers in answerArr
    for(var x in qAndA.q1){
        //prints out the keys
        console.log("x= ", x);
        if(x !== "question"){
            answerArr.push(qAndA.q1[x]);
        }
        
    }
    console.log("answerArr 1st: ", answerArr);
        
}

function displayQuestion(qNum){
    
    if(qNum === 1){
        $("#question").text(qAndA.q1.question);
    }else if(qNum === 2){
        $("#question").text(qAndA.q2.question);
    }else if(qNum === 3){
        $("#question").text(qAndA.q3.question);
    }

    displayAnswers();
}

function displayAnswers(){
   //create a new <p> and display the values of the scrambled set
    /*function populateAnswerList(scram){
        $("#answer").append("<p><a href='' class='choice' data-val='" + scram + "'>" + scram + "</a><p>");
        //console.log("Can you see me?");
    }
    scrambled.forEach(populateAnswerList);*/

    let secondArray = [];
    for(var y = answerArr.length -1; y >= 0; y--){
        let randomNum = Math.floor(Math.random() * y);
        console.log("Pushing value: " + answerArr[randomNum] + " from index: " + randomNum);
        secondArray.push(answerArr[randomNum]);
        console.log(answerArr);
        answerArr.splice(randomNum, 1);
        console.log(answerArr);
    }
    
    secondArray.forEach(element => {
        $("#answer").append("<p><a href='#' class='choice' data-val='" + element + "'>" + element + "</a><p>")
    });

    checkAnswer();
}

function checkAnswer(){
    $(".choice").click(function(){
        console.log("You chose ", $(this).data('val'));
        if(($(this).data('val').toString() === qAndA.q1.answer)){
            console.log("Correct!");
        }
        else{
            console.log("Wrong!");
        }
        n++;
        console.log("n= ", n);
        //displayQuestion(n);
    })
    
}

/*$("#start-btn").click(function(){
    //displayAnswers();
    //displayQuestion(n);
    startGame();
})*/

//scrambleAnswers();