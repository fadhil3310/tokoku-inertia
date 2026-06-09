<?php

namespace App\Email;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Symfony\Component\Console\Output\ConsoleOutput;

class SendEmail
{
    public static function Send(string $senderName, string $senderEmail, string $senderCategory, string $senderDescription, ?string $senderImage): bool
    {
        $console = new ConsoleOutput();

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAILER_EMAIL');
            $mail->Password   = env('MAILER_PASSKEY');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom(env('MAILER_EMAIL'), env('MAILER_EMAIL'));
            $mail->addAddress(env('MAILER_RECEPIENT_EMAIL'), env('MAILER_RECEPIENT_EMAIL'));

            $mail->isHTML(true);
            $mail->Subject = 'Tokoku Support';

            $delimitedDescription =  preg_replace('/\R/', '<br />', $senderDescription);
            $body =  '<h1>Issue reported</h1><p>Name: ' . $senderName . "</p><p>Email: " . $senderEmail . "</p><p>Category: " . $senderCategory . "</p><p>Description: " . $delimitedDescription . "</p>";
            if ($senderImage != null) {
                $mail->addEmbeddedImage(dirname(dirname(__DIR__))  . "/storage/app/public/" . $senderImage, 'image_cid', 'image.png');
                $body = $body . "<p>Image:</p><img src='cid:image_cid'>";
            }
            $mail->Body    = $body;
            $mail->AltBody = $mail->Body;

            $mail->send();
            $console->writeln('Message has been successfully sent!');

            return true;
        } catch (Exception $e) {
            $console->writeln("Message could not be sent. Error: {$mail->ErrorInfo}");

            return false;
        }
    }
}
