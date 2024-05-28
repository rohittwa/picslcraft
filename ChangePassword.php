<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="ChangePassword.css">
    <title>Change Password</title>
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
                    <a><li>Draw</li></a>
                    <a href="ImageToPDF.php"><li style="margin-top:-30px;">Image to PDF</li></a>
                    <a><li>PDF editor</li></a>
                    <a href="FormatChanger.html"><li>Format changer</li></a>
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

    <p id="main"><b>Welcome,</b>
    <?php
        $conn = mysqli_connect("localhost", "root", "rohit7902", "picslcraft");
        $email = $_COOKIE["email"];
        $sql = "SELECT * FROM accounts WHERE `email`='$email';";
        $getData = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($getData);
        $username="";
        if(!empty($row))
        {
            $username=$row["full_name"];
        }

        echo $username."<br>";
        echo $email;
    ?>
    </p>
    <div id="form">
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <input type="password" name="pass" placeholder="Enter new password"><br>
            <input type="submit" name="submit" value="Save">
        </form>
    </div>
    <?php
        if(isset($_POST["submit"]))
        {
            $newPass = $_POST["pass"];
            $updatePass = "UPDATE accounts SET `password`='$newPass' WHERE `email`='$email';";
            if(mysqli_query($conn, $updatePass))
            {
                echo "<script>alert('Your password changed.');</script>";
            }
            else{
                echo "<script>alert('Sorry Password couldn't change!');</script>";
            }
            mysqli_close($conn);
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

    <script src="MyAccount.js"></script>
</body>
</html>