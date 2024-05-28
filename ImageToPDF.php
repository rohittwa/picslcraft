<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="ImageToPDF.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha512-cLuyDTDg9CSseBSFWNd4wkEaZ0TBEpclX0zD3D6HjI19pO39M58AgJ1SjHp6c7ZOp0/OCRcC2BCvvySU9KJaGw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Image To PDF</title>
</head>
<body>
    <nav>
        <div id="topBox">
            <a href="index.php"><img src="images/picslCraftLogo2.jpg" id="logo"></a>

            <span id="smallMenu">
                <div id="menu2"><img src="Images/menu.png" id="line3"></div>
            </span>

            <span id="menu">
                <a id="services">Services▸</a>
                <span id="serviceOptions">
                    <a href="ImageEditing.html"><li>Image edit</li></a>
                    <a href="ImageToPDF.php"><li>Image to PDF</li></a>
                    <a href="FormatChanger.html"><li style="margin-top:-30px;">Format changer</li></a>
                    <a href="PDFToImage.html"><li>PDF to Image</li></a>
                </span>

                <a id="about">About▸</a>
                <span id="aboutOptions">
                    <a href="AboutUs.html"><li>About Us</li></a>
                    <a href="Login.php"><li>Contact</li></a>
                    <a><li style="margin-top:-30px;">Help</li></a>
                </span>
            </span>

            <span id="account">
                <a href="Login.php" id="login">Login</a>
                <a href="Signin.html" id="signin">Signin</a>
            </span>

            <div id="menu2nd">
                <a id="services2">Services▸</a>
                <a id="about2">About▸</a>
                <a href="Login.php" id="login2">Login</a>
                <a href="Signin.html" id="signin2">Signin</a>
            </div>
            <span id="serviceOptions2">
                <a href="ImageEditing.html"><li>Image edit</li></a>
                <a href="ImageToPDF.php"><li>Image to PDF</li></a>
                <a href="FormatChanger.html"><li>Format changer</li></a>
                <a href="PDFToImage.html"><li>PDF to Image</li></a>
            </span>
            <span id="aboutOptions2">
                <a href="AboutUs.html"><li>About Us</li></a>
                <a href="Login.php"><li>Contact</li></a>
                <a><li>Help</li></a>
            </span>
        </div>
    </nav>

    <div id="box1">
        <input type="file" id="images" accept=".jpg, .jpeg, .png" multiple>
    </div>
    <br><br>
    <div id="imgContainer"></div>
    <div id="box3">
        <button id="download" onclick="savePdf()">Download PDF</button>
    </div>

    <div id="footer">
        <div id="cBox">
            <span id="menu2">
                <table>
                    <tr>
                        <th>Services</th>
                        <th class="c2">About</th>
                    </tr>

                    <tr>
                        <td>Image Edit</td>
                        <td class="c2">About Us</td>
                    </tr>

                    <tr>
                        <td>Draw</td>
                        <td class="c2">Contact</td>
                    </tr>

                    <tr>
                        <td>Image to PDF</td>
                        <td class="c2">Help</td>
                    </tr>

                    <tr>
                        <td>PDF editing</td>
                        <td class="c2"></td>
                    </tr>

                    <tr>
                        <td>Format changing</td>
                        <td class="c2"></td>
                    </tr>
                </table>
            </span>

            <span id="follow">
                <div id="icons">
                    <img src="images/facebook.png">
                    <img src="images/linkedin.png">
                    <img src="images/gmail.png">
                    <img src="images/instagram.png">
                    <img src="images/youtube.png">
                    <img src="images/twitter.png">
                </div>

                <div id="tp">
                    <span>Terms of Services</span>
                    <span id="priv">Privacy Policy</span>
                </div><br><br><br>
            </span>

            <div id="copy">Copyright &copy 2023-2024 Rohit Company All rights reserved.</div>
        </div>
    </div>

    <script src="ImageToPDF.js"></script>
</body>
</html>