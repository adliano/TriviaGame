// <!-- Geography -->
// Global Variables \\
let questionsObjects;
let questionsKeys;
let correctAnswerGifURL;
let wrongAnswerGifURL;
let correctAnswer;
// Save interval ID to be able to stop when need it
var intervalID;
// Time given to user to answer 30 seconds
var timerCounter = 30;
//
let gameInfo = { toatlWin: 0, totalLost: 0, totalRounds: 0 };
//
/******************************************************************************/
/* * * * * * * * * * * * * * * * getQuestions() * * * * * * * * * * * * * * * */
/******************************************************************************/
function getQuestions(difficulty) {
    let url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty}&type=multiple`;
    // Get questions from API using promisses
    fetch(url)
        .then((response) => response.json())
        .then((myJson) => {
            // Save the object
            questionsObjects = myJson.results;
            ///////// DEBUG \\\\\\\\\
            console.log(questionsObjects);
            //
            // Array with Questions keys
            questionsKeys = Object.keys(questionsObjects);
        })
        // Enable Start Button after data ia loaded
        .then(() => noName())
        // Update view after data arrive
        .then(() => updateView());
}
//
getQuestions("easy");
//
/*****************************************************************************/
/* * * * * * * * * * * * * * getCorrectAnswerGIF() * * * * * * * * * * * * * */
/*****************************************************************************/
function getCorrectAnswerGIF(search) {
    let _url = `https://api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=${search}&rating=G`;
    fetch(_url)
        .then((result) => result.json())
        .then((jsonObj) => {
            correctAnswerGifURL = jsonObj.data.images.original.url;
            console.log(correctAnswerGifURL);

        });
}
/*****************************************************************************/
/* * * * * * * * * * * * * * getWrongAnswerGIF() * * * * * * * * * * * * * * */
/*****************************************************************************/
function getWrongAnswerGIF() {
    let _url = `https://api.giphy.com/v1/gifs/random?api_key=5txQgNzAKY8UPAGRI78q6WpaFO8ls0Zn&tag=wrong answer&rating=G`;
    fetch(_url)
        .then((result) => result.json())
        .then((jsonObj) => {
            wrongAnswerGifURL = jsonObj.data.images.original.url;
            console.log(wrongAnswerGifURL);
        });
}
/******************************************************************************/
/* * * * * * * * * * * * * * * * * noName() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// TODO: Name this function later
function noName() {
    // Get start button element 
    let _btn = document.querySelector("#startButton");
    // Enable the start button
    _btn.disabled = false;
    // Add the event listner
    _btn.addEventListener("click", function () {
        // remove Start button from view 
        mkInvisible("#containerStart");
        // Add the Question container on view
        mkVisible("#questionsContainer");
    });
}
/*****************************************************************************/
/* * * * * * * * * * * * * * * mkVisible() * * * * * * * * * * * * * * * * * */
/*****************************************************************************/
function mkVisible(...selectors) {
    for (let selector of selectors) {
        document.querySelector(selector).classList.remove("invisible");
    }
}
/*******************************************************************************/
/* * * * * * * * * * * * * * * mkInvisible() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
function mkInvisible(...selectors) {
    for (let selector of selectors) {
        document.querySelector(selector).classList.add("invisible");
    }
}
/*******************************************************************************/
/* * * * * * * * * * * * * * * * * setText() * * * * * * * * * * * * * * * * * */
/*******************************************************************************/
function setText(selector, text){
    document.querySelector(selector).innerHTML = text;
}
/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween 0 and (exclusive) range 
function rand(range) {
    range = Math.floor(range);
    return Math.floor(Math.random() * range);
}
/******************************************************************************/
/* * * * * * * * * * * * * * * * startTimer() * * * * * * * * * * * * * * * * */
/******************************************************************************/
function startTimer() {
    document.querySelector("#timerID").classList.remove("text-danger");
    clearInterval(intervalID);
    intervalID = setInterval(updateTimer, 1000);
}
/*******************************************************************************/
/* * * * * * * * * * * * * * * * updateTimer() * * * * * * * * * * * * * * * * */
/*******************************************************************************/
function updateTimer() {
    // Set Counter to always show two digits
    timerCounter = ("0" + timerCounter).slice(-2);
    // Display Updated conter
    setText("#timerID",timerCounter);
    // Stop if counter reachs zero
    if (timerCounter == 0) {
        stop()
    }
    // Make it red color if counter bellow 10
    else if (timerCounter < 11) {
        document.querySelector("#timerID").classList.add("text-danger");
    }
    // Update Counter
    timerCounter--;
    // TODO: check if timer == 0 
    // TODO: update noAnswered
    // TODO: reset view 
}
/****************************************************************************/
/* * * * * * * * * * * * * * * * * stop() * * * * * * * * * * * * * * * * * */
/****************************************************************************/
function stop() {
    clearInterval(intervalID);
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* * * * * * * * * * * * * * onAnswerClick() * * * * * * * * * * * * * * * */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Method to handle event wen user click in any answer
function onAnswerClick(event) {
    event.preventDefault();
    // stop current interval
    clearInterval(intervalID);
    // get interval ID
    intervalID = setInterval(updateView, 1000 * 5);
    // Get text from clicked button
    let _btnText = event.target.innerHTML;
    // remove timerHearder, question and btnColumn from view
    mkInvisible("#timerHearder", "#btnColumn");
    //display displayGIF
    mkVisible("#displayGIF");
    // Get Element image
    let _imgElement = document.querySelector("#displayGIF").children[0];
    // Variable to hold the src url
    let _src;
    // Variable to hold answer status
    let _answerStatus;
    // If correct answer
    if (_btnText == correctAnswer) {
        // Update toatlWin
        gameInfo.toatlWin++;
        // set url
        _src = correctAnswerGifURL;
        // Set answer status to correct
        _answerStatus = "You Got it!";
    }
    // If wrong answer
    else {
        // update totalLost
        gameInfo.totalLost++;
        //set url
        _src = wrongAnswerGifURL;
        // Set answer status to wrong
        _answerStatus = "Nope!";
    }
    // set text for answer status
    setText("#question",_answerStatus);
    // add the src to img
    _imgElement.setAttribute("src", _src);
}
//
// Add the onclick listener to answers buttons
document.querySelector("#btnColumn").addEventListener("click", onAnswerClick);
//
/* ********************************************** */
/* * * * * * * * * * updateView() * * * * * * * * */
/* ********************************************** */
// Fubction used to update view with new question
// this function will return the correct_answer 
// to compare with user answer
function updateView() {
    // Get a rand key ussing splice (splice return a Array)
    let _key = questionsKeys.splice(rand(questionsKeys.length), 1);
    ///////// DEBUG \\\\\\\\\
    console.log(`%c current key : ${_key[0]}`, 'background-color: red;');
    //
    // Get randon object from questionsObjects using splice to void erpetitive questions
    let _obj = questionsObjects[_key[0]];
    // Get string question
    let _question = _obj.question;
    // Set the question
    setText("#question", _question);
    // Get the correct_answer (it will be the return of this function)
    correctAnswer = _obj.correct_answer;
    // Add correct_answer to incorrect_answers array to shuffle
    _obj.incorrect_answers.push(correctAnswer);
    // Get all answer buttons
    let _questionButtons = document.querySelector("#btnColumn").children
    // Random place correct and incorrect answer on the buttons
    for (let _btn of _questionButtons) {
        let _question = _obj.incorrect_answers.splice(rand(_obj.incorrect_answers.length), 1)[0];
        _btn.innerHTML = _question;
    }
    // Get Correct answer gif url
    getCorrectAnswerGIF(`right answer ${correctAnswer}`);
    // Get wronganswer git url
    getWrongAnswerGIF();
    // remove gif animation displayGIF
    mkInvisible("#displayGIF");
    // display timerHearder, question and btnColumn
    mkVisible("#timerHearder", "#question", "#btnColumn");
    // Stop timer
    stop();
    // Reset counter
    timerCounter = 30;
    //Start timer
    startTimer();
}
// Button use to debug \\
// document.querySelector("#update").addEventListener("click", updateView);