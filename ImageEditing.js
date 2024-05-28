var menubar = document.getElementById("menubar");
var menus = document.getElementById("menus");
var open = false;
var inputa = document.getElementById("input");
var canva = document.getElementById("canva");
var ctx = canva.getContext("2d");
var image = document.getElementById("image");
var heightPer, widthPer, imageSelected=false;
var importa = document.getElementById("import");
var imageData = ctx.getImageData(0, 0, canva.width, canva.height);
var download = document.getElementById("download");
var selectedArea=[];
var editHistory=[], step=-1;

function openFile()
{
    inputa.click();
    importa.style.display = "none";
}

var input, reader;
var img = new Image();
var imageStyle = window.getComputedStyle(image);
inputa.addEventListener("change", function(event){
    input = event.target;

    if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
            img.onload = imgLoad;
        };

        reader.readAsDataURL(input.files[0]);
    }

    open=false;
});
function imgLoad() {
    let height = imageStyle.height;
    height = height.slice(0, -2);
    height = parseInt(height);
    heightPer = (height/img.height)*100;
    widthPer = img.width*(heightPer/100);
    canva.setAttribute("width", widthPer);
    canva.setAttribute("height", height);
    ctx.clearRect(0, 0, widthPer, canva.height);
    ctx.drawImage(img, 0, 0, widthPer, height);
    canva = document.getElementById("canva");
    canva2.setAttribute("width", img.width);
    canva2.setAttribute("height", img.height);
    ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);

    editHistory = [];
    step=-1;
    editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
    console.log("imgload history called");
    step++;

    selectedArea = [[0, 0], [canva.width, 0], [canva.width, canva.height], [0, canva.height]];

    document.getElementById("down").style.display = "block";
    if(window.innerWidth>994)
        document.getElementById("down").style.marginLeft = canva.offsetLeft+"px";
    else
        document.getElementById("down").style.marginLeft = (canva.offsetLeft+canva.width+10)+"px";
}

window.addEventListener("resize", function(){
    let imgStyle = window.getComputedStyle(image);
    let w = imgStyle.width;
    let h = imgStyle.height;
    if(typeof(h)!="number")
    {
        h = h.slice(0, -2);
        h = parseInt(h);
    }
    if(cropped1==true)
    {
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
    }
    else{
        heightPer = (h/img.height)*100;
        widthPer = img.width*(heightPer/100);
        canva.setAttribute("width", widthPer);
        canva.setAttribute("height", h);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
    }

    canva.addEventListener("mousedown", brushStart);
    canva.addEventListener("mousemove", brushContinue);
    canva.addEventListener("mouseup", brushOff);

    if(box!=undefined)
    {
        let cWidth = canva.getAttribute("width");
        cWidth = parseInt(cWidth);
        let cHeight = canva.getAttribute("height");
        cHeight = parseInt(cHeight);

        if(typeof(h)!="number")
        {
            h = h.slice(0, -2);
            h = parseInt(h);
        }

        box.style = "width:"+canva.width+"px; height:"+canva.height+"px; margin-left:"+canva.offsetLeft+"px; z-index:2; margin-top:"+canva.offsetTop+"px;";

        //box.style.marginLeft = canva.offsetLeft+"px";
        topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((cWidth/2)-17.5)+"px; margin-top:-3px; z-index:2;";
        righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(cWidth-6)+"px; margin-top:"+((cHeight/2)-17.5)+"px; z-index:2;";
        bottoma.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((cWidth/2)-17.5)+"px; margin-top:"+(h-6)+"px; z-index:2;";
        lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((cHeight/2)-17.5)+"px; margin-left:-3px; z-index:2;";
    }

    selectedArea = [[canva.offsetLeft, canva.offsetTop], [canva.offsetLeft+canva.width, canva.offsetTop], [canva.offsetLeft+canva.width, canva.offsetTop+canva.height], [canva.offsetLeft, canva.offsetTop+canva.height]];

    if(document.getElementById("rectSel"))
        document.getElementById("rectSel").remove();

    if(window.innerWidth<=994)
    {
        document.getElementById("down").style.marginLeft = image.offsetLeft+canva.width+10+"px";
    }
});
var canva2 = document.getElementById("canva2");
var ctx2 = canva2.getContext("2d");

var brush = document.getElementById("brush");
var toolOptions = document.getElementById("toolOptions");
var brushOn = false, thickness, color, minvalue, maxvalue;
var imgStyle = window.getComputedStyle(image);
brush.addEventListener("click", function(){
    toolOptions.innerHTML = "";

    cropOn=false;
    textOn=false;
    rectSelOn=false;
    paintOn=false;

    if(document.getElementById("cropBox"))
        document.getElementById("cropBox").remove();

    minvalue = document.createElement("span");
    toolOptions.appendChild(minvalue);
    if(window.innerWidth<=994)
    {
        minvalue.style = "position:absolute; margin-top:0px; margin-left:-320px;";
    }
    else{
        minvalue.style = "position:absolute; margin-top:-90px; margin-left:-140px;";
    }
    minvalue.id = "brushMin";

    thickness = document.createElement("input");
    thickness.setAttribute("type", "range");
    thickness.setAttribute("min", 1);
    toolOptions.appendChild(thickness);
    thickness.id = "thickness";
    thickness.value = 3;
    thickness.style.width = "110px";
    thickness.addEventListener("input", function(){
        minvalue.innerHTML = thickness.value;
    });

    minvalue.innerHTML = thickness.value;

    maxvalue = document.createElement("span");
    maxvalue.style = "position:absolute; margin-top:-90px; margin-left:140px;";
    if(window.innerWidth<=994)
    {
        maxvalue.style = "position:absolute; margin-top:0px; margin-left:-50px;";
    }
    else{
        maxvalue.style = "position:absolute; margin-top:-90px; margin-left:140px;";
    }
    toolOptions.appendChild(maxvalue);
    maxvalue.id = "brushMax";
    maxvalue.innerHTML = "100";

    color = document.createElement("input");
    color.setAttribute("type", "color");
    toolOptions.appendChild(color);
    color.id = "color";
    if(window.innerWidth<=994)
    {
        color.style.marginLeft = "50px";
    }
    color.style.width = "130px";
    color.style.height = "70px";
    color.style.marginTop = "20px";

    canva.addEventListener("mousedown", brushStart);
    canva.addEventListener("mousemove", brushContinue);
    canva.addEventListener("mouseup", brushOff);

    if(document.getElementById("rectSel"))
    {
        document.getElementById("rectSel").addEventListener("mousedownl", brushStart);
        document.getElementById("rectSel").addEventListener("mousemove", brushContinue);
        document.getElementById("rectSel").addEventListener("mousedown", function(){
            brushOn=true;
        });
        document.getElementById("rectSel").addEventListener("mouseup", function(){
            brushOn=false;
        });
    }
});
function isPointInsideShape(x, y)
{
    let inside = false;

    for (let i = 0, j = selectedArea.length - 1; i < selectedArea.length; j = i++) {
        const xi = selectedArea[i][0], yi = selectedArea[i][1];
        const xj = selectedArea[j][0], yj = selectedArea[j][1];

        const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
}
function brushStart(e){
    let c = canva.getBoundingClientRect();
    let x = e.clientX-c.left;
    let y = e.clientY-c.top;

    brushOn = true;

    if(selectedArea.length==4)
    {
        if(x>=selectedArea[0][0] && y>=selectedArea[0][1] && x<=selectedArea[2][0] && y<=selectedArea[2][1])
        {
            ctx.lineWidth = thickness.value;
            ctx.lineCap = "round";
            ctx.strokeStyle = color.value;
            ctx.beginPath();
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
            ctx.stroke();

            ctx2.clearRect(0, 0, canva2.width, canva2.height);
            ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
        }
    }
}
function brushContinue(e){
    if(brushOn==true)
    {
        let c = canva.getBoundingClientRect();
        let x = e.clientX-c.left;
        let y = e.clientY-c.top;

        if(selectedArea.length==4)
        {
            if(x>=selectedArea[0][0] && y>=selectedArea[0][1] && x<=selectedArea[2][0] && y<=selectedArea[2][1])
            {
                ctx.lineWidth = thickness.value;
                ctx.lineCap = "round";
                ctx.strokeStyle = color.value;
                ctx.lineTo(x, y);
                ctx.moveTo(x, y);
                ctx.stroke();

                ctx2.clearRect(0, 0, canva2.width, canva2.height);
                ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
            }
        }
    }
}
function brushOff(){
    if(brushOn==true)
    {
        brushOn=false;
        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("brushoff history called");
    }
}
var rx, ry;
function rectMouseMove(e){
    if(brushOn==true)
    {
        let rect =  document.getElementById("rectSel");
        let rStyle = window.getComputedStyle(rect);
        let l = rStyle.marginLeft;
        l = l.slice(0, -2);
        l = parseInt(l);
        t = rStyle.marginTop;
        t = t.slice(0, -2);
        t = parseInt(t);
        rx = e.offsetX;
        ry = e.offsetY;

        ctx.lineWidth = thickness.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = color.value;
        ctx.beginPath();
        ctx.lineTo((l-canva.offsetLeft)+rx+2, t+ry+2);
        ctx.moveTo((l-canva.offsetLeft)+rx+2, t+ry+2);
        ctx.stroke();

        ctx2.clearRect(0, 0, canva2.width, canva2.height);
        ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
    }
}

var crop = document.getElementById("crop");
var cropOn = false;
var startX, startY, cropStart=false, box, topa, righta, bottoma, lefta, boxStyle, cropped1=false;
crop.addEventListener("click", function(){
    cropOn=true;
    cropStart=true;

    toolOptions.innerHTML = "";

    box = document.createElement("div");
    box.id = "cropBox";
    image.appendChild(box);
    //let c = canva.getBoundingClientRect();
    box.style = "width:"+canva.width+"px; height:"+(canva.height)+"px; margin-left:"+(canva.offsetLeft)+"px;z-index:2; margin-top:"+canva.offsetTop+"px;";
    boxStyle = window.getComputedStyle(box);

    selectedArea = [[0, 0], [canva.width, 0], [canva.width, canva.height], [0, canva.height]];
    if(document.getElementById("rectSel"))
        document.getElementById("rectSel").remove();

    if(document.getElementById("oval"))
        document.getElementById("oval").remove();

    topa = document.createElement("div");
    topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((canva.width/2)-17.5)+"px; margin-top:-3px; z-index:2;";
    box.appendChild(topa);
    topa.id = "cropTop";
    let resizeTop = false;
    let sTopY, boxWidth, boxHeight, marginLeft, marginTop;
    topa.addEventListener("mousedown", function(e){
        resizeTop = true;
        sTopY = e.clientY;

        boxWidth = boxStyle.width;
        boxWidth = boxWidth.slice(0, -2);
        boxWidth = parseInt(boxWidth);

        boxHeight = boxStyle.height;
        boxHeight = boxHeight.slice(0, -2);
        boxHeight = parseInt(boxHeight);

        marginLeft = boxStyle.marginLeft;
        marginLeft = marginLeft.slice(0, -2);
        marginLeft = parseInt(marginLeft);

        marginTop = boxStyle.marginTop;
        marginTop = marginTop.slice(0, -2);
        marginTop = parseInt(marginTop);

        marginBottom = boxStyle.marginBottom;
        marginBottom = marginBottom.slice(0, -2);
        marginBottom = parseInt(marginBottom);

        marginRight = boxStyle.marginRight;
        marginRight = marginRight.slice(0, -2);
        marginRight = parseInt(marginRight);
    });
    document.addEventListener("mousemove", function(e){
        if(resizeTop==true)
        {
            let y = e.clientY;
            let bHeight = boxStyle.height;
            bHeight = bHeight.slice(0, -2);
            bHeight = parseInt(bHeight);

            let bWidth = boxStyle.width;
            bWidth = bWidth.slice(0, -2);
            bWidth = parseInt(bWidth);

            if(canva.height-bHeight>=0 && marginTop>=0 && marginBottom>=0)
            {
                if(boxHeight - (y-sTopY)<=canva.height && marginTop>=0 && marginBottom>=0)
                {
                    box.style.height = boxHeight - (y-sTopY) + "px";
                    box.style.marginTop = marginTop + (y-sTopY) + "px";
                }
            }

            topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:-3px; z-index:2;";

            righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-17.5)+"px; z-index:2;";

            bottoma.style = "width:35px; bo rder:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:"+(bHeight-6)+"px; z-index:2;";

            lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-17.5)+"px; margin-left:-3px; z-index:2;";

            if(bHeight<87){
                lefta.style = "height:5px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-2.5)+"px; margin-left:-3px; z-index:2;";
                
                righta.style = "height:5px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-2.5)+"px; z-index:2;";
            }
        }

    });
    document.addEventListener("mouseup", function(){
        resizeTop=false;
    });

    righta = document.createElement("div");
    righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(canva.width-6)+"px; margin-top:"+((canva.height/2)-17.5)+"px; z-index:2;";
    box.appendChild(righta);
    righta.id = "cropRight";
    let sRightX, resizeRight=false;
    righta.addEventListener("mousedown", function(e){
        resizeRight=true;
        sRightX = e.clientX;

        boxWidth = boxStyle.width;
        boxWidth = boxWidth.slice(0, -2);
        boxWidth = parseInt(boxWidth);

        boxHeight = boxStyle.height;
        boxHeight = boxHeight.slice(0, -2);
        boxHeight = parseInt(boxHeight);

        marginLeft = boxStyle.marginLeft;
        marginLeft = marginLeft.slice(0, -2);
        marginLeft = parseInt(marginLeft);

        marginTop = boxStyle.marginTop;
        marginTop = marginTop.slice(0, -2);
        marginTop = parseInt(marginTop);

        marginBottom = boxStyle.marginBottom;
        marginBottom = marginBottom.slice(0, -2);
        marginBottom = parseInt(marginBottom);

        marginRight = boxStyle.marginRight;
        marginRight = marginRight.slice(0, -2);
        marginRight = parseInt(marginRight);
    });
    document.addEventListener("mousemove", function(e){
        if(resizeRight==true)
        {
            let x = e.clientX;
            let bHeight = boxStyle.height;
            bHeight = bHeight.slice(0, -2);
            bHeight = parseInt(bHeight);

            let bWidth = boxStyle.width;
            bWidth = bWidth.slice(0, -2);
            bWidth = parseInt(bWidth);

            if(canva.width-bWidth>=0)
            {
                if(boxWidth - (sRightX-x)<=canva.width)
                {
                    box.style.width = boxWidth - (sRightX-x) + "px";
                }
            }

            topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:-3px; z-index:2;";

            righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-17.5)+"px; z-index:2;";

            bottoma.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:"+(bHeight-6)+"px; z-index:2;";

            lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-17.5)+"px; margin-left:-3px; z-index:2;";
        }
    });
    document.addEventListener("mouseup", function(){
        resizeRight=false;
    });

    bottoma = document.createElement("div");
    bottoma.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((canva.width/2)-17.5)+"px; margin-top:"+(canva.height-6)+"px; z-index:2;";
    box.appendChild(bottoma);
    bottoma.id = "cropBottom";
    let resizeBottom=false, sBottomY;
    bottoma.addEventListener("mousedown", function(e){
        resizeBottom = true;
        sBottomY = e.clientY;

        boxWidth = boxStyle.width;
        boxWidth = boxWidth.slice(0, -2);
        boxWidth = parseInt(boxWidth);

        boxHeight = boxStyle.height;
        boxHeight = boxHeight.slice(0, -2);
        boxHeight = parseInt(boxHeight);

        marginLeft = boxStyle.marginLeft;
        marginLeft = marginLeft.slice(0, -2);
        marginLeft = parseInt(marginLeft);

        marginTop = boxStyle.marginTop;
        marginTop = marginTop.slice(0, -2);
        marginTop = parseInt(marginTop);

        marginBottom = boxStyle.marginBottom;
        marginBottom = marginBottom.slice(0, -2);
        marginBottom = parseInt(marginBottom);

        marginRight = boxStyle.marginRight;
        marginRight = marginRight.slice(0, -2);
        marginRight = parseInt(marginRight);
    });
    document.addEventListener("mousemove", function(e){
        if(resizeBottom==true)
        {
            let y = e.clientY;
            let bHeight = boxStyle.height;
            bHeight = bHeight.slice(0, -2);
            bHeight = parseInt(bHeight);

            let bWidth = boxStyle.width;
            bWidth = bWidth.slice(0, -2);
            bWidth = parseInt(bWidth);

            if(canva.height-bHeight>=0 && marginTop>=0 && marginBottom>=0)
            {
                if(boxHeight - (sBottomY-y)<=canva.height && marginTop>=0 && marginBottom>=0)
                {
                    box.style.height = boxHeight - (sBottomY-y) + "px";
                }
            }

            topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:-3px; z-index:2;";

            righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-17.5)+"px; z-index:2;";

            bottoma.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:"+(bHeight-6)+"px; z-index:2;";

            lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-17.5)+"px; margin-left:-3px; z-index:2;";

            if(bHeight<87){
                lefta.style = "height:5px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-2.5)+"px; margin-left:-3px; z-index:2;";
                
                righta.style = "height:5px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-2.5)+"px; z-index:2;";
            }
        }
    });
    document.addEventListener("mouseup", function(){
        resizeBottom=false;
    });

    lefta = document.createElement("div");
    lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((canva.height/2)-17.5)+"px; margin-left:-3px; z-index:2;";
    box.appendChild(lefta);
    lefta.id = "cropLeft";
    let resizeLeft=false, sLeftX;
    lefta.addEventListener("mousedown", function(e){
        resizeLeft = true;
        sLeftX = e.clientX;

        boxWidth = boxStyle.width;
        boxWidth = boxWidth.slice(0, -2);
        boxWidth = parseInt(boxWidth);

        boxHeight = boxStyle.height;
        boxHeight = boxHeight.slice(0, -2);
        boxHeight = parseInt(boxHeight);

        marginLeft = boxStyle.marginLeft;
        marginLeft = marginLeft.slice(0, -2);
        marginLeft = parseInt(marginLeft);

        marginTop = boxStyle.marginTop;
        marginTop = marginTop.slice(0, -2);
        marginTop = parseInt(marginTop);

        marginBottom = boxStyle.marginBottom;
        marginBottom = marginBottom.slice(0, -2);
        marginBottom = parseInt(marginBottom);

        marginRight = boxStyle.marginRight;
        marginRight = marginRight.slice(0, -2);
        marginRight = parseInt(marginRight);
    });
    document.addEventListener("mousemove", function(e){
        if(resizeLeft==true)
        {
            let x = e.clientX;
            let bHeight = boxStyle.height;
            bHeight = bHeight.slice(0, -2);
            bHeight = parseInt(bHeight);

            let bWidth = boxStyle.width;
            bWidth = bWidth.slice(0, -2);
            bWidth = parseInt(bWidth);

            if(canva.width-bWidth>=0 && marginLeft>=0 && marginBottom>=0)
            {
                if(boxWidth - (x-sLeftX)<=canva.width && marginLeft>=0 && marginRight>=0)
                {
                    box.style.width = boxWidth - (x-sLeftX) + "px";
                    box.style.marginLeft = marginLeft + (x-sLeftX)+"px";
                }
            }

            topa.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:-3px; z-index:2;";

            righta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+(bWidth-6)+"px; margin-top:"+((bHeight/2)-17.5)+"px; z-index:2;";

            bottoma.style = "width:35px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-17.5)+"px; margin-top:"+(bHeight-6)+"px; z-index:2;";

            lefta.style = "height:35px; border:3px solid black; position:absolute; margin:auto; margin-top:"+((bHeight/2)-17.5)+"px; margin-left:-3px; z-index:2;";

            if(bWidth<87){
                topa.style = "width:5px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-2.5)+"px; z-index:2;";
                
                bottoma.style = "width:5px; border:3px solid black; position:absolute; margin:auto; margin-left:"+((bWidth/2)-2.5)+"px; margin-top:"+(bHeight-6)+"px; z-index:2;";
            }
        }
    });
    document.addEventListener("mouseup", function(){
        resizeLeft=false;
    });


    let cropDone = document.createElement("button");
    cropDone.innerHTML = "Crop";
    toolOptions.appendChild(cropDone);
    cropDone.id = "cropDone";

    cropDone.addEventListener("click", function(){
        cropped1=true;
        let style = window.getComputedStyle(box);
        let x = style.marginLeft;
        x = x.slice(0, -2);
        x = parseInt(x);
        x -= canva.offsetLeft;

        let y = style.marginTop;
        y = y.slice(0, -2);
        y = parseInt(y);
        y -= canva.offsetTop;

        let w = style.width;
        w = w.slice(0, -2);
        w = parseInt(w);

        let h = style.height;
        h = h.slice(0, -2);
        h = parseInt(h);

        let cropped = ctx.getImageData(x, y, w, h);
    
        ctx.clearRect(0, 0, canva.width, canva.height);
        canva.setAttribute("width", w);
        canva.width = w;
        canva.setAttribute("height", h);
        canva.height = h;
        ctx.putImageData(cropped, 0, 0);
        box.remove();

        ctx2.clearRect(0, 0, canva2.width, canva2.height);
        canva2.width = w;
        canva2.height = h;
        ctx2.drawImage(canva, 0, 0, canva.width, canva.height);

        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("crop history called");
    });
});

var text = document.getElementById("text");
var textOn = false, tbox, applyText, family, fontSize, color;
text.addEventListener("click", function(){
    textOn = true;

    brushOn=false;
    cropOn=false;
    paintOn=false;
    rectSelOn=false;

    if(document.getElementById("cropBox"))
        document.getElementById("cropBox").remove();

    toolOptions.innerHTML = "";

    family = document.createElement("select");
    toolOptions.appendChild(family);
    let families = ["agency fb", "algerian", "arial", "arial rounded mt", "bahnschrift", "baskerville old face", "bauhaus 93", "bell mt", "berlin sans fb", "bernard mt", "blackadder itc", "bodoni mt", "book antiqua", "bookman old style", "bookshelf symbol 7", "bradley hand itc", "britannic", "broadway", "brush script mt", "calibri", "californian fb", "calisto mt", "cambria", "cambria math", "candara", "castellar", "centaur", "century", "century gothic", "century schoolbook", "chiller", "colonna mt", "comic sans ms", "consolas", "constantia", "cooper", "cooperplate gothic", "corbel", "courier new", "curlz mt", "dubai", "edwardian script itc", "forte", "freestyle script", "French script mt", "gigi", "Gill sans", "gloucester mt", "goudy stout", "harlow solid", "harrington", "impact", "Informal roman", "jokerman", "kristen itc", "leelawadee", "lucida calligraphy", "lucida console", "Lucida sans", "maiandra gd", "microsoft new tai lue", "microsoft sans serif", "old english text mt", "papyrus", "poor richard", "poppins", "rage", "segoe script", "showcard gothic", "verdana", "viner hand itc"];
    family.id = "family";
    for(let i=0; i<families.length; i++)
    {
        let option = document.createElement("option");
        option.value = families[i];
        option.style.transform = "capitalize";
        option.style.fontFamily = families[i];
        option.textContent = families[i];
        family.style.textTransform = "capitalize";
        family.appendChild(option);

        if(i==2)
            option.selected = true;
    }
    family.addEventListener("change", function(){
        if(tbox)
            tbox.style.fontFamily = family.value;
    });

    fontSize = document.createElement("select");
    toolOptions.appendChild(fontSize);
    fontSize.id = "fontSize";
    for(let i=6; i<=50; i++)
    {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        fontSize.appendChild(option);

        if(i==11)
            option.selected = true;
    }
    fontSize.addEventListener("change", function(){
        if(tbox)
        {
            tbox.style.fontSize = fontSize.value+"pt";
        }
    });

    color = document.createElement("input");
    toolOptions.appendChild(color);
    color.setAttribute("type", "color");
    color.id = "color";
    color.addEventListener("input", function(){
        tbox.style.color = color.value;
    });

    applyText = document.createElement("button");
    toolOptions.appendChild(applyText);
    applyText.id = "applyText";
    applyText.textContent = "Apply Text";
});
canva.addEventListener("click", function(e){
    if(textOn == true)
    {
        let x = e.offsetX+canva.offsetLeft;
        let y = e.offsetY+canva.offsetTop;

        if(applyText==undefined)
        {
            applyText = document.createElement("button");
            toolOptions.appendChild(applyText);
            applyText.id = "applyText";
            applyText.textContent = "Apply Text";
        }

        if(tbox)
        {
            tbox.remove();
        }

        tbox = document.createElement("textarea");
        tbox.setAttribute("spellcheck", "false");
        tbox.setAttribute("rows", 1);
        tbox.setAttribute("cols", 20);
        tbox.id = "textbox";
        image.appendChild(tbox);
        tbox.style = "margin-left:"+x+"px; margin-top:"+y+"px;";
        let tbStyle = window.getComputedStyle(tbox);
        applyText.addEventListener("click", function(){
            if(tbox)
            {
                ctx.font = document.getElementById("fontSize").value+"pt "+ document.getElementById("family").value;
                ctx.fillStyle = document.getElementById("color").value;
                let x = e.offsetX+1;
                let y = e.offsetY+14;
                ctx.fillText(tbox.value, x, y);
                applyText.remove();
                applyText=undefined;
                ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
                tbox.remove();

                editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
                step++;
                console.log("apply text history called");
            }
        });
    }
});

download.addEventListener("click", function(){
    var dataURL = canva.toDataURL("image/png");

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'downloaded-image.png';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
});

var rectSelect = document.getElementById("rectSelect");
var rectSelOn=false, rectX, rectY, rectSelected=false;
rectSelect.addEventListener("click", function(){
    rectSelOn=true;

    brushOn=false;
    cropOn=false;
    textOn=false;
    paintOn=false;

    if(!document.getElementById("doneRectSelect"))
    {
        let doneSelect = document.createElement("button");
        toolOptions.innerHTML = "";
        toolOptions.appendChild(doneSelect);
        doneSelect.id = "doneRectSelect";
        doneSelect.textContent = "Select";
        document.getElementById("doneRectSelect").addEventListener("click", function(){
            document.getElementById("rsTop").remove();
            document.getElementById("rsRight").remove();
            document.getElementById("rsBottom").remove();
            document.getElementById("rsLeft").remove();
            document.getElementById("rectSel").style.border = "2px dashed black";
            document.getElementById("rectSel").style.borderSpacing = "6px";
        });
    }
});
canva.addEventListener("mousedown", function(e){
    if(rectSelOn==true)
    {
        let c = canva.getBoundingClientRect();
        let x = e.clientX;
        rectX = x;
        let y = e.pageY;
        rectY = y;

        rectSelected=true;

        if(document.getElementById("rectSel"))
        {
            document.getElementById("rectSel").remove();
        }

        let rect = document.createElement("div");
        image.appendChild(rect);
        rect.id = "rectSel";
        rect.style = "margin-left:"+x+"px; margin-top:"+y+"px;";
        rect.addEventListener("mousemove", rectSelResize);
        rect.addEventListener("click", function(){
            if(paintOn==true && selectedArea.length==4)
            {
                let s = window.getComputedStyle(rect);
                let w = s.width;
                w = w.slice(0, -2);
                w = parseInt(w);

                let h = s.height;
                h = h.slice(0, -2);
                h = parseInt(h);
                ctx.fillStyle = paintCol;
                ctx.fillRect(selectedArea[0][0]+1, selectedArea[0][1]+2, w+1, h);

                ctx2.clearRect(0, 0, canva2.width, canva2.height);
                ctx2.drawImage(canva, 0, 0, canva.width, canva.height);

                editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
                step++;
                console.log("rect history called");
            }
        });
    }
});
canva.addEventListener("mousemove", rectSelResize);
function rectSelResize(e){
    if(rectSelOn==true && document.getElementById("rectSel"))
    {
        let rect = document.getElementById("rectSel");
        let c = canva.getBoundingClientRect();
        let x = e.clientX;
        let y = e.pageY;
        let w = Math.abs(x-rectX);
        let h = Math.abs(y-rectY);
        rect.style = "width:"+w+"px; height:"+h+"px; margin-left:"+rectX+"px; margin-top:"+rectY+"px;";
        let rectStyle = window.getComputedStyle(rect);
        let rMarginTop = rectStyle.marginTop;
        rMarginTop = rMarginTop.slice(0, -2);
        rMarginTop = parseInt(rMarginTop);

        let rHeight = rectStyle.height;
        rHeight = rHeight.slice(0, -2);
        rHeight = parseInt(rHeight);

        let rWidth = rectStyle.width;
        rWidth = rWidth.slice(0, -2);
        rWidth = parseInt(rWidth);

        let rMarginLeft = rectStyle.marginLeft;
        rMarginLeft = rMarginLeft.slice(0, -2);
        rMarginLeft = parseInt(rMarginLeft);

        selectedArea = [[rectX-canva.offsetLeft, rectY-canva.offsetTop], [rectX+rWidth-canva.offsetLeft, rectY-canva.offsetTop], [rectX-canva.offsetLeft+rWidth, rectY-canva.offsetTop+rHeight], [rectX-canva.offsetLeft, rectY-canva.offsetTop+rHeight]];

        if(w>=30 && h>=30)
        {
            if(document.getElementById("rsTop"))
                document.getElementById("rsTop").remove();
            let top = document.createElement("div");
            rect.appendChild(top);
            top.id = "rsTop";
            top.className = "corner";
            top.style = "margin-left:"+((w/2)-7.5)+"px; margin-top:-2px;";
            let topResize=false, stX, stY;
            top.addEventListener("mousedown", function(e){
                topResize=true;
                stX = e.clientX-image.offsetLeft;
                stY = e.pageY;

                rMarginTop = rectStyle.marginTop;
                rMarginTop = rMarginTop.slice(0, -2);
                rMarginTop = parseInt(rMarginTop);

                rHeight = rectStyle.height;
                rHeight = rHeight.slice(0, -2);
                rHeight = parseInt(rHeight);

                rWidth = rectStyle.width;
                rWidth = rWidth.slice(0, -2);
                rWidth = parseInt(rWidth);

                rMarginLeft = rectStyle.marginLeft;
                rMarginLeft = rMarginLeft.slice(0, -2);
                rMarginLeft = parseInt(rMarginLeft);
            });
            document.addEventListener("mousemove", function(e){
                if(topResize==true)
                {
                    let x = e.clientX;
                    let y = e.pageY;

                    let rWidth2 = rectStyle.width;
                    rWidth2 = rWidth2.slice(0, -2);
                    rWidth2 = parseInt(rWidth2);

                    let rHeight2 = rectStyle.height;
                    rHeight2 = rHeight2.slice(0, -2);
                    rHeight2 = parseInt(rHeight2);

                    let rMarginLeft2 = rectStyle.marginLeft;
                    rMarginLeft2 = rMarginLeft2.slice(0, -2);
                    rMarginLeft2 = parseInt(rMarginLeft2);

                    let rMarginTop2 = rectStyle.marginTop;
                    rMarginTop2 = rMarginTop2.slice(0, -2);
                    rMarginTop2 = parseInt(rMarginTop2);

                    rect.style = "height:"+(rHeight+(stY-y))+"px; margin-top:"+(rMarginTop-(stY-y))+"px; margin-left:"+rMarginLeft+"px; width:"+rWidth+"px;";

                    right.style = "margin-top:"+((rHeight2/2)-7.5)+"px; margin-left:"+rWidth2+"px;";
                    bottom.style = "margin-top:"+rHeight2+"px; margin-left:"+((rWidth2/2)-7.5)+"px;";
                    left.style = "margin-top:"+((rHeight2/2)-7.5)+"px; margin-left:-2px;";

                    selectedArea = [[rectX-canva.offsetLeft, rectY-canva.offsetTop], [rectX+rWidth2-canva.offsetLeft, rectY-canva.offsetTop], [rectX-canva.offsetLeft+rWidth2, rectY-canva.offsetTop+rHeight2], [rectX-canva.offsetLeft, rectY-canva.offsetTop+rHeight2]];
                }
            });
            document.addEventListener("mouseup", function(e){
                topResize=false;
            });

            if(document.getElementById("rsRight"))
                document.getElementById("rsRight").remove();
            let right = document.createElement("div");
            rect.appendChild(right);
            right.id = "rsRight";
            right.className = "corner";
            right.style = "margin-left:"+(w)+"px; margin-top:"+((h/2)-7.5)+"px;";
            let rightResize=false, srX, srY;
            right.addEventListener("mousedown", function(e){
                rightResize=true;
                srX = e.clientX-image.offsetLeft;

                rMarginTop = rectStyle.marginTop;
                rMarginTop = rMarginTop.slice(0, -2);
                rMarginTop = parseInt(rMarginTop);

                rHeight = rectStyle.height;
                rHeight = rHeight.slice(0, -2);
                rHeight = parseInt(rHeight);

                rWidth = rectStyle.width;
                rWidth = rWidth.slice(0, -2);
                rWidth = parseInt(rWidth);

                rMarginLeft = rectStyle.marginLeft;
                rMarginLeft = rMarginLeft.slice(0, -2);
                rMarginLeft = parseInt(rMarginLeft);
            });
            document.addEventListener("mousemove", function(e){
                if(rightResize==true)
                {
                    let x = e.clientX-image.offsetLeft;
                    let y = e.pageY;

                    let rWidth2 = rectStyle.width;
                    rWidth2 = rWidth2.slice(0, -2);
                    rWidth2 = parseInt(rWidth2);

                    let rHeight2 = rectStyle.height;
                    rHeight2 = rHeight2.slice(0, -2);
                    rHeight2 = parseInt(rHeight2);

                    let rMarginLeft2 = rectStyle.marginLeft;
                    rMarginLeft2 = rMarginLeft2.slice(0, -2);
                    rMarginLeft2 = parseInt(rMarginLeft2);

                    let rMarginTop2 = rectStyle.marginTop;
                    rMarginTop2 = rMarginTop2.slice(0, -2);
                    rMarginTop2 = parseInt(rMarginTop2);

                    rect.style = "width:"+(rWidth+(x-srX))+"px; margin-left:"+rMarginLeft+"px; margin-top:"+rMarginTop+"px; height:"+rHeight+"px;";

                    top.style = "margin-left:"+((rWidth2/2)-7.5)+"px; margin-top:-2px;";
                    right.style = "margin-left:"+rWidth2+"px; margin-top:"+((rHeight2/2)-7.5)+"px;";
                    bottom.style = "margin-left:"+((rWidth2/2)-7.5)+"px; margin-top:"+rHeight2+"px;";

                    selectedArea = [[rectX-canva.offsetLeft, rectY-canva.offsetTop], [rectX+rWidth2-canva.offsetLeft, rectY-canva.offsetTop], [rectX-canva.offsetLeft+rWidth2, rectY-canva.offsetTop+rHeight2], [rectX-canva.offsetLeft, rectY-canva.offsetTop+rHeight2]];
                }
            });
            document.addEventListener("mouseup", function(){
                rightResize=false;
            });

            if(document.getElementById("rsBottom"))
                document.getElementById("rsBottom").remove();
            let bottom = document.createElement("div");
            rect.appendChild(bottom);
            bottom.id = "rsBottom";
            bottom.className = "corner";
            bottom.style = "margin-left:"+((w/2)-7.5)+"px; margin-top:"+h+"px;";
            let bottomResize=false, sbY;
            bottom.addEventListener("mousedown", function(e){
                bottomResize=true;
                sbY = e.pageY;

                rMarginTop = rectStyle.marginTop;
                rMarginTop = rMarginTop.slice(0, -2);
                rMarginTop = parseInt(rMarginTop);

                rHeight = rectStyle.height;
                rHeight = rHeight.slice(0, -2);
                rHeight = parseInt(rHeight);

                rWidth = rectStyle.width;
                rWidth = rWidth.slice(0, -2);
                rWidth = parseInt(rWidth);

                rMarginLeft = rectStyle.marginLeft;
                rMarginLeft = rMarginLeft.slice(0, -2);
                rMarginLeft = parseInt(rMarginLeft);
            });
            document.addEventListener("mousemove", function(e){
                if(bottomResize==true)
                {
                    let x = e.clientX;
                    let y = e.pageY;

                    let rWidth2 = rectStyle.width;
                    rWidth2 = rWidth2.slice(0, -2);
                    rWidth2 = parseInt(rWidth2);

                    let rHeight2 = rectStyle.height;
                    rHeight2 = rHeight2.slice(0, -2);
                    rHeight2 = parseInt(rHeight2);

                    let rMarginLeft2 = rectStyle.marginLeft;
                    rMarginLeft2 = rMarginLeft2.slice(0, -2);
                    rMarginLeft2 = parseInt(rMarginLeft2);

                    let rMarginTop2 = rectStyle.marginTop;
                    rMarginTop2 = rMarginTop2.slice(0, -2);
                    rMarginTop2 = parseInt(rMarginTop2);

                    rect.style = "width:"+rWidth+"px; margin-left:"+rMarginLeft+"px; margin-top:"+rMarginTop+"px; height:"+(rHeight+(y-sbY))+"px;";

                    bottom.style = "margin-left:"+((rWidth2/2)-7.5)+"px; margin-top:"+rHeight2+"px;";
                    right.style = "margin-left:"+rWidth2+"px; margin-top:"+((rHeight2/2)-7.5)+"px;";
                    left.style = "margin-left:-2px; margin-top:"+((rHeight2/2)-7.5)+"px;";

                    selectedArea = [[rectX-canva.offsetLeft, rectY-canva.offsetTop], [rectX+rWidth2-canva.offsetLeft, rectY-canva.offsetTop], [rectX-canva.offsetLeft+rWidth2, rectY-canva.offsetTop+rHeight2], [rectX-canva.offsetLeft, rectY-canva.offsetTop+rHeight2]];
                }
            });
            document.addEventListener("mouseup", function(){
                bottomResize=false;
            });

            if(document.getElementById("rsLeft"))
                document.getElementById("rsLeft").remove();
            let left = document.createElement("div");
            rect.appendChild(left);
            left.id = "rsLeft";
            left.className = "corner";
            left.style = "margin-left:-2px; margin-top:"+((h/2)-7.5)+"px;";
            let leftResize=false, slX;
            left.addEventListener("mousedown", function(e){
                leftResize=true;
                slX = e.clientX-image.offsetTop;

                rMarginTop = rectStyle.marginTop;
                rMarginTop = rMarginTop.slice(0, -2);
                rMarginTop = parseInt(rMarginTop);

                rHeight = rectStyle.height;
                rHeight = rHeight.slice(0, -2);
                rHeight = parseInt(rHeight);

                rWidth = rectStyle.width;
                rWidth = rWidth.slice(0, -2);
                rWidth = parseInt(rWidth);

                rMarginLeft = rectStyle.marginLeft;
                rMarginLeft = rMarginLeft.slice(0, -2);
                rMarginLeft = parseInt(rMarginLeft);
            });
            document.addEventListener("mousemove", function(e){
                if(leftResize==true)
                {
                    let x = e.clientX-image.offsetTop;
                    let y = e.pageY;

                    let rWidth2 = rectStyle.width;
                    rWidth2 = rWidth2.slice(0, -2);
                    rWidth2 = parseInt(rWidth2);

                    let rHeight2 = rectStyle.height;
                    rHeight2 = rHeight2.slice(0, -2);
                    rHeight2 = parseInt(rHeight2);

                    let rMarginLeft2 = rectStyle.marginLeft;
                    rMarginLeft2 = rMarginLeft2.slice(0, -2);
                    rMarginLeft2 = parseInt(rMarginLeft2);

                    let rMarginTop2 = rectStyle.marginTop;
                    rMarginTop2 = rMarginTop2.slice(0, -2);
                    rMarginTop2 = parseInt(rMarginTop2);

                    rect.style = "width:"+(rWidth+(slX-x))+"px; margin-left:"+(rMarginLeft+(x-slX))+"px; margin-top:"+rMarginTop+"px; height:"+rHeight+"px;";

                    bottom.style = "margin-left:"+((rWidth2/2)-7.5)+"px; margin-top:"+rHeight2+"px;";
                    top.style = "margin-left:"+((rWidth2/2)-7.5)+"px; margin-top:-2px;";
                    left.style = "margin-left:-2px; margin-top:"+((rHeight2/2)-7.5)+"px;";
                    right.style = "margin-left:"+rWidth2+"px; margin-top:"+((rHeight2/2)-7.5)+"px;";

                    selectedArea = [[rectX-canva.offsetLeft, rectY-canva.offsetTop], [rectX+rWidth2-canva.offsetLeft, rectY-canva.offsetTop], [rectX-canva.offsetLeft+rWidth2, rectY-canva.offsetTop+rHeight2], [rectX-canva.offsetLeft, rectY-canva.offsetTop+rHeight2]];
                }
            });
            document.addEventListener("mouseup", function(){
                leftResize=false;
            });
        }
        else{
            if(document.getElementById("rsTop"))
                document.getElementById("rsTop").remove();

            if(document.getElementById("rsRight"))
                document.getElementById("rsRight").remove();

            if(document.getElementById("rsBottom"))
                document.getElementById("rsBottom").remove();

            if(document.getElementById("rsLeft"))
                document.getElementById("rsLeft").remove();
        }
    }
}
document.addEventListener("mouseup", function(){
    rectSelOn=false;
});

var paint = document.getElementById("paint");
var paintOn=false, paintCol="";
paint.addEventListener("click", function(){
    paintOn = true;

    toolOptions.innerHTML = "";

    if(document.getElementById("cropBox"))
        document.getElementById("cropBox").remove();

    if(document.getElementById("textbox"))
        document.getElementById("textbox").remove();

    brushOn=false;
    cropOn=false;
    textOn=false;
    rectSelOn=false;
    
    let color = document.createElement("input");
    color.setAttribute("type", "color");
    color.id = "paintColor";
    toolOptions.appendChild(color);
    color.addEventListener("input", function(){
        paintCol=color.value;
    });
});
canva.addEventListener("click", function(){
    if(paintOn==true && selectedArea.length==4 && rectSelected==false && ellipseCreated==false)
    {
        console.log("Rectfill function called");
        ctx.fillStyle = document.getElementById("paintColor").value;
        ctx.fillRect(selectedArea[0][0], selectedArea[0][1], canva.width, canva.height);

        ctx2.clearRect(0, 0, canva2.width, canva2.height);
        ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);

        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("canva paint history called");
    }
});

var ellipse = document.getElementById("ellipse");
var ellipseOn=false, cirBox, cirTopLeft, cirTopRight, change=false, change2=false, startX=0, startY=0, rectStyle, width1, height1, ellipse, startX2=0, startY2=0, startX3=0, startY3=0, change2=false, width2, height2, change3=false, change4=false, startX4=0, startY4=0, width4, height4, cirBottomLeft, cirBottomRight, width3, height3, ovalDrawn=false, image, ellipseCreated=false;
ellipse.addEventListener("click", function(){
    ellipseOn=true;

    toolOptions.innerHTML = "";

    if(document.getElementById("cropBox"))
        document.getElementById("cropBox").remove();

    let selCir = document.createElement("button");
    toolOptions.appendChild(selCir);
    selCir.id = "selCir";
    selCir.textContent = "Select";
    selCir.addEventListener("click", function(){
        if(document.getElementById("cirBox"))
        {
            document.getElementById("cirBox").style.border = "1px solid transparent";

            let corners = document.querySelectorAll(".cirCorner");
            for(let i=0; i<corners.length; i++)
            {
                corners[i].remove();
            }

            selectedArea = [];
            selectedArea[0] = "oval";
        }
    });
});
canva.addEventListener("mousedown", function(e){
    if(ellipseOn==true)
    {
        console.log("Ellipse created !");
        ellipseCreated=true;

        selectedArea = [];
        selectedArea[0] = "oval";

        let c = canva.getBoundingClientRect();
        startX=e.pageX;
        startY=e.pageY;

        ovalDrawn=true;
        image = document.getElementById("image");

        cirBox = document.createElement("div");
        cirBox.id = "cirBox";
        cirBox.style = "width:0px; height:0px; margin-left:"+startX+"px; margin-top:"+startY+"px;";
        image.appendChild(cirBox);

        oval = document.createElement("div");
        cirBox.appendChild(oval);
        oval.id = "oval";

        oval.addEventListener("mousedown", cirBrushStart);
        oval.addEventListener("mousemove", cirBrushContinue);
        oval.addEventListener("click", function(){
            if(paintOn==true && selectedArea[0]=="oval")
            {
                let s = window.getComputedStyle(cirBox);
                let cirW = s.width;
                cirW = cirW.slice(0, -2);
                cirW = parseInt(cirW);
                cirW/=2;

                let cirH = s.height;
                cirH = cirH.slice(0, -2);
                cirH = parseInt(cirH);
                cirH/=2;

                let x = cirBox.offsetLeft-canva.offsetLeft+cirW;
                let y = cirBox.offsetTop-canva.offsetTop+cirH;

                ctx.fillStyle = paintCol;
                ctx.ellipse(x+2, y+2, cirW, cirH, 0, 0, 2*Math.PI);
                ctx.fill();

                ctx2.clearRect(0, 0, canva2.width, canva2.height);
                ctx2.drawImage(canva, canva.width, canva.height);

                editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
                step++;
                console.log("oval paint called");
            }
        });
        document.addEventListener("mouseup", brushOff);
        oval.style = "width:19px; height:19px;";

        cirTopLeft = document.createElement("div");
        cirTopLeft.id = "cirTopLeft";
        cirTopLeft.className = "cirCorner";
        cirBox.appendChild(cirTopLeft);
        cirTopLeft.addEventListener("mousedown", function(e){
            startX = e.pageX;
            startY = e.pageY;
            change = true;

            rectStyle = window.getComputedStyle(cirBox);

            width1 = rectStyle.width;
            width1 = width1.slice(0, -2);
            width1 = parseInt(width1);

            height1 = rectStyle.height;
            height1 = height1.slice(0, -2);
            height1 = parseInt(height1);
        });
        document.addEventListener("mousemove", function(e){
            if(change==true)
            {
                let x = e.pageX;
                let y = e.pageY;

                cirBox.style.width = width1+(startX-x)+"px";
                cirBox.style.height = height1+(startY-y)+"px";

                let style = window.getComputedStyle(cirBox);
                let w = style.width;
                w = w.slice(0, -2);
                w = parseInt(w);
                let h = style.height;
                h = h.slice(0, -2);
                h = parseInt(h);
                oval.style.width = w+"px";
                oval.style.height = h+"px";
            }
        });
        document.addEventListener("mouseup", function(){
            startX = 0;
            startY = 0;
            change = false;
        });

        cirTopRight = document.createElement("div");
        cirTopRight.id = "cirTopRight";
        cirTopRight.className = "cirCorner";
        cirBox.appendChild(cirTopRight);
        cirTopRight.addEventListener("mousedown", function(e){
            startX2 = e.pageX;
            startY2 = e.pageY;
            change2 = true;

            rectStyle = window.getComputedStyle(cirBox);

            width2 = rectStyle.width;
            width2 = width2.slice(0, -2);
            width2 = parseInt(width2);

            height2 = rectStyle.height;
            height2 = height2.slice(0, -2);
            height2 = parseInt(height2);
        });
        document.addEventListener("mousemove", function(e){
            if(change2==true)
            {
                let x = e.pageX;
                let y = e.pageY;

                cirBox.style.width = width2-(startX2-x)+"px";
                cirBox.style.height = height2+(startY2-y)+"px";

                let style = window.getComputedStyle(cirBox);
                let w = style.width;
                w = w.slice(0, -2);
                w = parseInt(w);
                let h = style.height;
                h = h.slice(0, -2);
                h = parseInt(h);
                oval.style.width = w+"px";
                oval.style.height = h+"px";
            }
        });
        document.addEventListener("mouseup", function(){
            startX2 = 0;
            startY2 = 0;
            change2 = false;
        });

        cirBottomLeft = document.createElement("div");
        cirBox.appendChild(cirBottomLeft);
        cirBottomLeft.id = "cirBottomLeft";
        cirBottomLeft.className = "cirCorner";
        cirBottomLeft.addEventListener("mousedown", function(e){
            startX3 = e.pageX;
            startY3 = e.pageY;
            change3 = true;

            rectStyle = window.getComputedStyle(cirBox);

            width3 = rectStyle.width;
            width3 = width3.slice(0, -2);
            width3 = parseInt(width3);

            height3 = rectStyle.height;
            height3 = height3.slice(0, -2);
            height3 = parseInt(height3);
        });
        document.addEventListener("mousemove", function(e){
            if(change3==true)
            {
                let x = e.pageX;
                let y = e.pageY;

                cirBox.style.width = x-startX3+"px";
                cirBox.style.height = y-startY3+"px";

                oval.style.width = (x-startX3)+"px";
                oval.style.height = (y-startY3)+"px";
            }
        });
        document.addEventListener("mouseup", function(){
            startX3 = 0;
            startY3 = 0;
            change3 = false;
        });

        cirBottomRight = document.createElement("div");
        cirBottomRight.id = "cirBottomRight";
        cirBottomRight.className = "cirCorner";
        cirBox.appendChild(cirBottomRight);
        cirBottomRight.addEventListener("mousedown", function(e){
            startX4 = e.pageX;
            startY4 = e.pageY;
            change4 = true;

            rectStyle = window.getComputedStyle(cirBox);

            width4 = rectStyle.width;
            width4 = width4.slice(0, -2);
            width4 = parseInt(width4);

            height4 = rectStyle.height;
            height4 = height4.slice(0, -2);
            height4 = parseInt(height4);
        });
        document.addEventListener("mousemove", function(e){
            if(change4==true)
            {
                let x = e.pageX;
                let y = e.pageY;

                cirBox.style.width = width4-(startX4-x)+"px";
                cirBox.style.height = height4-(startY4-y)+"px";

                let style = window.getComputedStyle(cirBox);
                let w = style.width;
                w = w.slice(0, -2);
                w = parseInt(w);
                let h = style.height;
                h = h.slice(0, -2);
                h = parseInt(h);
                oval.style.width = w+"px";
                oval.style.height = h+"px";
            }
        });
        document.addEventListener("mouseup", function(){
            startX4 = 0;
            startY4 = 0;
            change4 = false;
        });
    }
});
function cirBrushStart(e){
    brushOn=true;

    //let c = canva.getBoundingClientRect();
    let x = e.pageX-canva.offsetLeft;
    let y = e.pageY-canva.offsetTop;

    ctx.lineWidth = document.getElementById("thickness").value;
    ctx.lineCap = "round";
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.stroke();

    ctx2.clearRect(0, 0, canva2.width, canva2.height);
    ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
}
function cirBrushContinue(e){
    if(brushOn==true)
    {
        let c = canva.getBoundingClientRect();
        let x = e.pageX-canva.offsetLeft;
        let y = e.pageY-canva.offsetTop;

        ctx.lineWidth = document.getElementById("thickness").value;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("color").value;
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
        ctx.stroke();

        ctx2.clearRect(0, 0, canva2.width, canva2.height);
        ctx2.drawImage(canva, 0, 0, canva2.width, canva2.height);
    }
}
document.addEventListener("mousemove", resizeCir);
function resizeCir(e){
    if(ellipseOn==true && ovalDrawn==true)
    {
        let c = canva.getBoundingClientRect();
        let x = e.pageX-canva.offsetLeft;
        let y = e.pageY-canva.offsetTop;
        let cirBox1 = document.getElementById("cirBox");
        let oval = document.getElementById("oval");

        cirBox1.style.width = (x-startX)+"px";
        cirBox1.style.height = (y-startY)+"px";

        let style = window.getComputedStyle(cirBox1);
        let w = style.width;
        w = w.slice(0, -2);
        w = parseInt(w);
        let h = style.height;
        h = h.slice(0, -2);
        h = parseInt(h);
        oval.style.width = (w-1)+"px";
        oval.style.height = (h-1)+"px";

        selectedArea = [];
        selectedArea[0] = "oval";
    }
}
document.addEventListener("mouseup", function(e){
    ellipseOn=false;
});

var rotLeft = document.getElementById("rotLeft");
var rotationAngle = 0;
var wi, he, i = 0;
rotLeft.addEventListener("click", rotateImageLeft);
function rotateImageLeft() {
    if (rotationAngle <= -360)
        rotationAngle = -90;
    else
        rotationAngle -= 90;

    if (i == 0) {
        wi = canva.width;
        he = canva.height;
    }
    i++;

    if (rotationAngle % 180 != 0) {
        // Swap width and height if angle is not multiple of 180 degrees
        canva.width = he;
        canva.height = wi;
    } else {
        canva.width = wi;
        canva.height = he;
    }

    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.save();
    ctx.translate(canva.width / 2, canva.height / 2);
    ctx.rotate(rotationAngle * Math.PI / 180);
    ctx.drawImage(canva2, -canva.width / 2, -canva.height / 2, canva.width, canva.height);
    ctx.restore();

    let doneRotation = document.createElement("button");
    doneRotation.addEventListener("click", doneRot);
    toolOptions.innerHTML = "";
    toolOptions.appendChild(doneRotation);
    doneRotation.id = "doneRotation";
    doneRotation.textContent = "Done Rotation";
}
function doneRot()
{
    canva2.width = canva.width;
    canva2.height = canva.height;
    ctx2.drawImage(canva, 0, 0, canva.width, canva.height);

    document.getElementById("doneRotation").remove();
}

var rotRight = document.getElementById("rotRight");
rotRight.addEventListener("click", rotateImageRight);
var j=0;
function rotateImageRight() {
    if (rotationAngle >= 360)
        rotationAngle = 90;
    else
        rotationAngle += 90;

    if (i == 0) {
        wi = canva.width;
        he = canva.height;
    }
    i++;

    if (rotationAngle % 180 != 0) {
        // Swap width and height if angle is not multiple of 180 degrees
        canva.width = he;
        canva.height = wi;
    } else {
        canva.width = wi;
        canva.height = he;
    }

    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.save();
    ctx.translate(canva.width / 2, canva.height / 2);
    ctx.rotate(rotationAngle * Math.PI / 180);
    ctx.drawImage(canva2, -canva.width / 2, -canva.height / 2, canva.width, canva.height);
    ctx.restore();

    let doneRotation = document.createElement("button");
    doneRotation.addEventListener("click", doneRot);
    toolOptions.innerHTML = "";
    toolOptions.appendChild(doneRotation);
    doneRotation.id = "doneRotation";
    doneRotation.textContent = "Done Rotation";
}

var selectAll = document.getElementById("selAll");
selectAll.addEventListener("click", selectAllArea);
function selectAllArea()
{
    if(document.getElementById("rectSel"))
        document.getElementById("rectSel").remove();

    if(document.getElementById("oval"))
        document.getElementById("oval").remove();

    selectedArea = [[0, 0], [canva.width, 0], [canva.width, canva.height], [0, canva.height]];
}

var zoomInOut = document.getElementById("zoomInOut");
zoomInOut.addEventListener("click", zoom);
function zoom()
{
    toolOptions.innerHTML = "";

    let zoomMin = document.createElement("span");
    toolOptions.appendChild(zoomMin);
    zoomMin.id = "zoomMin";
    zoomMin.style = "position:absolute; margin-top:0px; margin-left:-140px; font-size:9pt;";
    let wPer = (canva.width/canva2.width)*100;
    let hPer = (canva.height/canva2.height)*100;
    let bigDimension = Math.max(wPer, hPer);
    zoomMin.innerHTML = parseInt(bigDimension)+"%";

    let zoomBar = document.createElement("input");
    toolOptions.appendChild(zoomBar);
    zoomBar.id = "zoomBar";
    zoomBar.style.width = "110px";
    zoomBar.value = parseInt(wPer);
    zoomBar.setAttribute("type", "range");
    zoomBar.setAttribute("min", 1);
    zoomBar.setAttribute("max", 100);
    zoomBar.addEventListener("input", function(){
        zoomMin.innerHTML = zoomBar.value+"%";
        let newWidth = (zoomBar.value/100)*canva2.width;
        let newHeight = (zoomBar.value/100)*canva2.height;
        canva.width = newWidth;
        canva.height = newHeight;
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
    });

    let zoomMax = document.createElement("span");
    toolOptions.appendChild(zoomMax);
    zoomMax.id = "zoomMax";
    zoomMax.style = "position:absolute; margin-top:0px; margin-left:140px; font-size:9pt;";
    zoomMax.innerHTML = "100%";
}

var filters = document.getElementById("filters");
filters.addEventListener("click", function()
{
    toolOptions.innerHTML = "";

    let minBlur = document.createElement("span");
    toolOptions.appendChild(minBlur);
    minBlur.id = "minBlur";
    minBlur.textContent = "0px";
    let blurText = document.createElement("span");
    toolOptions.appendChild(blurText);
    blurText.id = "blurText";
    blurText.textContent = "Blur";
    let blur = document.createElement("input");
    blur.setAttribute("type", "range");
    toolOptions.appendChild(blur);
    blur.id = "blur";
    blur.setAttribute("min", 0);
    blur.setAttribute("max", 20);
    blur.value = 0;
    if(window.innerWidth<=994)
    {
        toolOptions.style.flexDirection = "column";
        toolBox.style.height = "220px";
    }
    blur.addEventListener("input", function(){
        ctx.filter = "blur("+blur.value+"px)";
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
        minBlur.innerHTML = blur.value+"px";
    });
    blur.addEventListener("change", function(){
        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("blur called");
    });
    let maxBlur = document.createElement("span");
    toolOptions.appendChild(maxBlur);
    maxBlur.id = "maxBlur";
    maxBlur.textContent = "20px";

    let minBright = document.createElement("span");
    toolOptions.appendChild(minBright);
    minBright.id = "minBright";
    minBright.textContent = "100%";
    let brightnessText = document.createElement("span");
    toolOptions.appendChild(brightnessText);
    brightnessText.id = "brightnessText";
    brightnessText.textContent = "Brightness";
    let brightness = document.createElement("input");
    brightness.setAttribute("type", "range");
    toolOptions.appendChild(brightness);
    brightness.id = "brightness";
    brightness.setAttribute("min", 0);
    brightness.setAttribute("max", 200);
    brightness.value = 100;
    brightness.addEventListener("input", function(){
        ctx.filter = "brightness("+brightness.value+"%)";
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
        minBright.innerHTML = brightness.value + "%";
    });
    brightness.addEventListener("change", function(){
        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("brightness history called");
    });
    let maxBright = document.createElement("span");
    toolOptions.appendChild(maxBright);
    maxBright.id = "maxBright";
    maxBright.textContent = "200%";

    let minContrast = document.createElement("span");
    toolOptions.appendChild(minContrast);
    minContrast.id = "minContrast";
    minContrast.textContent = "100%";
    let contrastText = document.createElement("span");
    toolOptions.appendChild(contrastText);
    contrastText.id = "contrastText";
    contrastText.textContent = "Contrast";
    let contrast = document.createElement("input");
    contrast.setAttribute("type", "range");
    toolOptions.appendChild(contrast);
    contrast.id = "contrast";
    contrast.setAttribute("min", 0);
    contrast.setAttribute("max", 200);
    contrast.value = 100;
    contrast.addEventListener("input", function(){
        ctx.filter = "contrast("+contrast.value+"%)";
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
        minContrast.innerHTML = contrast.value + "%";
    });
    contrast.addEventListener("change", function(){
        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("contrast history called");
    });
    let maxContrast = document.createElement("span");
    toolOptions.appendChild(maxContrast);
    maxContrast.id = "maxContrast";
    maxContrast.textContent = "200%";

    let minGray = document.createElement("span");
    toolOptions.appendChild(minGray);
    minGray.id = "minGray";
    minGray.textContent = "0%";
    let grayscaleText = document.createElement("span");
    toolOptions.appendChild(grayscaleText);
    grayscaleText.id = "grayscaleText";
    grayscaleText.textContent = "Grayscale";
    let grayscale = document.createElement("input");
    grayscale.setAttribute("type", "range");
    toolOptions.appendChild(grayscale);
    grayscale.id = "grayscale";
    grayscale.setAttribute("min", 0);
    grayscale.setAttribute("max", 100);
    grayscale.value = 0;
    grayscale.addEventListener("input", function(){
        ctx.filter = "grayscale("+grayscale.value+"%)";
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(canva2, 0, 0, canva.width, canva.height);
        minGray.innerHTML = grayscale.value + "%";
    });
    grayscale.addEventListener("change", function(){
        editHistory.push(ctx.getImageData(0, 0, canva.width, canva.height));
        step++;
        console.log("grayscaled history called");
    });
    let maxGray = document.createElement("span");
    toolOptions.appendChild(maxGray);
    maxGray.id = "maxGray";
    maxGray.textContent = "100%";
});

var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
undo.addEventListener("click", function(){
    if(step>0)
        step--;
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx2.clearRect(0, 0, canva.width, canva.height);
    ctx.putImageData(editHistory[step], 0, 0);
    ctx2.putImageData(editHistory[step], 0, 0);
});
redo.addEventListener("click", function(){
    if(step<editHistory.length-1)
        step++;
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx2.clearRect(0, 0, canva.width, canva.height);
    ctx.putImageData(editHistory[step], 0, 0);
    ctx2.putImageData(editHistory[step], 0, 0);
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