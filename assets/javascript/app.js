// <!-- Geography -->

let questionsObjects;
let questionsKeys;
let correctAnswer;
// Save interval ID to be able to stop when need it
var intervalID;
// Time given to user to answer 30 seconds
var timerCounter = 30;
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
            //
            ///////// DEBUG \\\\\\\\\
            //console.log(questionsKeys);
        })
        // Update view after data arrive
        .then(() => updateView());
}

getQuestions("easy");

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
    document.querySelector("#timerID").innerHTML = timerCounter;
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
}
/****************************************************************************/
/* * * * * * * * * * * * * * * * * stop() * * * * * * * * * * * * * * * * * */
/****************************************************************************/
function stop() {
    clearInterval(intervalID);
    
}

// Get all Buttons under btnColumn id
let questionButtons = document.querySelector("#btnColumn").children
// Set onclick event listner for each
for (let _btn of questionButtons) {
    _btn.addEventListener("click", function (event) {
        let _btnText = event.target.innerHTML;
        /////////// DEBUGGING \\\\\\\\\\\
        console.log(_btnText);
        console.dir(questionsObjects);
        console.log(questionsObjects.results[0].question);

    });
}
/* ********************************************** */
/* * * * * * * * * * updateView() * * * * * * * * */
/* ********************************************** */
// Fubction used to update view with new question
// this function will return the correct_answer 
// to compare with user answer
function updateView() {
    // stop();
    // startTimer();
    // timerCounter = 30;
    // Get a rand key ussing splice 
    // splice return a Array 
    let _key = questionsKeys.splice(rand(questionsKeys.length), 1);
    ///////// DEBUG \\\\\\\\\
    console.log(`%c current key : ${_key[0]}`, 'background-color: red;');
    //
    // Get randon object from questionsObjects using splice to void erpetitive questions
    let _obj = questionsObjects[_key[0]];
    // Get string question
    let _question = _obj.question;
    // Get Element that will display the question
    let _questionElement = document.querySelector("#question");
    // Set the question
    _questionElement.innerHTML = _question;
    // Get the correct_answer (it will be the return of this function)
    correctAnswer = _obj.correct_answer;
    // Add correct_answer to incorrect_answers array to shuffle
    _obj.incorrect_answers.push(correctAnswer);
    //
    // Random place correct and incorrect answer on the buttons
    for (let _btn of questionButtons) {
        let _question = _obj.incorrect_answers.splice(rand(_obj.incorrect_answers.length), 1)[0];
        _btn.innerHTML = _question;
    }

    stop();
    timerCounter = 30;
    startTimer();
    
    

    // console.log(`%c Key : ${_incorrectAnswersKeys[rand(_incorrectAnswersKeys.length)]}`, `background-color:yellow; color:blue;`);

}

document.querySelector("#update").addEventListener("click", updateView);