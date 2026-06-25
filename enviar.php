<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);

$mail->CharSet = 'UTF-8';

try {
    // DATOS DEL FORMULARIO
    $nombre = $_POST['nombre'];
    $empresa = $_POST['empresa'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $servicio = $_POST['servicio'];
    $descripcion = $_POST['descripcion'];

    // CONFIGURACIÓN SMTP (ZOHO)
    $mail->isSMTP();
    $mail->Host = 'smtp.zoho.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'direccion.dm@fadiem.com';
    $mail->Password = 'Trabajo0101$'; // 👈 cámbiala
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // REMITENTE Y DESTINO
    $mail->setFrom('direccion.dm@fadiem.com', 'FADIEM Web');
    $mail->addAddress('direccion.dm@fadiem.com');
    $mail->addReplyTo($correo, $nombre);

    // CONTENIDO
    $mail->isHTML(true);
    $mail->Subject = 'Nueva cotización desde la web';

    $mail->Body = "
        <h3>Nueva solicitud de cotización</h3>
        <p><b>Nombre:</b> $nombre</p>
        <p><b>Empresa:</b> $empresa</p>
        <p><b>Teléfono:</b> $telefono</p>
        <p><b>Correo:</b> $correo</p>
        <p><b>Servicio:</b> $servicio</p>
        <p><b>Descripción:</b><br>$descripcion</p>
    ";

    $mail->send();

    echo "<script>alert('Cotización enviada correctamente'); window.location.href='index.html';</script>";

} catch (Exception $e) {
    echo "Error al enviar: {$mail->ErrorInfo}";
}