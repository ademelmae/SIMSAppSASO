-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2024 at 06:12 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `disciplinaryaction`
--

CREATE TABLE `disciplinaryaction` (
  `id` int(11) NOT NULL,
  `violationId` int(11) NOT NULL,
  `offenseLevel` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `disciplinaryaction`
--

INSERT INTO `disciplinaryaction` (`id`, `violationId`, `offenseLevel`, `description`) VALUES
(1, 1, '1st', 'Marked in the teacher\'s class record'),
(2, 1, '2nd', 'Verbal Reprimand with marked in the teacher\'s class record'),
(3, 1, '3rd', 'Marked absent in the teacher\'s class record'),
(4, 2, '1st', 'Marked in the teacher\'s class record'),
(5, 2, '2nd', 'Excuse letter noted by Parent or Guardian'),
(6, 2, '3rd', 'Excuse letter noted by Parent or Guardian and with verbal warning from the teacher'),
(7, 2, '4th', 'Excuse letter noted by Parent or Guardian and with verbal warning from the teacher'),
(8, 2, '5th', 'Excuse letter noted by Parent or Guardian and with verbal warning from the teacher'),
(9, 2, '6th', 'Excuse letter noted by Parent or Guardian and with verbal warning from the teacher'),
(10, 2, '7th', 'Permit-for-Readmission from the Discipline Coordinator, Guidance Counselor, and parent or guardian, to be certified by the Dean concerned and to be approved by the Vice-President on Academic Affairs'),
(11, 2, '8th', 'Dropping from the class (subject) when the number of hours of absence reaches 10% of total class hours');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentId` int(11) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `middlename` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `birthdate` text NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `province` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `barangay` varchar(250) NOT NULL,
  `street` varchar(250) NOT NULL,
  `zip` int(11) NOT NULL,
  `studentIdNum` varchar(50) NOT NULL,
  `department` varchar(250) NOT NULL,
  `course` varchar(250) NOT NULL,
  `parentName` varchar(250) NOT NULL,
  `parentEmail` varchar(250) NOT NULL,
  `parentHome` varchar(250) NOT NULL,
  `parentContact` varchar(50) NOT NULL,
  `yearLevel` varchar(250) NOT NULL,
  `academicYear` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`studentId`, `firstname`, `middlename`, `lastname`, `birthdate`, `age`, `gender`, `phone`, `email`, `password`, `province`, `city`, `barangay`, `street`, `zip`, `studentIdNum`, `department`, `course`, `parentName`, `parentEmail`, `parentHome`, `parentContact`, `yearLevel`, `academicYear`) VALUES
(79, 'neil ', 'chris', 'ursal', '2009-11-17', 14, 'Female', '09343434367', 'neilchris@gmail.com', '', 'Cebu', 'Bogo City', 'Marangog', 'Capt. Aballe St. Bogo City, Cebu', 6010, '9099989787', 'College of Teacher Education', 'Bachelor of Elementary Education', 'neil', 'neil@gmail.com', 'sambag', '094533423332', '4th year', '2022-2023'),
(82, 'arlon', 'aton', 'siaboc', '1999-12-22', 23, 'Male', '09162253355', 'aceviagedor@gmail.com', '', 'Cebu', 'Bogo City', 'Anonang Norte', 'Sudlonun', 6010, '54366326326', 'College of Teacher Education', 'Bachelor of Secondary Education major in Social Studies', 'Angel Ace Viagedor', 'aceviagedor@gmail.com', 'Sudlonun', '09263344343', '4th year', '2022-2023'),
(83, 'Ademel', 'Verdida', 'Viagedor', '2023-12-12', -1, 'Male', '09809880998', 'ademelviagedor22@gmail.com', '', 'Cebu', 'Bogo City', 'Anonang Norte', 'hjkashdjkasd', 6010, '67678565', 'College of Teacher Education', 'Bachelor of Elementary Education', 'ademel', 'ademelviagedor22@gmail.com', 'sudlonon', '098934983948', '1st year', '2022-2023'),
(84, 'fsdf', 'sdfsdfsdfsd', 'fss', '2021-02-10', 2, 'Male', '32424', 'dasdad', '', 'Cebu', 'Bogo City', 'Anonang Norte', 'dads', 6010, '2342424', 'Criminal Justice Education', 'Bachelor of Science in Criminology', 'dasdasd', 'ademelviagedor22@gmail.com', 'adasdsad', '5345345', '2nd year', 'adsadad'),
(85, 'asdadasd', 'asdasd', 'dasd', '2023-12-14', 0, 'Male', '09162253355', 'aceviagedor@gmail.com', '47ORf9SZ', 'Cebu', 'Bogo City', 'Anonang Norte', 'Sudlonun', 6010, '92384', 'College of Teacher Education', 'Bachelor of Elementary Education', 'Angel Ace Viagedor', 'aceviagedor@gmail.com', 'Sudlonun', '424324', '1st year', '2022-2023');

-- --------------------------------------------------------

--
-- Table structure for table `studentviolation`
--

CREATE TABLE `studentviolation` (
  `violationId` int(11) NOT NULL,
  `studentName` varchar(250) NOT NULL,
  `studentIdNum` varchar(250) NOT NULL,
  `course` varchar(250) NOT NULL,
  `academicYear` varchar(250) NOT NULL,
  `violationType` varchar(250) NOT NULL,
  `violationDate` varchar(250) NOT NULL,
  `violationTime` varchar(250) NOT NULL,
  `offenseLevel` varchar(250) NOT NULL,
  `disciplinaryAction` text NOT NULL,
  `offenseType` varchar(250) NOT NULL,
  `location` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `attachment` varchar(250) NOT NULL,
  `reportingName` varchar(250) NOT NULL,
  `reportingRole` varchar(250) NOT NULL,
  `reportingContact` varchar(30) NOT NULL,
  `status` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentviolation`
--

INSERT INTO `studentviolation` (`violationId`, `studentName`, `studentIdNum`, `course`, `academicYear`, `violationType`, `violationDate`, `violationTime`, `offenseLevel`, `disciplinaryAction`, `offenseType`, `location`, `description`, `attachment`, `reportingName`, `reportingRole`, `reportingContact`, `status`) VALUES
(29, 'ademel verdida viagedor', '23423422424', 'Bachelor of Elementary Education', '4th year', 'Tardiness', '2023-12-06', '05:15', '2nd', 'Verbal Reprimand with marked in the teacher\'s class record', 'minor', 'dfsff', 'sdfsfd', 'C:\\fakepath\\CRMC-Student-Offense-Management-System-Project-Proposal-FINAL-EDITED.docx', 'fsdfsdf', 'sdfsdfdsf', '09786767676', 'approved'),
(30, 'ademel verdida viagedor', '23423422424', 'Bachelor of Secondary Education major in English', '2022-2023', 'Tardiness', '2023-12-28', '11:05', '3rd', 'Marked absent in the teacher\'s class record', 'major', 'sdfsfsf', 'dfsfsdf', 'C:\\fakepath\\SASO-IMS-Student-Affairs-and-Services-Office-Information-Management-System.docx', 'ademel', 'teacher', '09232323232', 'pending'),
(31, 'arlon aton magno', '123456', 'Bachelor of Elementary Education', '2022-2023', 'Absence from class', '2023-12-07', '14:38', '3rd', 'Excuse letter noted by Parent or Guardian and with verbal warning from the teacher', 'major', 'crmc', 'nawala ug kalit murag siya', '', 'bulibuli', 'rolling in the deep', '091245454545', 'approved'),
(34, 'Ademel Verdida Viagedor', '67678565', 'Bachelor of Elementary Education', '2022-2023', 'Tardiness', '2023-12-07', '01:28', '2nd', 'Verbal Reprimand with marked in the teacher\'s class record', 'minor', 'asdd', 'asdasd', 'C:\\fakepath\\download.png', 'ademel', 'dasdsad', '96989878987', 'pending'),
(35, 'Ademel Verdida Viagedor', '67678565', 'Bachelor of Elementary Education', '2022-2023', 'Tardiness', '2023-12-07', '01:32', '1st', 'Marked in the teacher\'s class record', 'minor', 'sfsdfs', 'dfsdf', 'C:\\fakepath\\download.png', 'fsdfsf', 'fsdfsf', '095675757', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `userId` int(11) NOT NULL,
  `firstname` varchar(250) DEFAULT NULL,
  `lastname` varchar(250) DEFAULT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`userId`, `firstname`, `lastname`, `username`, `email`, `password`) VALUES
(44, 'ademel mae', 'viagedor', 'ademelmae', 'ademelviagedor22@gmail.com', '238760a6419ef22b36396b1821f6868eecf51660b69507846bb142ef45549197'),
(50, 'admin', 'admin', 'admin', 'admin@gmail.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'),
(52, 'ademel', 'viagedor', 'mae', 'ademelviagedor22@gmail.com', '238760a6419ef22b36396b1821f6868eecf51660b69507846bb142ef45549197'),
(53, 'michael jay', 'sinadjan', 'mj', 'mj@gmail.com', 'a3f9e2bcd804ec65d1ea4fc63a74e7f02a08e63ffd0b803a8f250236f5602405'),
(55, 'justine', 'magno', 'just', 'justine@gmail.com', 'ffbd83cd4b52362f30c16f8c2b9f14a15b7e464a753591ac6e0449038d7f6bdb'),
(59, 'rebme', 'delacruz', 'vonvon', 'vonvonqwerty@gmail.com', 'e336515e2fa51ae620f47acd8962a3e3a698e49d15b8be1277330f2b29d83ec7'),
(60, 'arlon', 'aton', 'atonarlon', 'arlonaton@gmail.com', '0c12c0b88ef2210fc07b8bfa424a855cb9bea5feac0e102908d51fc6763f3bff'),
(61, 'Dheaved', 'buliboli', 'dheaved', 'dheaved@gmail.com', 'd089fe3f112a2826d8cef2954675db47b768f9765bc5f705f2438b1c1b652511'),
(62, 'summertime', 'saga', 'sumersaga', 'saga@gmail.com', '936fccfc8fe9a540965b08e35f46a4a5cc81dec92ac1b1dedfcb4810d017ffaf'),
(64, 'sdf', 'sdfsfsf', 'sfdsfs', 'sfdsfs', '30f643950f43480d9e14de623c26c0e578436d81c717d4a4af0fd979962550e6');

-- --------------------------------------------------------

--
-- Table structure for table `violation`
--

CREATE TABLE `violation` (
  `id` int(11) NOT NULL,
  `violationName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `violation`
--

INSERT INTO `violation` (`id`, `violationName`) VALUES
(1, 'Tardiness'),
(2, 'Absence from Class');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disciplinaryaction`
--
ALTER TABLE `disciplinaryaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentId`);

--
-- Indexes for table `studentviolation`
--
ALTER TABLE `studentviolation`
  ADD PRIMARY KEY (`violationId`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `violation`
--
ALTER TABLE `violation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disciplinaryaction`
--
ALTER TABLE `disciplinaryaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `studentviolation`
--
ALTER TABLE `studentviolation`
  MODIFY `violationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `violation`
--
ALTER TABLE `violation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
