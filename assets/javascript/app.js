window.onload = function () {
    var intervalID;
    var timerCounter = 30;// 30 seconds
    /* ******************************* */
    function startTimer(){
        clearInterval(intervalID);
        intervalID = setInterval(updateTimer,1000);
    }
    /* ******************************* */
    function updateTimer(){
        // Update Counter
        timerCounter--;
        // Set Counter to always show two digits
        timerCounter = ("0" + timerCounter).slice(-2);
        // Display Updated conter
        document.querySelector("#timerID").innerHTML = timerCounter;
        // Stop if counter reachs zero
        if(timerCounter == 0){
             stop()
        }
        // Make it red color if counter bellow 10
        else if(timerCounter < 11){
            document.querySelector("#timerID").classList.add("text-danger");
        }
    }
    /* ******************************** */
    function stop(){
        clearInterval(intervalID);
    }


    startTimer();
    
    
}// END of window.onload