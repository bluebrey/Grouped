<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Get DB context
$mysqli = require __DIR__ . "/database.php";

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        // Prepare and bind db params
        $stmt = $mysqli->prepare("INSERT INTO group_table (invite_flag, group_title, group_desc) VALUES (?,?,?)");
        $stmt->bind_param("iss",  $invite_flag, $group_title, $group_desc);

        $invite_flag = $user->invite_flag;

        $group_title = $user->group_title;
        if (empty($group_title)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Event Title Provided");
            break;
        }

        $group_desc = $user->group_desc;

        if ($stmt->execute()) {
            $group_token = $stmt->insert_id;
            $stmt->close();
            $stmt = $mysqli->prepare("INSERT INTO group_access (group_token, group_title ,user_id, username) VALUES (?,?,?,?)");
            $stmt->bind_param("isis", $group_token,$group_title, $user_id, $username);
            $user_id = $user->user_id;
            if (empty($user_id)){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No User ID Provided");
                break;
            }
            $username = $user->username;
            if (empty($username)){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No Username Provided");
                break;
            }

            if ($stmt->execute()) {
                echo "success";
                header("HTTP/1.1 200 OK");
                break;
            } else {
                echo "failed";
                header("HTTP/1.1 400 BAD REQUEST");
                break;
            }

        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }

    case "GET":
        $stmt = $mysqli->prepare("SELECT * FROM `group_table`");
        $result = $stmt->execute();
        if ($result) {
            //$calanderEvents = $stmt->get_result()->fetch_assoc();
            $groups = mysqli_fetch_all ($stmt->get_result(), MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($groups);
            break;
            
        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }
    case "PUT":
        break;
    case "DELTE":
        break;
}
?>
