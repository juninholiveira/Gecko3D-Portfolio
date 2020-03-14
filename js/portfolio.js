var button = document.getElementById("backToTop"),
    body = document.body,
    html = document.documentElement,
    offset = 100,
    scrollPos, 
    docHeight;

// Calculate the document Height and divide it by 4 to get the offset (uncessary, but cool)
docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
if(docHeight != 'undefined')
{
    //The offset needed to the button show up will be the height of the page divided by 4
    offset = docHeight / 4;
}

//Add scroll event listener
window.addEventListener
(
    "scroll",
    function(event)
    {
        console.log("its working");
        //.scrolTop gets the number of pixels already scrolled from the top of the page
        scrollPos = body.scrollTop || html.scrollTop;

        //If the number of pixels already scrolled from the top of the page is greater than the offset, then adds the class 'visible' to the button, otherwise, removes it
        button.className = (scrollPos > offset) ? "visible" : "";
    }
);

//Add click event listeners
button.addEventListener
(
    "click",
    function(event)
    {
        event.preventDefault();
        scrollToTop(200,3);
    }
);

function scrollToTop(totalTime, easingPower)
{
    var timeInterval = 1; //in ms
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);
    var timeLeft = totalTime;
    var scrollByPixel = setInterval
    (
        function()
        {
            var percentSpent = (totalTime - timeLeft) / totalTime;
            if(timeLeft >= 0)
            {
                var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
                body.scrollTop = newScrollTop;
                html.scrollTop = newScrollTop;
                timeLeft--;
            }
            else
            {
                clearInterval(scrollByPixel);
            }
        },
        timeInterval
    );
}

function easeInOut(t, power)
{
    if (t < 0.5)
    {
        return 0.5 * Math.pow(2* t, power);
    }
    else
    {
        return 0.5 * (2 - Math.pow(2 * (1 - t), power));
    }
}