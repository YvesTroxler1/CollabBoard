<?php
session_start();
require_once('Datenbank.php');

$servername = "mysql2.webland.ch";
$username = "d041e_yvtroxler";
$password = "DB_blj_2023";
$dbname = "d041e_yvtroxler";

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen, ob die Verbindung erfolgreich war
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

if (isset($_POST['Benutzername']) && isset($_POST['Passwort'])) {
    $benutzername = $_POST['Benutzername'];
    $passwort = $_POST['Passwort'];

    $sql = "SELECT * FROM whiteboard WHERE Benutzername = '$benutzername'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Benutzer gefunden, Überprüfung des Passworts
        $row = $result->fetch_assoc();
        if (password_verify($passwort, $row['Passwort'])) {
            // Passwort ist korrekt, Benutzer anmelden
            $_SESSION['benutzerid'] = $row['BenutzerID'];
            header("Location: ../index.html"); // Weiterleitung zur index.html
            exit(); // Wichtig, um sicherzustellen, dass keine weiteren Anweisungen ausgeführt werden
        } else {
            header("Location: ../fehleranmelden.html"); // Weiterleitung zur fehleranmelden.html
            exit();
        }
    } else {
        header("Location: ../fehleranmelden.html"); // Weiterleitung zur fehleranmelden.html
        exit();
    }
} else {
    echo "Benutzername und Passwort müssen übermittelt werden.";
}

// Verbindung zur Datenbank schließen
$conn->close();
?>