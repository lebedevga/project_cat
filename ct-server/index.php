<?php
if (isset($_SERVER["HTTP_ORIGIN"]) === true) {
    $host = $_SERVER["HTTP_ORIGIN"];
    //список допустимых хостов
    $allowHosts = array("http://site-with-ct-code.ru", "http://site-with-ct-code2.ru", "http://site-with-ct-code3.ru");
    if (in_array($host, $allowHosts, true) === true) {
        header('Access-Control-Allow-Origin: ' . $host);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Content-Type');
        $phone = $_POST["phone"];
        $ct_user = $_POST["ct_user"];
        $gid = $_POST["gid"];
        $refer = $_POST["ref"];
        $page = $_POST["page"];
        if ($gid) {
            $pos = strpos($gid, '.', strpos($gid, '.') + 1);
            $gid = substr($gid, $pos + 1);
        }
        $conn = new mysqli("localhost", "root", "", "calltracking");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        if ($_POST['method'] == 'get_num_first') {
            $sql = "SELECT * FROM `ct` where `host` = '" . $host . "' and `refer` = '" . $refer . "' and `utm` = '" . $page . "'  ORDER BY RAND() LIMIT 1 ";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    print_r($row["phone"]);
                    $event = file_get_contents('https://www.google-analytics.com/collect?v=1&tid=UA-12345678-1&cid=' . $gid . '&t=event&ec=GetNumber&ea=number&z=' . $row["phone"] . '');
                    //print_r($event);
                }
            } else {
                //echo "0 results";
                $sql = "SELECT * FROM `ct` where `host` = '" . $host . "' and `refer` = '" . $refer . "' ORDER BY RAND() LIMIT 1 ";
                $result = $conn->query($sql);
                print_r($row["phone"]);
            }
        } else if ($_POST['method'] == 'get_num') {
            $sql = "INSERT INTO `numbers` (`phone`, `ct_user`, `gid`, `refer`,`page`) VALUES ( '" . $phone . "', '" . $ct_user . "', '" . $gid . "', '" . $refer . "', '" . $page . "');";
            $result = $conn->query($sql);
            $sql = "SELECT * FROM `numbers` where `ct_user` = '" . $ct_user . "'  ORDER BY `id` DESC LIMIT 1 ";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    print_r($row["phone"]);
                    $event = file_get_contents('https://www.google-analytics.com/collect?v=1&tid=UA-12345678-1&cid=' . $gid . '&t=event&ec=ShowNumber&ea=number&z=' . $row["phone"] . '');
                    //print_r($event);
                }
            } else {
              //echo "0 results";
            }
        }
        $conn->close();
    }
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        exit;
    }
}
?>
