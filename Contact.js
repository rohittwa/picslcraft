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
var menu = document.getElementById("menu");
var account = document.getElementById("account");
var menuHide = true;
var login = document.getElementById("login");
var signin = document.getElementById("signin");
var services = document.getElementById("services");
var about = document.getElementById("about");
var serviceOptions = document.getElementById("serviceOptions");
var aboutOptions = document.getElementById("aboutOptions");
line3.addEventListener("click", function(){
    if(menuHide==true)
    {
        menu.style = "display:block; background-color:rgb(230, 230, 230); margin-top:60px; margin-left:0px; padding:10px; border-radius:5px;";
        account.style = "display:block; background-color:rgb(230, 230, 230);";
        document.querySelectorAll("#menu a")[0].style = "display:block; text-align:left; color:rgb(12, 12, 81); line-height:30px;";
        document.querySelectorAll("#menu a")[1].style = "display:block; text-align:left; color:rgb(12, 12, 81); line-height:30px;";
        
        services.style.fontSize = "11pt";
        services.addEventListener("click", function(){
            serviceOptions.style.marginLeft = "100px";
            serviceOptions.style.marginTop = "-30px";
        });

        about.addEventListener("click", function(){
            aboutOptions.style.marginTop = "0px";
            aboutOptions.style.marginLeft = "98px";
        });

        about.style.fontSize = "11pt";
        about.style.color = "rgb(12, 12, 81)";

        login.style = "background-color:rgb(230, 230, 230); color:rgb(12, 12, 81); font-size:11pt; margin-left:-321px; margin-top:92px; border-radius:5px; z-index:6; position:absolute; width:96px; display:inline-block; padding:10px; box-sizing:border-box;";

        signin.style = "background-color:rgb(230, 230, 230); color:rgb(12, 12, 81); font-size:11pt; margin-left:-321px; margin-top:120px; border-radius:5px; z-index:6; position:absolute; width:96px; display:inline-block; padding:10px; box-sizing:border-box;";

        menuHide=false;
    }
    else{
        menu.style.display = "none";
        menuHide=true;
        account.style.display = "none";
        serviceOptions.style.display = "none";
        aboutOptions.style.display = "none";
    }
});

var acOptions = document.getElementById("acOptions");
account.addEventListener("click", function(){
    let s = window.getComputedStyle(acOptions);
    if(s.display == "none")
    {
        acOptions.style.display = "block";
    }
    else{
        acOptions.style.display = "none";
    }
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