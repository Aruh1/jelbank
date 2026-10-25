<?php
session_start();

// Kosongkan semua data session (nama, email, dll).
$_SESSION = [];

// Hapus juga cookie session di browser supaya benar-benar bersih.
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'],
        $params['secure'],
        $params['httponly']
    );
}

session_destroy();

header('Location: index.php');
exit;