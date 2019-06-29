let question = $("#question");
let answer = $("#answer");
let timer = $("#timer");
let results = $("#results");
let intervalId;
let time = 10;
let answerArr = [];
let scrambled = new Set();
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
//answer.append("<p><a href=''>" + qAndA.q1.answer + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong1 + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong2 + "</a></p>").append("<p><a href=''>" + qAndA.q1.wrong3 + "</a></p>");

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

function scrambleAnswers(){
    //use a for-in loop to put the answers in answerArr
    for(var x in qAndA.q1){
        //prints out the keys
        console.log("x= ", x);
        if(x !== "question"){
            answerArr.push(qAndA.q1[x]);
        }
        
    }
    console.log("answerArr: ", answerArr);

    //create a random number to be the index of the item in answerArr to push to the scrambled set
    //use a while loop to fill scrambled up to answerArr length
    //push the array[scrambled index] to the set until the set has all four
    
    /*do {
        let randomNum = Math.floor(Math.random() * 4);
        scrambled.add(answerArr[randomNum]);
        console.log("random num: ", randomNum);
        console.log("Scrambled set size: ", scrambled.size);
        if(scrambled.size == 4){
            break;
        }
      }
      while (scrambled.size < answerArr.length + 1);

    console.log("Scrambled set: ", scrambled);*/

      //let newArray = [1, 2, 3, 4];
    /*for(var y = 0; y < answerArr.length; y++){
        let randomNum = Math.floor(Math.random() * 4);
        //$("#answer").append("<p><a href='' data-value=" + answerArr[randomNum] + ">" + answerArr[randomNum] + "</a><p>");
        console.log("randomNum: ", randomNum);
        console.log("newArray[randomNum]: ", newArray[randomNum]);
        newArray.slice(0, 1);
        console.log("newArray in for loop", newArray);
    }*/

    //return scrambled;
        
}

function displayAnswers(scrambled){
   //create a new <p> and display the values of the scrambled set
    /*function populateAnswerList(scram){
        $("#answer").append("<p><a href='' class='choice' data-val='" + scram + "'>" + scram + "</a><p>");
        //console.log("Can you see me?");
    }
    scrambled.forEach(populateAnswerList);*/

    console.log("answerArr is ", answerArr);
    let secondArray = [];
    for(var y = answerArr.length -1; y >= 0; y--){
        let randomNum = Math.floor(Math.random() * y);
        console.log("Pushing value: " + answerArr[randomNum] + " from index: " + randomNum);
        secondArray.push(answerArr[randomNum])
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
    })
    
}

$("#start-btn").click(function(){
    displayAnswers(scrambled);
})

scrambleAnswers();