-- MySQL dump 10.13  Distrib 5.5.59, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dbkt
-- ------------------------------------------------------
-- Server version	5.5.59-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `role` int(11) NOT NULL DEFAULT '7' COMMENT '4:super,3:admin,1:audit',
  `status` varchar(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled',
  `username` varchar(128) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `lastLogin` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `account_id` (`id`),
  KEY `account_state` (`status`),
  KEY `account_name` (`username`),
  KEY `account_phone` (`phone`),
  KEY `account_createtime` (`createTime`),
  KEY `account_lastlogin` (`lastLogin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('00000000000000000000000000000000',7,'enabled','ktadmin','c7c4a4fdd785fb4870e2eb9ee4b4b7a9','',0,1530002466000,0,0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apitrace`
--

DROP TABLE IF EXISTS `apitrace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apitrace` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `apiId` varchar(200) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'finished' COMMENT 'failed,finished',
  `name` varchar(128) NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `startTime` bigint(20) NOT NULL DEFAULT '0',
  `finishTime` bigint(20) NOT NULL DEFAULT '0',
  `request` varchar(8192) NOT NULL DEFAULT '{}',
  `reply` varchar(8192) NOT NULL DEFAULT '{}',
  PRIMARY KEY (`id`),
  KEY `apitrace_id` (`id`),
  KEY `apitrace_apiid` (`apiId`),
  KEY `apitrace_status` (`status`),
  KEY `apitrace_createtime` (`createTime`),
  KEY `apitrace_finishtime` (`finishTime`),
  KEY `apitrace_starttime` (`startTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apitrace`
--

LOCK TABLES `apitrace` WRITE;
/*!40000 ALTER TABLE `apitrace` DISABLE KEYS */;
INSERT INTO `apitrace` VALUES (1,'octlink.kt.v1.account.APILogin','finished','登录账户',1530002466000,0,0,'{\"username\": \"admin\"}','{}');
/*!40000 ALTER TABLE `apitrace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbkt'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-26 16:41:06
