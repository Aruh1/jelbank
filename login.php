<?php
session_start();

function buatNamaDariEmail(string $email): string
{
    $lokal = strstr($email, '@', true);
    if ($lokal === false || $lokal === '') {
        $lokal = $email;
    }
    $lokal = str_replace(['.', '_', '-'], ' ', $lokal);
    return ucwords(trim($lokal));
}

$pesanSukses = '';
$pesanError = '';

if (isset($_GET['registered'])) {
    $pesanSukses = 'Registrasi berhasil. Silakan masuk dengan akun barumu.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $pesanError = 'Email dan kata sandi wajib diisi.';
    } else {
        // Praktikum ini belum terhubung ke database, jadi login cukup
        // memastikan kedua kolom terisi. Kalau session belum punya nama
        // (login langsung tanpa daftar dulu), nama pengguna dibuat dari
        // bagian depan alamat emailnya.
        if (empty($_SESSION['nama'])) {
            $_SESSION['nama'] = buatNamaDariEmail($email);
        }
        $_SESSION['email'] = $email;

        header('Location: dashboard.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Masuk - JELBANK</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style/style.css">
</head>
<body>

  <main class="auth">
    <aside class="auth-brand">
      <a href="index.php" class="logo">JELBANK</a>
      <div class="auth-brand-text">
        <p class="auth-tagline">Pantau saldo jelantahmu dari satu akun.</p>
        <p>Masuk untuk setor minyak jelantah, lihat riwayat, dan cek struk digital.</p>
      </div>
      <div class="auth-rate">
        <span>Nilai tukar hari ini</span>
        <strong>Rp 3.000 per liter</strong>
      </div>
    </aside>

    <div class="auth-panel">
      <div class="auth-card">
        <h1>Masuk</h1>
        <p class="auth-sub">Gunakan email dan kata sandi akunmu.</p>

        <?php if ($pesanSukses): ?>
          <p class="auth-alert auth-alert-success"><?= htmlspecialchars($pesanSukses) ?></p>
        <?php endif; ?>
        <?php if ($pesanError): ?>
          <p class="auth-alert auth-alert-error"><?= htmlspecialchars($pesanError) ?></p>
        <?php endif; ?>

        <form action="login.php" method="post">
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="nama@email.com" autocomplete="email" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required>
          </div>
          <div class="field">
            <label for="password">Kata sandi</label>
            <input type="password" id="password" name="password" autocomplete="current-password" required>
          </div>
          <div class="form-meta">
            <label class="check"><input type="checkbox" name="ingat"> Ingat saya</label>
            <a href="#" class="text-link">Lupa kata sandi?</a>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Masuk</button>
        </form>

        <p class="auth-switch">Belum punya akun? <a href="register.php" class="text-link">Daftar</a></p>
      </div>
    </div>
  </main>

</body>
</html>