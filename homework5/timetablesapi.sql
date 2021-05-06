-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 04, 2021 at 07:38 PM
-- Server version: 5.7.32-0ubuntu0.16.04.1
-- PHP Version: 7.2.25-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timetablesapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commentContent` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commentContent`, `deleted`) VALUES
(1, 'Google Meet', 0),
(2, 'Zoom', 0),
(3, 'Zoom3366', 1);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseName` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `courseName`, `deleted`) VALUES
(1, 'RIF1', 0),
(2, 'RIF2', 0),
(3, 'RIF3', 0),
(4, 'KTD1', 0),
(5, 'KTD2', 0),
(6, 'KTD3', 0),
(7, 'Tervisejuht1', 0),
(8, 'Tervisejuht2', 0),
(9, 'Tevisejuht3', 0),
(10, 'LO1', 0),
(11, 'LO2', 0),
(12, 'LO3', 0),
(13, 'RIF33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `roomNumber` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomNumber`, `deleted`) VALUES
(1, 'NA', 0),
(2, '304', 0),
(3, '302', 0),
(4, '30333', 0),
(5, '30333', 1),
(8, '666696', 0),
(9, '305', 0),
(10, 'NA1', 0),
(11, 'NA11', 0),
(12, 'NA12', 0),
(13, 'NA13', 0),
(14, 'NA14', 0),
(15, 'NA15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subjectCode` varchar(45) NOT NULL,
  `subjectName` varchar(45) NOT NULL,
  `subjectVolume` tinyint(2) NOT NULL,
  `teachers_id` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subjectCode`, `subjectName`, `subjectVolume`, `teachers_id`, `deleted`) VALUES
(2, 'HKHK100.HK', 'IT ja õigus', 4, 1, 0),
(3, 'HKHK101.HK', 'Programmeerimine', 3, 2, 0),
(4, 'HKHK101.HKKK', 'Aine', 6, 2, 1),
(5, 'HKHK100.HKJ', 'Aine', 7, 2, 0),
(6, 'HKHK1001.Hp', 'IT ja õigus666', 9, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `teacherName` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `teacherName`, `deleted`) VALUES
(1, 'Teet Tuut', 0),
(2, 'Peeter Paat', 0),
(3, 'Teele Tuul', 0),
(4, 'Pille Pool', 0),
(5, 'Pille Puul', 1);

-- --------------------------------------------------------

--
-- Table structure for table `timeslots`
--

CREATE TABLE `timeslots` (
  `id` int(11) NOT NULL,
  `startTime` varchar(45) NOT NULL,
  `endTime` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`id`, `startTime`, `endTime`, `deleted`) VALUES
(1, '10:00', '13:15', 0),
(2, '14:15', '17:30', 0),
(3, '18:00', '21:30', 0),
(4, '18:00', '22:00', 1),
(5, '14:15', '17:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `timetables`
--

CREATE TABLE `timetables` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `timeslots_id` int(11) NOT NULL,
  `rooms_id` int(11) NOT NULL,
  `comments_id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `subjects_id` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `timetables`
--

INSERT INTO `timetables` (`id`, `date`, `timeslots_id`, `rooms_id`, `comments_id`, `courses_id`, `subjects_id`, `deleted`, `users_id`) VALUES
(1, '2021-03-20', 1, 1, 1, 2, 2, 0, 2),
(2, '2021-03-20', 2, 3, 2, 2, 3, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `deleted`) VALUES
(1, 'Juku', 'Juurikas', 'juku@juurikas.ee', '$2a$10$xQzxnVGTYRf7Hro.WlQPquJytAX4FsBgBw.cI4xNhs.FKBBlH2bg6', 'User', 1),
(2, 'Mati', 'Maasikas', 'mati@maasikas.ee', '$2b$10$mmDEQFhwUL1fLV1z4SHQjuE1E4BJYBJ78YUAIdquZOaqACbqvU9Ga', 'Admin', 0),
(3, 'Tarmo', 'Reinvali', 'tarmo@reinvali.ee', '$2b$10$KMdIwjdsMCJPo/w1wTsgLuEWKrlwRoV6s6oxiHarDITWdwoU8qZvu', 'User', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subject_teachers_idx` (`teachers_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslots`
--
ALTER TABLE `timeslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetables`
--
ALTER TABLE `timetables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_timetables_timeslots1_idx` (`timeslots_id`),
  ADD KEY `fk_timetables_rooms1_idx` (`rooms_id`),
  ADD KEY `fk_timetables_comments1_idx` (`comments_id`),
  ADD KEY `fk_timetables_courses1_idx` (`courses_id`),
  ADD KEY `fk_timetables_subjects1_idx` (`subjects_id`),
  ADD KEY `fk_timetables_users1_idx` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `timetables`
--
ALTER TABLE `timetables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `fk_subject_teachers` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `timetables`
--
ALTER TABLE `timetables`
  ADD CONSTRAINT `fk_timetables_comments1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_timetables_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_timetables_rooms1` FOREIGN KEY (`rooms_id`) REFERENCES `rooms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_timetables_subjects1` FOREIGN KEY (`subjects_id`) REFERENCES `subjects` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_timetables_timeslots1` FOREIGN KEY (`timeslots_id`) REFERENCES `timeslots` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_timetables_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
