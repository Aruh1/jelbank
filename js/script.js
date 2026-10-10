document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  if (header) {
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
  const calcBtn = document.getElementById('calcBtn');
  const calcJenis = document.getElementById('calcJenis');
  const calcVolume = document.getElementById('calcVolume');
  const calcResult = document.getElementById('calcResult');
  function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
  }
  function hitungSaldo() {
    const harga = Number(calcJenis.value);
    const volume = Number(calcVolume.value);
    if (!volume || volume <= 0) {
      calcResult.textContent = 'Masukkan volume yang valid untuk melihat perkiraan saldo.';
      return;
    }
    const saldo = harga * volume;
    calcResult.innerHTML =
      'Perkiraan saldo masuk: <span class="amount">' + formatRupiah(saldo) + '</span>';
    showToast('Perkiraan saldo: ' + formatRupiah(saldo));
  }
  if (calcBtn) {
    calcBtn.addEventListener('click', hitungSaldo);
  }
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
  document.querySelectorAll('a[href="register.html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Menuju halaman daftar akun...');
      setTimeout(() => {
        window.location.href = link.getAttribute('href');
      }, 700);
    });
  });
});