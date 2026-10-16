// ===== JELBANK — interaktivitas dashboard.html =====
// JavaScript murni, tanpa framework atau library luar.

document.addEventListener('DOMContentLoaded', () => {

  /* Toast / Snackbar — dipakai untuk konfirmasi setelah data dihapus */
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

  /* PopUp Box #1: confirm() sebelum baris data dihapus — dipasang di
     semua tombol Hapus, baik di tabel Riwayat Setoran maupun Metode
     Pencairan Saldo. */
  document.querySelectorAll('.action-links .delete').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const row = link.closest('tr');
      const label = row ? row.querySelector('td').textContent : 'data ini';
      const yakin = confirm('Yakin ingin menghapus ' + label + '?');

      if (!yakin || !row) return;

      // Beri transisi memudar sebelum baris benar-benar dihapus dari DOM
      row.style.transition = 'opacity 0.25s ease';
      row.style.opacity = '0';
      setTimeout(() => {
        row.remove();
        showToast('Data berhasil dihapus.');
      }, 250);
    });
  });

});