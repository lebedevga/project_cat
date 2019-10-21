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
    }
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        exit;

    }
}
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
print ("<pre>" . print_r($data, true) . "</pre>");
?>
