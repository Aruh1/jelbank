<?php
session_start();

$errors = [];
$old = ['nama' => '', 'email' => '', 'hp' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = trim($_POST['nama'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $hp = trim($_POST['hp'] ?? '');
    $password = $_POST['password'] ?? '';
    $konfirmasi = $_POST['konfirmasi'] ?? '';

    $old = ['nama' => $nama, 'email' => $email, 'hp' => $hp];

    if ($nama === '' || $email === '' || $hp === '' || $password === '') {
        $errors[] = 'Semua kolom wajib diisi.';
    }
    if ($password !== '' && strlen($password) < 8) {
        $errors[] = 'Kata sandi minimal 8 karakter.';
    }
    if ($password !== $konfirmasi) {
        $errors[] = 'Kata sandi dan konfirmasi kata sandi tidak sama.';
    }

    if (!$errors) {
        // Praktikum ini belum terhubung ke database, jadi data akun
        // disimpan sementara ke session supaya bisa dipakai di
        // halaman lain (lihat login.php dan dashboard.php).
        $_SESSION['nama'] = $nama;
        $_SESSION['email'] = $email;

        header('Location: login.php?registered=1');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar - JELBANK</title>
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
        <p class="auth-tagline">Satu akun, semua setoran tercatat.</p>
        <p>Daftar sekali, lalu setor minyak jelantah kapan saja lewat web.</p>
      </div>
      <div class="auth-rate">
        <span>Nilai tukar hari ini</span>
        <strong>Rp 3.000 per liter</strong>
      </div>
    </aside>

    <div class="auth-panel">
      <div class="auth-card">
        <h1>Daftar akun</h1>
        <p class="auth-sub">Isi data diri untuk mulai menyetor minyak jelantah.</p>

        <?php if ($errors): ?>
          <div class="auth-alert auth-alert-error">
            <ul>
              <?php foreach ($errors as $pesan): ?>
                <li><?= htmlspecialchars($pesan) ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>

        <form action="register.php" method="post" id="registerForm">
          <div class="field">
            <label for="nama">Nama lengkap</label>
            <input type="text" id="nama" name="nama" autocomplete="name" value="<?= htmlspecialchars($old['nama']) ?>" required>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="nama@email.com" autocomplete="email" value="<?= htmlspecialchars($old['email']) ?>" required>
          </div>
          <div class="field">
            <label for="hp">Nomor HP</label>
            <input type="tel" id="hp" name="hp" placeholder="08xxxxxxxxxx" autocomplete="tel" value="<?= htmlspecialchars($old['hp']) ?>" required>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="password">Kata sandi</label>
              <input type="password" id="password" name="password" autocomplete="new-password" minlength="8" required>
              <span class="field-hint">Minimal 8 karakter.</span>
            </div>
            <div class="field">
              <label for="konfirmasi">Konfirmasi kata sandi</label>
              <input type="password" id="konfirmasi" name="konfirmasi" autocomplete="new-password" minlength="8" required>
            </div>
          </div>
          <div class="form-meta">
            <label class="check"><input type="checkbox" name="setuju" required> Saya setuju dengan syarat dan ketentuan JELBANK.</label>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Daftar akun</button>
        </form>

        <p class="auth-switch">Sudah punya akun? <a href="login.php" class="text-link">Masuk</a></p>
      </div>
    </div>
  </main>

  <div class="toast-container" id="toastContainer" aria-live="polite"></div>

  <script src="js/register.js" defer></script>
</body>
</html>