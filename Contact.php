<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Contact.css">
    <title>Contact</title>
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
                    <a><li style="margin-top:-30px;">Help</li></a>
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
        <span id="info">
            <h2>Contact Us</h2>

            <p>Your can contact us freely and ask about any queries in your mind. Your query will be answered in 2 to 3 days.</p>

            <div><img src="Images/phone-solid.svg" class="icon">+91 9914398686, +91 8847482208</div>

            <div><img src="Images/envelope-regular.svg" class="icon">rohitt7902@gmail.com</div>

            <div><img src="Images/location-dot-solid.svg" class="icon">#1762-B, Dhanas, Chandigarh</div>
        </span>

        <span id="message">
            <h2>Message</h2>

            <form id="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                <textarea name="mess" id="texta"></textarea><br>
                <input type="submit" id="submit" name="submit">
            </form>
        </span>
    </div>

    <?php
        if(isset($_POST["submit"]))
        {
            $conn = mysqli_connect("localhost", "root", "rohit7902", "picslcraft");
            $email = $_COOKIE["email"];
            $mess = $_POST["mess"];
            $sql = "INSERT INTO messages VALUES('$email', '$mess');";
            if(mysqli_query($conn, $sql))
            {
                echo "<script>alert('Thankyou for contacting us.');</script>";
            }
            else{
                echo "<script>alert('Message couldn't be sent!');</script>";
            }
        }
    ?>

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

    <script src="Contact.js"></script>
</body>
</html>