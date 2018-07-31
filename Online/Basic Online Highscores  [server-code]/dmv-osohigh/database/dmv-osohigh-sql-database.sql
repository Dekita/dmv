-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2015 at 08:06 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dmv_osohigh`
--
CREATE DATABASE IF NOT EXISTS `dmv_osohigh` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dmv_osohigh`;

-- --------------------------------------------------------

--
-- Table structure for table `default_score_table`
--
-- Creation: Nov 13, 2015 at 07:05 AM
--

CREATE TABLE IF NOT EXISTS `default_score_table` (
  `UniqueEntryID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EntryName` text NOT NULL,
  `EntryScore` int(9) NOT NULL,
  `EntryExtra` text NOT NULL,
  `EntryStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UniqueEntryID`),
  UNIQUE KEY `UniqueEntryID` (`UniqueEntryID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='This is a basic default highscore table.' AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `highlist1`
--
-- Creation: Nov 13, 2015 at 07:05 AM
--

CREATE TABLE IF NOT EXISTS `highlist1` (
  `UniqueEntryID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EntryName` text NOT NULL,
  `EntryScore` int(9) NOT NULL,
  `EntryExtra` text NOT NULL,
  `EntryStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UniqueEntryID`),
  UNIQUE KEY `UniqueEntryID` (`UniqueEntryID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='This is a basic highscore table.' AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `highlist2`
--
-- Creation: Nov 13, 2015 at 07:05 AM
--

CREATE TABLE IF NOT EXISTS `highlist2` (
  `UniqueEntryID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EntryName` text NOT NULL,
  `EntryScore` int(9) NOT NULL,
  `EntryExtra` text NOT NULL,
  `EntryStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UniqueEntryID`),
  UNIQUE KEY `UniqueEntryID` (`UniqueEntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is a basic highscore table.' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `highlist3`
--
-- Creation: Nov 13, 2015 at 07:05 AM
--

CREATE TABLE IF NOT EXISTS `highlist3` (
  `UniqueEntryID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EntryName` text NOT NULL,
  `EntryScore` int(9) NOT NULL,
  `EntryExtra` text NOT NULL,
  `EntryStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UniqueEntryID`),
  UNIQUE KEY `UniqueEntryID` (`UniqueEntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is a basic highscore table.' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
