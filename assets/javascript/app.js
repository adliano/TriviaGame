// <!-- Geography -->
// <!-- https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple -->
var questionsObject;
let url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple`;


fetch(url)
    .then((response) => response.json())
    .then((myJson) => {
        // console.dir(myJson);
        questionsObject = myJson;
        
        
    })
    .then(() => updateView());


// window.onload = function () {    
    
    var intervalID;
    var timerCounter = 30; // 30 seconds
    // Array with Questions keys
   // let questionsKeys = Object.keys(questions);
    // JSON with current question info
    


    // musicKeys = Object.keys(musics);
    // variable used to hold JSON with info about selected music
    //  let currentMusicKey = musicKeys.splice(rand(0, musicKeys.length - 1), 1);
    // get object with info for the current music
    //  musicObject = musics[currentMusicKey[0]];



    /******************************************************************************/
    /* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */
    /******************************************************************************/
    // Function that generate random number
    // this will return a number beteween the provided range
    // Math.random() return number between 0 (inclusive) and 1 (exclusive)
    // in this case, The maximum is inclusive and the minimum is inclusive
    function rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
    for(let _btn of questionButtons){
        _btn.addEventListener("click", function(event){
            let _btnText = event.target.innerHTML;
            /////////// DEBUGGING \\\\\\\\\\\
            console.log(_btnText);
            console.dir(questionsObject);
            console.log(questionsObject.results[0].question);
            
        });
    }

    function updateView(){
        // Get randon index from questionsObject using splice to void erpetitive questions
        let _question = questionsObject.results[0].question;
        // Get Element that will display the question
        let _questionElement = document.querySelector("#question");
        // Set the question
        _questionElement.innerHTML = _question;
        // Random place correct answer and incorrect on the buttons

    }






//} // END of window.onload