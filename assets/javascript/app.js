let question = $("#question");
let answer = $("#answer");
let timer = $("#timer");
let results = $("#results");
let intervalId;
let time = 10;
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
    countdown();
});

//make sure time is displayed.
timer.text(time);
//make sure questions are displayed
question.text(qAndA.q1.question);

//make sure answers are displayed
answer.append("<p><a href=''>" + qAndA.q1.answer + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong1 + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong2 + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong3 + "</a></p>");

function countdown() {
    intervalId = setInterval(timeRemaining, 1000);

}

function timeRemaining(){
    time--;
    timer.text(time);

    if(time === 0){
        clearInterval(intervalId);
    }
}
