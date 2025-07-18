<?php
require 'config.php'; // Conexión a la base de datos

// Verificar si es una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["formulario"]) && $_POST["formulario"] == "contacto") {
        procesarContacto($conn);
    } else {
        echo "❌ Error: Formulario no reconocido.";
    }
}

function procesarContacto($conn) {
    // Obtener los datos del formulario de contacto
    $nombre = $conn->real_escape_string($_POST["nombre"]);
    $apellido = $conn->real_escape_string($_POST["apellido"]);
    $email = $conn->real_escape_string($_POST["email"]);
    $telefono = $conn->real_escape_string($_POST["telefono"]);
    $servicio = $conn->real_escape_string($_POST["servicio"]);
    $paciente = $conn->real_escape_string($_POST["paciente"]);
    $mensaje = $conn->real_escape_string($_POST["mensaje"]);

    // Insertar en la base de datos
    $sql = "INSERT INTO contactos (nombre, apellido, email, telefono, servicio, paciente, mensaje) 
            VALUES ('$nombre', '$apellido', '$email', '$telefono', '$servicio', '$paciente', '$mensaje')";
    
    if ($conn->query($sql) === TRUE) {
        // Configurar destinatario
        $para = "info@enfermeriadomicilio.com.ar"; // ⚠️ CAMBIAR POR TU EMAIL REAL
        $asunto = "🩺 Nueva Consulta de Servicios - $nombre $apellido";

        // Cuerpo del email en HTML
        $contenido = "
        <html>
        <head>
            <title>Nueva Consulta de Servicios</title>
            <style>
                body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; }
                .container { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1); }
                h2 { color: #0077cc; }
                .info { margin-bottom: 10px; font-size: 16px; }
                .footer { margin-top: 20px; font-size: 14px; color: #777; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>📩 Nueva Consulta Recibida</h2>
                <p class='info'><strong>👤 Nombre:</strong> $nombre $apellido</p>
                <p class='info'><strong>📧 Correo:</strong> <a href='mailto:$email'>$email</a></p>
                <p class='info'><strong>📞 Teléfono:</strong> $telefono</p>
                <p class='info'><strong>🩺 Servicio solicitado:</strong> $servicio</p>
                <p class='info'><strong>👨‍👩‍👧‍👦 Parentesco del paciente:</strong> $paciente</p>
                <p class='info'><strong>📝 Mensaje:</strong><br>$mensaje</p>
                <hr>
                <p class='footer'>📍 Este mensaje fue generado automáticamente desde el sitio web de Enfermería a Domicilio.</p>
            </div>
        </body>
        </html>";

        // Cabeceras del correo para HTML
        $cabeceras  = "MIME-Version: 1.0" . "\r\n";
        $cabeceras .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $cabeceras .= "From: $email" . "\r\n";
        $cabeceras .= "Reply-To: $email" . "\r\n";

        // Enviar correo
        if (mail($para, $asunto, $contenido, $cabeceras)) {
            echo "success";
        } else {
            echo "❌ Error al enviar el correo.";
        }
    } else {
        echo "❌ Error SQL: " . $conn->error;
    }
}

$conn->close();
?>
