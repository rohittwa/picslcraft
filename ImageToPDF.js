var windowWidth=window.outerWidth;
function wWidth(){
    windowWidth = window.outerWidth;
};
window.addEventListener("resize", function(){
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

var imagesInput = document.getElementById("images");
var box3 = document.getElementById("box3");
var download = document.getElementById("download");
var imgContainer = document.getElementById("imgContainer");
var doc = new jsPDF();
imagesInput.addEventListener("change", function () {
    var files = imagesInput.files;
    var currentIndex = 0;

    function addImageToPage(index) {
        var img = new Image();
        var aspectRatio;

        var file = files[index];

        img.onload = function () {
            // Calculate the aspect ratio to maintain image proportions
            aspectRatio = img.width / img.height;

            // Set the page size based on image orientation
            if (aspectRatio > 1) {
                doc.addImage(img, 'JPEG', 10, 10, doc.internal.pageSize.width - 20, (doc.internal.pageSize.width - 20) / aspectRatio);
            } else {
                doc.addImage(img, 'JPEG', 10, 10, (doc.internal.pageSize.width - 20) * aspectRatio, doc.internal.pageSize.height - 20);
            }

            // If there are more images, add a new page and proceed
            if (index + 1 < files.length) {
                doc.addPage();
                addImageToPage(index + 1);
            } else {
                // If all images are added, show the download button
                box3.style = "display:flex; width:100%; height:40px;";
                download.style.display = "block";
            }

            document.getElementById("footer").style.position = "relative";
        };

        img.src = URL.createObjectURL(file);
        var newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.style.width = "40%";
        newImg.style.height = "auto";
        imgContainer.appendChild(newImg);

        var br = document.createElement("br");
        imgContainer.appendChild(br);
        imgContainer.appendChild(br);
    }

    // Start adding images to pages
    addImageToPage(currentIndex);
});

// Downloading pdf.
function savePdf() {
    doc.save("newPdf.pdf");
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