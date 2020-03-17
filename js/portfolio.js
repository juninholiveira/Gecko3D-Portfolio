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
    offset = docHeight / 6;
}

//Add scroll event listener
window.addEventListener
(
    "scroll",
    function(event)
    {
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

//Below here i code the Lightbox script
document.addEventListener('click', lightboxClick);

function lightboxClick(event)
{
    var elem = event.target,
        elemID = elem.getAttribute('id'),
        lightboxImg = document.getElementById('lightbox-image'),
        lightbox = document.getElementById("lightbox-overlay"),
        newImg = new Image();

    //If we click as element with the attribute "data-lightbox", show the overlay    
    if(elem.hasAttribute('data-lightbox'))
    {
        event.preventDefault();

        newImg.onload = function()
        {
            lightboxImg.src = this.src;
        }

        lightboxImg.src = '';
        newImg.src = elem.getAttribute('data-lightbox');
        lightbox.classList.add('visible');  
    }

    //If we click any of these 2 elements, close the lightbox
    if(elemID == 'lightbox-image' || elemID == 'lightbox-overlay')
    {
        event.preventDefault();

        lightbox.classList.remove('visible');
    }
}