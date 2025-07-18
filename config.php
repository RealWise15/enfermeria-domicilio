<?php
$host = "localhost";
$usuario = "c2790807_contact";  // Cambia esto si usas otro usuario
$clave = "fukada57FU";        // Agrega tu contraseña si es necesaria
$base_datos = "c2790807_contact";

$conn = new mysqli($host, $usuario, $clave, $base_datos);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
