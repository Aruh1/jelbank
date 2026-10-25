// ===== JELBANK — interaktivitas index.html =====
// JavaScript murni, tanpa framework atau library luar.

document.addEventListener('DOMContentLoaded', () => {

  /* 1) Toggle menu mobile (hamburger) — manipulasi DOM #1 */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Tutup menu begitu salah satu link nav diklik
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 2) Header dapat bayangan saat halaman discroll — manipulasi DOM #2 */
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

  /* 3) Kalkulator cepat nilai tukar — manipulasi DOM #3 */
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
    simpanKalkulasiTerakhir();
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', hitungSaldo);
  }

  // Event baru #1: change pada dropdown jenis -> hitung ulang otomatis
  // kalau volume sudah diisi, tanpa perlu klik tombol lagi.
  calcJenis.addEventListener('change', () => {
    if (calcVolume.value) hitungSaldo();
  });

  // Event baru #2: keydown -> tekan Enter di kolom volume langsung
  // menghitung, tidak perlu mengarahkan mouse ke tombol Hitung.
  calcVolume.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      hitungSaldo();
    }
  });

  // Event baru #3: focus & blur -> beri highlight pada kotak kalkulator
  // selagi salah satu kolomnya sedang diisi.
  const calcBox = document.querySelector('.calc');
  [calcJenis, calcVolume].forEach((input) => {
    input.addEventListener('focus', () => calcBox.classList.add('focused'));
    input.addEventListener('blur', () => calcBox.classList.remove('focused'));
  });

  /* 4) Toast / Snackbar — manipulasi DOM #4 */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(pesan, durasi = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = pesan;
    toastContainer.appendChild(toast);

    // Beri jeda satu frame supaya transisi CSS sempat berjalan
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, durasi);
  }

  /* 5) Tampilkan toast sebelum menuju halaman daftar — manipulasi DOM #5 */
  document.querySelectorAll('a[href="register.php"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Menuju halaman daftar akun...');
      setTimeout(() => {
        window.location.href = link.getAttribute('href');
      }, 700);
    });
  });

  /* 6) Fetch + async/await (Promise) — ambil data nilai tukar dari
     rates.json dan pakai untuk mengisi dropdown kalkulator secara
     dinamis, bukan dari angka yang ditulis manual di HTML. */
  async function loadRates() {
    try {
      const response = await fetch('rates.json');
      if (!response.ok) throw new Error('Gagal memuat rates.json');
      const data = await response.json();

      calcJenis.innerHTML = '';
      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.harga;
        option.textContent = item.label + ' (' + formatRupiah(item.harga) + '/L)';
        calcJenis.appendChild(option);
      });
    } catch (error) {
      // Fetch file lokal gagal kalau index.html dibuka langsung lewat
      // file:// (bukan lewat web server seperti Laragon). Opsi bawaan
      // yang sudah ada di HTML tetap dipakai sebagai cadangan, supaya
      // kalkulator tetap jalan walau fetch gagal.
      console.warn('Fetch rates.json gagal, pakai opsi bawaan:', error.message);
    }

    pulihkanKalkulasiTerakhir();
  }

  /* 7) Web Storage — simpan dan pulihkan kalkulasi terakhir supaya
     tidak hilang saat halaman di-refresh atau dibuka lagi nanti. */
  function simpanKalkulasiTerakhir() {
    const data = { jenis: calcJenis.value, volume: calcVolume.value };
    localStorage.setItem('jelbankLastCalc', JSON.stringify(data));
  }

  function pulihkanKalkulasiTerakhir() {
    const saved = localStorage.getItem('jelbankLastCalc');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data.jenis) calcJenis.value = data.jenis;
      if (data.volume) {
        calcVolume.value = data.volume;
        hitungSaldo();
      }
    } catch (error) {
      console.warn('Data kalkulasi tersimpan tidak valid:', error.message);
    }
  }

  loadRates();

});