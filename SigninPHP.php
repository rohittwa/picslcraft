<?php
    if(isset($_POST["submitt"]))
    {
        $conn = mysqli_connect("localhost", "root", "rohit7902", "picslcraft");
        $nam = $_POST["name"];
        $emai = $_POST["email"];
        $pas = $_POST["pass"];
        $cpas = $_POST["cpass"];

        if(!$conn){
            die("Failed to connect". mysqli_connect_error());
        }
        else{
            $exp1 = preg_match("/^[a-zA-Z\s]{8,40}$/", $nam);
            $exp2 = preg_match("/^[a-zA-Z\d_#]{5,20}@[a-z]{4,10}\.[a-z]{2,6}$/", $emai);
            $exp3 = preg_match("/^[a-zA-Z\d@$#]{6,16}$/", $pas);
    
            if($exp1==1 && $exp2==1 && $exp3==1 && $pas==$cpas)
            {
                $sql = "INSERT INTO accounts (`full_name`, `email`, `password`) VALUES('$nam', '$emai', '$pas')";
                mysqli_query($conn, $sql);
                mysqli_close($conn);
                echo "<script>alert('Signin Successful')</script>";
                exit(); // After redirection, exit the script to prevent further execution.
            }
            else{
                echo "<script>alert('Signin Failed')</script>";
                mysqli_close($conn);
            }
        }
    }
?>