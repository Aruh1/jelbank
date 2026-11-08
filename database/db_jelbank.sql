-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2026 at 07:14 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tb_jelbank`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_jenis_minyak`
--

CREATE TABLE `tb_jenis_minyak` (
  `id_jenis` int NOT NULL,
  `nama_jenis` varchar(50) NOT NULL,
  `harga_per_liter` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_jenis_minyak`
--

INSERT INTO `tb_jenis_minyak` (`id_jenis`, `nama_jenis`, `harga_per_liter`) VALUES
(1, 'Jelantah bersih', 3000),
(2, 'Jelantah bercampur air', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_nasabah`
--

CREATE TABLE `tb_nasabah` (
  `id_nasabah` int NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `saldo` int DEFAULT '0',
  `tgl_daftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_nasabah`
--

INSERT INTO `tb_nasabah` (`id_nasabah`, `nama`, `email`, `password`, `no_hp`, `saldo`, `tgl_daftar`) VALUES
(1, 'Siti Aminah', 'siti.aminah@email.com', 'rahasia123', '081234567801', 46000, '2026-09-01');

-- --------------------------------------------------------

--
-- Table structure for table `tb_pencairan`
--

CREATE TABLE `tb_pencairan` (
  `id_pencairan` int NOT NULL,
  `id_nasabah` int DEFAULT NULL,
  `metode` varchar(30) NOT NULL,
  `nomor` varchar(30) NOT NULL,
  `status` varchar(20) DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_pencairan`
--

INSERT INTO `tb_pencairan` (`id_pencairan`, `id_nasabah`, `metode`, `nomor`, `status`) VALUES
(1, 1, 'Bank BCA', '1231 1231 4417', 'Utama'),
(2, 1, 'GoPay', '0812-1234-5678', 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `tb_setoran`
--

CREATE TABLE `tb_setoran` (
  `id_setoran` int NOT NULL,
  `id_nasabah` int DEFAULT NULL,
  `id_jenis` int DEFAULT NULL,
  `no_transaksi` varchar(20) DEFAULT NULL,
  `volume` decimal(6,2) NOT NULL,
  `saldo_masuk` int NOT NULL,
  `tanggal` date NOT NULL,
  `status` varchar(20) DEFAULT 'Berhasil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_setoran`
--

INSERT INTO `tb_setoran` (`id_setoran`, `id_nasabah`, `id_jenis`, `no_transaksi`, `volume`, `saldo_masuk`, `tanggal`, `status`) VALUES
(1, 1, 1, 'JB-260926-0318', 3.00, 9000, '2026-09-26', 'Berhasil'),
(2, 1, 2, 'JB-260919-0274', 2.00, 4000, '2026-09-19', 'Berhasil'),
(3, 1, 1, 'JB-260912-0221', 4.00, 12000, '2026-09-12', 'Berhasil'),
(4, 1, 1, 'JB-260905-0163', 5.00, 15000, '2026-09-05', 'Berhasil'),
(5, 1, 1, 'JB-260829-0107', 2.00, 6000, '2026-08-29', 'Berhasil');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_jenis_minyak`
--
ALTER TABLE `tb_jenis_minyak`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `tb_nasabah`
--
ALTER TABLE `tb_nasabah`
  ADD PRIMARY KEY (`id_nasabah`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tb_pencairan`
--
ALTER TABLE `tb_pencairan`
  ADD PRIMARY KEY (`id_pencairan`),
  ADD KEY `id_nasabah` (`id_nasabah`);

--
-- Indexes for table `tb_setoran`
--
ALTER TABLE `tb_setoran`
  ADD PRIMARY KEY (`id_setoran`),
  ADD UNIQUE KEY `no_transaksi` (`no_transaksi`),
  ADD KEY `id_nasabah` (`id_nasabah`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_jenis_minyak`
--
ALTER TABLE `tb_jenis_minyak`
  MODIFY `id_jenis` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_nasabah`
--
ALTER TABLE `tb_nasabah`
  MODIFY `id_nasabah` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_pencairan`
--
ALTER TABLE `tb_pencairan`
  MODIFY `id_pencairan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_setoran`
--
ALTER TABLE `tb_setoran`
  MODIFY `id_setoran` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_pencairan`
--
ALTER TABLE `tb_pencairan`
  ADD CONSTRAINT `tb_pencairan_ibfk_1` FOREIGN KEY (`id_nasabah`) REFERENCES `tb_nasabah` (`id_nasabah`);

--
-- Constraints for table `tb_setoran`
--
ALTER TABLE `tb_setoran`
  ADD CONSTRAINT `tb_setoran_ibfk_1` FOREIGN KEY (`id_nasabah`) REFERENCES `tb_nasabah` (`id_nasabah`),
  ADD CONSTRAINT `tb_setoran_ibfk_2` FOREIGN KEY (`id_jenis`) REFERENCES `tb_jenis_minyak` (`id_jenis`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
