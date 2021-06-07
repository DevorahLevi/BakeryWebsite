$('#collapsible').collapsible();


var seconds = 15;
var interval; // variable for clearInterval() function

function countdownTimer() 
{
    closeCollapsibles();
    interval = setInterval(function() {
        updateSecs()
    }, 1000);
}

function closeCollapsibles()
{
    document.getElementById("billing").style.display = "none";
    document.getElementById("shipping").style.display = "none";
    document.getElementById("payment").style.display = "none";
    document.getElementById("review").style.display = "none";
}


function updateSecs() 
{
    document.getElementById("countdown").innerText = seconds;
    seconds--;
    if (seconds == -1) 
    {
        clearInterval(interval);
        redirect();
    }
}

function redirect() 
{
    document.location.href = "http://localhost/storeFrontProject1/MainPage";
}