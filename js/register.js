// ===== JELBANK — interaktivitas register.html =====
// JavaScript murni, tanpa framework atau library luar.

document.addEventListener('DOMContentLoaded', () => {

  /* Toast / Snackbar — konfirmasi singkat sebelum pindah ke halaman masuk */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(pesan, durasi = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = pesan;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, durasi);
  }

  /* Event baru: submit — divalidasi sebelum form benar-benar dikirim,
     bukan event click biasa pada tombolnya. */
  const form = document.getElementById('registerForm');
  const password = document.getElementById('password');
  const konfirmasi = document.getElementById('konfirmasi');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // PopUp Box #2: alert() kalau kata sandi dan konfirmasinya beda.
      if (password.value !== konfirmasi.value) {
        alert('Kata sandi dan konfirmasi kata sandi tidak sama. Coba periksa lagi.');
        konfirmasi.focus();
        return;
      }

      showToast('Pendaftaran berhasil, menuju halaman masuk...');
      setTimeout(() => {
        form.submit();
      }, 700);
    });
  }

});