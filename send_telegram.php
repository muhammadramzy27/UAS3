<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Token bot Telegram Anda
    $token = "7821297233:AAELci8-I2sVWtMZqhO38VTFDICfYKpXOL4"; // Ganti dengan token bot Anda
    $chat_id = "1619644275"; // Ganti dengan chat ID Anda

    // Format pesan
    $text = "New Contact Form Submission:\n";
    $text .= "👤 Name: $full_name\n";
    $text .= "📧 Email: $email\n";
    $text .= "📞 Mobile: $mobile\n";
    $text .= "📝 Subject: $subject\n";
    $text .= "💬 Message: $message";

    // Kirim pesan ke Telegram
    $url = "https://api.telegram.org/bot$token/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $text,
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid Request!";
}
?>
