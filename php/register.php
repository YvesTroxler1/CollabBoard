<?php
session_start();
require_once('Datenbank.php');

// Verbindung zur Datenbank herstellen
$servername = "mysql2.webland.ch"; // Hostname deines Servers (meistens localhost)
$username = "d041e_yvtroxler"; // Dein MySQL-Benutzername
$password = "DB_blj_2023"; // Dein MySQL-Passwort
$dbname = "d041e_yvtroxler";

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);
// Überprüfen, ob die Verbindung erfolgreich war
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Benutzername und Passwort aus dem Formular
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];

    // Passwort verschlüsseln (es wird empfohlen, password_hash zu verwenden)
    $verschluesseltes_passwort = password_hash($passwort, PASSWORD_DEFAULT);

    // SQL-Befehl zum Einfügen des Benutzers in die Datenbank
    $sql = "INSERT INTO whiteboard (Benutzername, Passwort) VALUES ('$benutzername', '$verschluesseltes_passwort')";

    if ($conn->query($sql) === TRUE) {
        echo "Registrierung erfolgreich!";
    } else {
        echo "Fehler bei der Registrierung: " . $conn->error;
    }
}

// Verbindung zur Datenbank schließen
$conn->close();
?>