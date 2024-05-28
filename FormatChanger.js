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

var input = document.getElementById("input");
var canva = document.getElementById("canva");
var text = document.getElementById("text");
var download = document.getElementById("download");
text.addEventListener("click", function(){
    input.click();
});
input.addEventListener("change", function(){
    let files = input.files;
    let ctx = canva.getContext("2d");
    let img = new Image();
    img.src = URL.createObjectURL(files[0]);

    img.onload = function(){
        ctx.drawImage(img, 0, 0, canva.width, canva.height);
    }

    download.style.display = "block";
});

var forma = document.getElementById("format");
forma.addEventListener("change", function(){
    let selIndex = forma.selectedIndex;
    let selElement = forma.options[selIndex];
    let selValue = selElement.value;
    
    let dataURL = canva.toDataURL("img/"+selValue);
    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "downloaded-image."+selValue;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
});

var windowWidth=window.innerWidth;
window.addEventListener("resize", function(){
    windowWidth=window.innerWidth;
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