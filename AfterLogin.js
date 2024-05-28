window.addEventListener("load", function(){
    var image1 = document.querySelectorAll(".sliderImg")[0];
    var margin = 0;
    var imgNo = 1;
    var totalImages = document.querySelectorAll(".sliderImg").length;

    var sliderW;
    var imgBox = document.getElementById("imgBox");
    var windowWidth=window.innerWidth;
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

            login.style = "background-color:rgb(230, 230, 230); color:rgb(12, 12, 81); font-size:11pt; margin-left:-298px; margin-top:92px; border-radius:5px; z-index:6; position:absolute; width:96px; display:inline-block; padding:10px; box-sizing:border-box;";

            signin.style = "background-color:rgb(230, 230, 230); color:rgb(12, 12, 81); font-size:11pt; margin-left:-298px; margin-top:120px; border-radius:5px; z-index:6; position:absolute; width:96px; display:inline-block; padding:10px; box-sizing:border-box;";

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
});

var account = document.getElementById("account");
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