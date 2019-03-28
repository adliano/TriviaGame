// <!-- Geography -->

let questionsObjects;
let questionsKeys;

let url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple`;
// Get questions from API using promisses
fetch(url)
    .then((response) => response.json())
    .then((myJson) => {
        // Save the object
        questionsObjects = myJson.results;




        console.log(questionsObjects);





        // Array with Questions keys
        questionsKeys = Object.keys(questionsObjects);



        console.log(questionsKeys);
        
    })
    // Update view after data arrive
    .then(() => updateView());

// Save interval ID to be able to stop when need it
var intervalID;
// Time given to user to answer 30 seconds
var timerCounter = 30;




// variable used to hold JSON with info about selected music
//  let currentMusicKey = musicKeys.splice(rand(0, musicKeys.length - 1), 1);
// get object with info for the current music
//  musicObject = musics[currentMusicKey[0]];



/******************************************************************************/
/* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
/******************************************************************************/
// Function that generate random number
// this will return a number beteween 0 and (exclusive) range 
function rand(range) {
    range = Math.floor(range);
    return Math.floor(Math.random() * range);
}
/* ******************************* */
function startTimer() {
    clearInterval(intervalID);
    intervalID = setInterval(updateTimer, 1000);
}
/* ******************************* */
function updateTimer() {
    // Update Counter
    timerCounter--;
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
}
/* ******************************** */
function stop() {
    clearInterval(intervalID);
}

//console.log(Object.keys(questions));

// musicKeys = Object.keys(musics)

startTimer();

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
function updateView() {
    // Get a rand key ussing splice 
    // splice return a Array 
    let _key = questionsKeys.splice(rand(questionsKeys.length), 1);
    // Debugging
    console.log(`%c current key : ${_key[0]}`,'background-color: red;');
    //
    // Get randon object from questionsObjects using splice to void erpetitive questions
    let _obj = questionsObjects[_key[0]];
    // Get string question
    let _question = _obj.question;
    // Get Element that will display the question
    let _questionElement = document.querySelector("#question");
    // Set the question
    _questionElement.innerHTML = _question;
    // Random place correct answer and incorrect on the buttons
    // Get Array with incorrect_answers
    let _incorrectAnswers = _obj.incorrect_answers;
    // Get the correct_answer (it will be the return of this function)
    let _correctAnswer = _obj.correct_answer;
    // Add correct_answer to incorrect_answers array
    _incorrectAnswers.push(_correctAnswer);
    //
    // Debugging
    //
    for(let _btn of questionButtons){
        _btn.innerHTML = _incorrectAnswers.slice(rand(_incorrectAnswers.length),1)[0];
    }
    // console.log(`%c_incorrectAnswers : ${_incorrectAnswers}`,`background-color:blue; color:white;`);

    return _correctAnswer;

}






//} // END of window.onload