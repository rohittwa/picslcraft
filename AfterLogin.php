<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="AfterLogin.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title>PicslCraft</title>
</head>
<body>
    <nav>
        <div id="topBox">
            <a href="AfterLogin.php"><img src="images/picslCraftLogo2.jpg" id="logo"></a>

            <span id="smallMenu">
                <div id="menu2"><img src="Images/menu.png" id="line3"></div>
            </span>

            <span id="menu">
                <a id="services">Services▸</a>
                <span id="serviceOptions">
                    <a href="ImageEditing.html"><li>Image edit</li></a>
                    <a><li>Draw</li></a>
                    <a href="ImageToPDF.php"><li style="margin-top:-30px;">Image to PDF</li></a>
                    <a><li>PDF editor</li></a>
                    <a href="FormatChanger.html"><li>Format changer</li></a>
                    <a href="PDFToImage.html"><li>PDF to Image</li></a>
                </span>

                <a id="about">About▸</a>
                <span id="aboutOptions">
                    <a href="AboutUs.html"><li>About Us</li></a>
                    <a href="Contact.php"><li>Contact</li></a>
                    <a><li>Help</li></a>
                </span>
            </span>

            <span id="account">
                <div id="username">
                    <?php
                        $email = $_COOKIE["email"];
                        $name1 = substr($email, 0, 1);
                        echo "$name1";
                    ?>
                </div>

                <div id="acOptions">
                    <a href="MyAccount.php">My Account</a>
                    <a href="index.php">Logout</a>
                </div>
            </span>
        </div>
    </nav>

    <div id="main">
        <span id="slogan">
            Create Your Imagination Into Reality
        </span>

        <div id="container">
            <span class="material-symbols-outlined" id="leftArrow">
            arrow_back_ios
            </span>
            
            <div id="imgBox">
                <img src="images/matthew-hicks-455505-unsplash (1).jpg" class="sliderImg">
                <img src="images/neon_cityscape_4k.jpg" class="sliderImg">
                <img src="images/retrowave_neon_mustang_driver_5k.jpg" class="sliderImg">
                <img src="images/triumph_bonneville_4k_hd.jpg" class="sliderImg">
                <img src="images/vlad-sorodoc-49620-unsplash.jpg" class="sliderImg">
                <img src="images/pexels-pixabay-302549.jpg" class="sliderImg">
                <img src="images/red_low_poly_abstraction_hd_abstract.jpg" class="sliderImg">
            </div>
            
            <span class="material-symbols-outlined" id="rightArrow">
            arrow_forward_ios
            </span>
        </div>
    </div>

    <div id="intro">
        <span>
        PicslCraft is a digital platform designed to provide users with tools and functionalities to enhance, modify, and manipulate images. These websites cater to a broad spectrum of users, ranging from amateur photographers to professional designers, offering a variety of features to suit different skill levels and requirements.<br><br>

        In a world where visuals play a crucial role in communication and expression, the demand for tools to edit and enhance images has surged dramatically. Our image editing website, named "Editify," emerges as a comprehensive solution tailored to meet the diverse needs of image enthusiasts, photographers, designers, and businesses alike.<br><br>

        <b>Key Features:</b>
        <ol>
            <li>Editing Tools: Editify offers a wide array of editing tools, including cropping, resizing, rotating, and adjusting brightness, contrast, saturation, and sharpness. These tools empower users to transform their images effortlessly.</li>

            <li>
                Filters and Effects: With a rich collection of filters and effects, Editify enables users to add artistic flair to their images. From vintage and retro effects to modern filters and artistic overlays, there's something for every style and preference.
            </li>

            <li>
                Advanced Retouching: For users seeking more advanced editing capabilities, Editify provides tools for retouching portraits, removing blemishes, smoothing skin, and adjusting facial features, ensuring that every portrait looks flawless.
            </li>

            <li>
                Text and Graphics: Users can add text overlays, stickers, icons, and graphics to their images, enhancing their visual impact and storytelling potential. Editify offers a wide selection of fonts, colors, and styles to customize text and graphics according to individual preferences.
            </li>

            <li>
                Image to PDF : Images can be converted to PDF. Any format image can be converted to pdf. Any number of images can be converted to pdf. PDF editing is also possible here.
            </li>
        </ol>
        </span>
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

    <script src="AfterLogin.js"></script>
</body>
</html>