var image1 = document.querySelectorAll(".sliderImg")[0];
var margin = 0;
var imgNo = 1;
var totalImages = document.querySelectorAll(".sliderImg").length;

var sliderW;
var imgBox = document.getElementById("imgBox");
var windowWidth=window.innerWidth;
function wWidth(){
    windowWidth = window.innerWidth;
};
window.addEventListener("resize", function(){
    windowWidth = window.innerWidth;

    image1.style = "margin-left:"+0+"vw; transition-timing-function:ease-out; transition-duration:0.8s;";
    imgNo=1;
    margin=0;

    if(windowWidth<=819)
    {
        if(!document.getElementById("impBr"))
        {
            let br = document.createElement("br");
            let priv = document.getElementById("priv");
            document.getElementById("tp").insertBefore(br, priv);
            br.id = "impBr";
            document.getElementById("priv").style.padding = "6px 0px";
        }
    }
    else if(windowWidth>819 && document.getElementById("impBr"))
    {
        document.getElementById("impBr").remove();
    }
});

function moveLeft()
{
    if(windowWidth>1420)
        margin -= 33;
    else if(windowWidth<=573)
    {
        if(imgNo<7)
        {
            margin -= 260;
            image1.style = "margin-left:"+margin+"px; transition-timing-function:ease-out; transition-duration:0.8s;";
        }
        if(imgNo==7)
        {
            margin = 0;
            image1.style = "margin-left:"+margin+"px; transition-timing-function:ease-out; transition-duration:0.8s;";
        }
    }
    else
        margin -= 45;

    if(imgNo>=1 && imgNo<totalImages && windowWidth>573)
    {
        image1.style = "margin-left:"+margin+"vw; transition-timing-function:ease-out; transition-duration:0.8s;";
    }
    else if(imgNo==totalImages && windowWidth>573)
    {
        margin = 0;
        image1.style = "margin-left:"+margin+"vw; transition-timing-function:ease-out; transition-duration:0.8s;";
    }
    
    if(imgNo<totalImages && imgNo>=1)
        imgNo++;
    else if(imgNo==7)
        imgNo=1;
}
document.getElementById("leftArrow").addEventListener("click", moveLeft);
function moveRight()
{
    if(windowWidth>1420)
        margin += 33;
    else if(windowWidth<=573)
    {
        if(imgNo>1)
        {
            margin += 260;
            image1.style = "margin-left:"+margin+"px; transition-timing-function:ease-out; transition-duration:0.8s;";
        }
        if(imgNo==1)
        {
            margin = -1560;
            image1.style = "margin-left:"+margin+"px; transition-timing-function:ease-out; transition-duration:0.8s;";
        }
    }
    else
        margin += 45;

    if(imgNo<=totalImages && imgNo>1 && windowWidth>573)
    {
        image1.style = "margin-left:"+margin+"vw; transition-timing-function:ease-out; transition-duration:0.8s;";
    }
    else if(imgNo==1 && windowWidth>573)
    {
        if(windowWidth>1420)
            margin = -(33*(totalImages-1));
        else
            margin = -(45*(totalImages-1));

        image1.style = "margin-left:"+margin+"vw; transition-timing-function:ease-out; transition-duration:0.8s;";
    }
    
    if(imgNo<=totalImages && imgNo>1)
        imgNo--;
    else if(imgNo==1)
        imgNo=totalImages;
}
document.getElementById("rightArrow").addEventListener("click", moveRight);

var interval = setInterval(autoSlide, 3000);
function autoSlide()
{
    moveLeft();
}

var services = document.getElementById("services");
var serviceOptions = document.getElementById("serviceOptions");
services.addEventListener("click", serOptions);
function serOptions(){
    let s = window.getComputedStyle(serviceOptions);

    if(s.display == "none")
    {
        services.innerHTML = "Services▾";
        serviceOptions.style = "display:inline-block;";
        aboutOptions.style = "display:none;";
    }
    else{
        services.innerHTML = "Services▸";
        serviceOptions.style = "display:none;";
    }
}

var about = document.getElementById("about");
var aboutOptions = document.getElementById("aboutOptions");
about.addEventListener("click", abOptions);
function abOptions(){
    let s = window.getComputedStyle(aboutOptions);

    if(s.display == "none")
    {
        about.innerHTML = "About▾";
        aboutOptions.style = "display:inline-block;";
        serviceOptions.style = "display:none;";
    }
    else{
        about.innerHTML = "About▸";
        aboutOptions.style = "display:none;";
    }
}

var line3 = document.getElementById("line3");
var menu2nd = document.getElementById("menu2nd");
var account = document.getElementById("account2");
var menuHide = true;
var login = document.getElementById("login2");
var signin = document.getElementById("signin2");
var services2 = document.getElementById("services2");
var about2 = document.getElementById("about2");
var serviceOptions2 = document.getElementById("serviceOptions2");
var aboutOptions2 = document.getElementById("aboutOptions2");
line3.addEventListener("click", function(){
    if(menuHide==true)
    {
        menu2nd.style = "display:block; background-color:rgb(230, 230, 230); margin-top:15px; margin-left:0px; padding:10px; border-radius:5px;";

        menuHide=false;
    }

    else{
        menu2nd.style.display = "none";
        serviceOptions2.style.display = "none";
        aboutOptions2.style.display = "none";
        menuHide=true;
        about2.innerHTML = "About▸";
        services2.innerHTML = "Services▸";
    }
});
services2.addEventListener("click", function(){
    let s = window.getComputedStyle(serviceOptions2);

    if(s.display == "none")
    {
        services2.innerHTML = "Services▾";
        serviceOptions2.style.display = "block";
        serviceOptions2.style.marginLeft = "117px";
        serviceOptions2.style.marginTop = "33px";
        aboutOptions2.style.display = "none";
    }
    else{
        services2.innerHTML = "Services▸";
        serviceOptions2.style.display = "none";
    }
});
about2.addEventListener("click", function(){
    let s = window.getComputedStyle(aboutOptions2);
    if(s.display == "none")
    {
        about2.innerHTML = "About▾";
        aboutOptions2.style.display = "block";
        aboutOptions2.style.marginTop = "-95px";
        aboutOptions2.style.marginLeft = "117px";
        serviceOptions2.style.display = "none";
    }
    else{
        about2.innerHTML = "About▸";
        aboutOptions2.style.display = "none";
    }
});