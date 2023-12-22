<?php
$servername ="mysql2.webland.ch"; // Hostname deines Servers (meistens localhost)
$username = "d041e_yvtroxler"; // Dein MySQL-Benutzername
$password = "DB_blj_2023"; // Dein MySQL-Passwort
$dbname = "d041e_yvtroxler";


// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);
// Überprüfen, ob die Verbindung erfolgreich war
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}


?>