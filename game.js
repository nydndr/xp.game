// Divs
var body = document.querySelector("body");
var welcomewindow = document.querySelector("#welcome-section");
var end = document.querySelector("#end");
var joke = document.querySelector("#joke-window");
var fixClose = document.getElementsByClassName('error');
// Buttons
var startbtn = document.querySelector("#play-btn");
var buttonClose = document.getElementsByClassName("will-close");
// Dinamic Texts
var finalScore = document.querySelector("#finalScore");
// Functional variables
var errorArray = [];
var score = 0;
var verify;

startbtn.addEventListener("click", function(){
    
    welcomewindow.style.display = "none";
    startGame();

    // Joke window functioning
    window.setTimeout( function(){joke.style.display = 'block'}, 2000);
    window.setTimeout( function(){joke.style.display = 'none'}, 7000);
})

function startGame()
{
    // Recursive function that increases the speed of error windows spams
    increasingSpeedSpan(generator, 10000, 1000);
    verify = setInterval(verifier, 500);
}

function increasingSpeedSpan(callback, factor, times)
{
    var internalCallback = function(tick, counter) {
        return function() {
            if (--tick >= 0 && verifier()) {
                window.setTimeout(internalCallback, factor/++counter);
                callback();
                fix();
            }
        }
    }(times, 0);

    window.setTimeout(internalCallback, factor);
}

// function that erases the error windows that are closed
function fix()
{
    Array.prototype.forEach.call(buttonClose, element => {
        
        element.addEventListener("click", function(){

            console.log("cliquei");
            score++;
            finalScore.textContent = score;

            let errorToClose = element.closest(".error");

            errorToClose.style.display = "none";
            errorArray.pop();
        })
    });
}

// function that creates error windows and place them randomly in the screen
function generator()
{
    let min, max;
    min = Math.ceil(0);
    max = Math.floor(70);
    let randomX = Math.floor(Math.random()* (max + min + 1)) + min;
    min = Math.ceil(0);
    max = Math.floor(80);
    let randomY = Math.floor(Math.random()* (max + min + 1)) + min;
    /* optimize span areas */

    let errorWindow = `<div class='window error random' style='z-index: 1; top:${randomY}vh; left:${randomX}vw'>
                            <div class='title-bar'>
                            <div class='title-bar-text'>Error </div>
                            <div class='title-bar-controls'>
                                <button aria-label='Close'></button> </div>
                        </div>
                        <div class='window-body'>
                            <p>Click 'fix' to fix error.</p>
                            <button class='will-close'>Fix</button></div>
                        </div>`;
                        
    body.insertAdjacentHTML("beforeend", errorWindow);

    errorArray.push(errorWindow);
}

// function that verifies if the limit hasnt been exceeded
function verifier()
{
    if(errorArray.length >= 10)
    {
        clearInterval(verify);

        endGame();

        return false;
    }
    return true;
}

function endGame()
{
    end.style.visibility = "visible";

    // the windows present before endgame have to be erased for two reasons
        // 1. if they are still visible, they can still be clicked and the person can still make points after endgame
        // 2. the #end window will be overlayed by them, so depending on the spans x,y's they will hide the user result
    Array.prototype.forEach.call(buttonClose, element => {
        
        let errorToClose = element.closest(".error");

        errorToClose.classList.add("no");
    });
}