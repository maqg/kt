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
  `role` int(11) NOT NULL DEFAULT '7' COMMENT '7:super,3:admin,1:audit',
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
INSERT INTO `account` VALUES ('c9b7c22a0ae911e7af10525400659eb7',7,'enabled','ktadmin','c341cba6a1437624815de477a43240e5','',0,1531452613000,1531452613000,0);
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
INSERT INTO `apitrace` VALUES (1,'octlink.kt.v1.account.APILogin','finished','登录账户',1531452613000,0,0,'{\"username\": \"admin\"}','{}');
/*!40000 ALTER TABLE `apitrace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battery`
--

DROP TABLE IF EXISTS `battery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `battery` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `serial` varchar(50) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `manufacturer` varchar(64) NOT NULL DEFAULT '',
  `capacity` int(11) NOT NULL DEFAULT '30000',
  `usageCount` int(11) NOT NULL DEFAULT '0',
  `imei` varchar(50) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'online' COMMENT 'online/offline/recharging/unknown',
  `remark` varchar(200) NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `battery_id` (`id`),
  KEY `battery_serial` (`serial`),
  KEY `battery_imei` (`imei`),
  KEY `battery_status` (`status`),
  KEY `battery_manufacturer` (`manufacturer`),
  KEY `battery_createtime` (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battery`
--

LOCK TABLES `battery` WRITE;
/*!40000 ALTER TABLE `battery` DISABLE KEYS */;
/*!40000 ALTER TABLE `battery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bike`
--

DROP TABLE IF EXISTS `bike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bike` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `serial` varchar(36) NOT NULL DEFAULT '',
  `modelId` varchar(36) NOT NULL DEFAULT '',
  `currentUser` varchar(36) NOT NULL DEFAULT '',
  `lastUser` varchar(36) NOT NULL DEFAULT '',
  `imei` varchar(50) NOT NULL DEFAULT '',
  `longitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `latitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '纬度',
  `usageTimes` int(11) NOT NULL DEFAULT '0' COMMENT 'Bike Usage Times',
  `manTimes` int(11) NOT NULL DEFAULT '0' COMMENT 'Bike Maintenance Times',
  `batterySurplus` int(11) NOT NULL DEFAULT '0',
  `status` varchar(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled/deleted/maint',
  `rentStatus` varchar(16) NOT NULL DEFAULT 'free' COMMENT 'occupied',
  `onlineStatus` varchar(16) NOT NULL DEFAULT 'online' COMMENT 'online/offline',
  `lockStatus` varchar(16) NOT NULL DEFAULT 'locked' COMMENT 'locked/unlocked',
  `batteryStatus` varchar(16) NOT NULL DEFAULT 'sufficient' COMMENT 'sufficient/normal/lack/none',
  `address` varchar(200) NOT NULL DEFAULT '',
  `floor` varchar(64) NOT NULL DEFAULT '',
  `lastRent` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `modelId` (`modelId`),
  KEY `bike_id` (`id`),
  KEY `bike_serial` (`serial`),
  KEY `bike_imei` (`imei`),
  KEY `bike_batterySurplus` (`batterySurplus`),
  KEY `bike_status` (`status`),
  KEY `bike_position` (`longitude`,`latitude`),
  KEY `bike_rentstatus` (`rentStatus`),
  KEY `bike_onlinestatus` (`onlineStatus`),
  KEY `bike_lockstatus` (`lockStatus`),
  KEY `bike_batterystatus` (`batteryStatus`),
  KEY `bike_createTime` (`createTime`),
  KEY `bike_lastrent` (`lastRent`),
  CONSTRAINT `bike_ibfk_1` FOREIGN KEY (`modelId`) REFERENCES `bikemodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bike`
--

LOCK TABLES `bike` WRITE;
/*!40000 ALTER TABLE `bike` DISABLE KEYS */;
INSERT INTO `bike` VALUES ('00000000000000000000000000000000','01004331231','00000000000000000000000000000000','','','imei123',0.000000,0.000000,0,0,100,'enabled','free','online','locked','sufficient','Beijing','F1',1530612627000,1530612627000,1530612627000,0);
/*!40000 ALTER TABLE `bike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bikelog`
--

DROP TABLE IF EXISTS `bikelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bikelog` (
  `userId` varchar(36) NOT NULL DEFAULT '',
  `username` varchar(128) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `action` varchar(16) NOT NULL DEFAULT 'open' COMMENT 'open/close',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  KEY `bikelog_user` (`userId`),
  KEY `bikelog_username` (`username`),
  KEY `bikelog_bikeid` (`bikeId`),
  KEY `bikelog_type` (`action`),
  KEY `bikelog_createtime` (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bikelog`
--

LOCK TABLES `bikelog` WRITE;
/*!40000 ALTER TABLE `bikelog` DISABLE KEYS */;
INSERT INTO `bikelog` VALUES ('15e9a5f0-8037-11e8-98e3-525437f07951','Henry.Ma','00000000000000000000000000000000','unlock',1530612627000),('15e9a5f0-8037-11e8-98e3-525437f07952','谁是药神？','00000000000000000000000000000000','lock',1530612627000);
/*!40000 ALTER TABLE `bikelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bikemodel`
--

DROP TABLE IF EXISTS `bikemodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bikemodel` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `brand` varchar(64) NOT NULL DEFAULT '',
  `model` varchar(32) NOT NULL DEFAULT 'default',
  `batteryVoltage` int(11) NOT NULL DEFAULT '0' COMMENT '毫伏',
  `batteryBrand` varchar(64) NOT NULL DEFAULT '',
  `batteryModel` varchar(64) NOT NULL DEFAULT 'default',
  `batteryCapacity` int(11) NOT NULL DEFAULT '30000' COMMENT '毫安时',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `bikemodel_id` (`id`),
  KEY `bikemodel_name` (`name`),
  KEY `bikemodel_brand` (`brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bikemodel`
--

LOCK TABLES `bikemodel` WRITE;
/*!40000 ALTER TABLE `bikemodel` DISABLE KEYS */;
INSERT INTO `bikemodel` VALUES ('00000000000000000000000000000000','深圳1型','金华南','3c',3700,'Taobao','v100',30000,1531452613000,1531452613000,0);
/*!40000 ALTER TABLE `bikemodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maintenance` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `bikeSerial` varchar(50) NOT NULL DEFAULT '',
  `serialNo` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(16) NOT NULL DEFAULT 'phone' COMMENT 'phone/routine/app/other',
  `result` varchar(16) NOT NULL DEFAULT 'new' COMMENT 'finished/remain/new',
  `parts` varchar(200) NOT NULL DEFAULT '[]',
  `remark` varchar(200) NOT NULL DEFAULT '',
  `longitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `latitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '纬度',
  `address` varchar(200) NOT NULL DEFAULT '',
  `images` varchar(1024) NOT NULL DEFAULT '[]',
  `maintenanceId` varchar(36) NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `maintenance_id` (`id`),
  KEY `maintenance_bikeid` (`bikeId`),
  KEY `maintenance_serialno` (`serialNo`),
  KEY `maintenance_maintenanceid` (`maintenanceId`),
  KEY `maintenance_type` (`type`),
  KEY `maintenance_result` (`result`),
  KEY `maintenance_createtime` (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderlog`
--

DROP TABLE IF EXISTS `orderlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderlog` (
  `orderId` varchar(36) NOT NULL DEFAULT '',
  `account` varchar(128) NOT NULL DEFAULT '',
  `originalFee` int(11) NOT NULL DEFAULT '0' COMMENT 'in cents',
  `currentFee` int(11) NOT NULL DEFAULT '0' COMMENT 'in cents',
  `remark` varchar(200) NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  KEY `orderlog_orderid` (`orderId`),
  KEY `orderlog_accountid` (`account`),
  KEY `orderlog_createtime` (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderlog`
--

LOCK TABLES `orderlog` WRITE;
/*!40000 ALTER TABLE `orderlog` DISABLE KEYS */;
INSERT INTO `orderlog` VALUES ('00000000000000000000000000000000','admin',200,0,'测试减免费用',1530612627000),('00000000000000000000000000000001','admin',400,200,'测试减免费用',1530612627000);
/*!40000 ALTER TABLE `orderlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `type` varchar(32) NOT NULL DEFAULT 'newbie' COMMENT 'newbie/recharge/qrcode/share/invite',
  `name` varchar(128) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled,disabled',
  `amount` int(11) NOT NULL DEFAULT '1',
  `startTime` bigint(20) NOT NULL DEFAULT '0',
  `endTime` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `promotion_id` (`id`),
  KEY `promotion_name` (`name`),
  KEY `promotion_status` (`status`),
  KEY `promotion_createTime` (`createTime`),
  KEY `promotion_starttime` (`startTime`),
  KEY `promotion_endtime` (`endTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES ('00000000000000000000000000000000','newbie','新人注册送','enabled',1,1530612627000,1539612627000,1530612627000,0,0),('00000000000000000000000000000001','share','分享送','enabled',2,1530612627000,1539612627000,1530612627000,1531452613000,0);
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentcharge`
--

DROP TABLE IF EXISTS `rentcharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rentcharge` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `freeDuration` int(11) NOT NULL DEFAULT '2' COMMENT '免费骑行时长，分钟',
  `freeDurationPrice` int(11) NOT NULL DEFAULT '0' COMMENT '免费骑行费用，分',
  `unitPrice` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `unitPriceMinutes` int(11) NOT NULL DEFAULT '0' COMMENT '分钟',
  `topHours` int(11) NOT NULL DEFAULT '24' COMMENT '最大连续骑行时长',
  `topPrice` int(11) NOT NULL DEFAULT '2400' COMMENT '最大连续骑行计费，分',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `rentcharge_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentcharge`
--

LOCK TABLES `rentcharge` WRITE;
/*!40000 ALTER TABLE `rentcharge` DISABLE KEYS */;
INSERT INTO `rentcharge` VALUES ('00000000000000000000000000000000','计费标准',200,0,100,10,10,2400,1531452613000,1531452613000,0);
/*!40000 ALTER TABLE `rentcharge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ridemsg`
--

DROP TABLE IF EXISTS `ridemsg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ridemsg` (
  `orderId` varchar(36) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `heartRate` int(11) NOT NULL DEFAULT '0',
  `speed` int(11) NOT NULL DEFAULT '0' COMMENT 'meters/hour',
  `calories` int(11) NOT NULL DEFAULT '0',
  `seconds` int(11) NOT NULL DEFAULT '0',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT 'in meters',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  KEY `ridemsg_orderid` (`orderId`),
  KEY `ridemsg_bikeid` (`bikeId`),
  KEY `ridemsg_createtime` (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ridemsg`
--

LOCK TABLES `ridemsg` WRITE;
/*!40000 ALTER TABLE `ridemsg` DISABLE KEYS */;
/*!40000 ALTER TABLE `ridemsg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `userId` varchar(36) NOT NULL DEFAULT '',
  `userType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '7:superadmin,3:admin,1:audit,0:user',
  `username` varchar(128) NOT NULL DEFAULT '',
  `cookie` varchar(200) NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `expireTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `session_id` (`id`),
  KEY `session_userid` (`userId`),
  KEY `session_username` (`username`),
  KEY `session_createtime` (`createTime`),
  KEY `session_updatetime` (`updateTime`),
  KEY `session_expiretime` (`expireTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('00000000000000000000000000000000','c9b7c22a0ae911e7af10525400659eb7',7,'ktadmin','{\"id\": \"\",\"name\":\"ktadmin\",\"role\":7}',1529563789591,0,1844923789591),('00000000000000000000000000000001','15e9a5f0-8037-11e8-98e3-525437f07951',7,'Henry.Ma','{\"id\": \"15e9a5f0-8037-11e8-98e3-525437f07951\",\"name\":\"Henry.Ma\",\"role\":1}',1529563789591,0,1844923789591);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `unionId` varchar(64) NOT NULL DEFAULT '',
  `openId` varchar(64) NOT NULL DEFAULT '',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT 'WX: 1, 2: OTHER',
  `status` varchar(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled',
  `gender` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:Male, 1: Female, 2: Other',
  `nickname` varchar(128) NOT NULL DEFAULT '',
  `country` varchar(32) NOT NULL DEFAULT '中国',
  `province` varchar(32) NOT NULL DEFAULT '北京',
  `city` varchar(32) NOT NULL DEFAULT '北京',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT 'url of lastUser',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT 'Phone Number',
  `coupons` int(11) NOT NULL DEFAULT '0' COMMENT '优惠券数量',
  `cash` int(11) NOT NULL DEFAULT '0' COMMENT 'in cents',
  `times` int(11) NOT NULL DEFAULT '0' COMMENT 'Bike Usage Times',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT 'in meters',
  `longitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `latitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '纬度',
  `lastLogin` bigint(20) NOT NULL DEFAULT '0',
  `lastRent` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`id`),
  KEY `user_unionid` (`unionId`),
  KEY `user_openid` (`openId`),
  KEY `user_cash` (`cash`),
  KEY `user_city` (`city`),
  KEY `user_province` (`province`),
  KEY `user_longitude` (`longitude`,`latitude`),
  KEY `user_state` (`status`),
  KEY `user_name` (`nickname`),
  KEY `user_phone` (`phone`),
  KEY `user_createtime` (`createTime`),
  KEY `user_lastlogin` (`lastLogin`),
  KEY `user_lastrent` (`lastRent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('15e9a5f0-8037-11e8-98e3-525437f07951','xxxxxxl','2223333333',1,'enabled',0,'Henry.Ma','中国','安徽','利辛','none','15011329430',1,1000,3,20099,0.000000,0.000000,1530612627000,1530612627000,1530612627000,0,0),('15e9a5f0-8037-11e8-98e3-525437f07952','xxxxxxl','2223333333',1,'enabled',0,'谁是药神？','','','','none','15011329430',1,1000,0,0,0.000000,0.000000,1530612627000,1530612627000,1530612627000,0,0),('15e9a5f0-8037-11e8-98e3-525437f07953','xxxxxxl','2223333333',1,'enabled',0,'HenryGoRuby','','','','none','15011329430',1,1000,0,0,0.000000,0.000000,1530612627000,1530612627000,1530612627000,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trigger_delete_user AFTER DELETE ON user FOR EACH ROW
BEGIN
DELETE FROM usercoupon WHERE userId=old.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usercoupon`
--

DROP TABLE IF EXISTS `usercoupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usercoupon` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `userId` varchar(36) NOT NULL DEFAULT '',
  `promotionId` varchar(36) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled,disabled',
  `amount` int(11) NOT NULL DEFAULT '1',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `useTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usercoupon_id` (`id`),
  KEY `usercoupon_userid` (`userId`),
  KEY `usercoupon_promotionid` (`promotionId`),
  KEY `usercoupon_status` (`status`),
  KEY `usercoupon_createTime` (`createTime`),
  KEY `usercoupon_usetime` (`useTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercoupon`
--

LOCK TABLES `usercoupon` WRITE;
/*!40000 ALTER TABLE `usercoupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `usercoupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userorder`
--

DROP TABLE IF EXISTS `userorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userorder` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `userId` varchar(36) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `orderNo` varchar(50) NOT NULL DEFAULT '',
  `totalFee` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `cashFee` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `couponFee` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `startTime` bigint(20) NOT NULL DEFAULT '0',
  `endTime` bigint(20) NOT NULL DEFAULT '0',
  `duration` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `longitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `latitude` decimal(11,6) NOT NULL DEFAULT '0.000000' COMMENT '纬度',
  `address` varchar(200) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'new' COMMENT 'unpaid,finished',
  `calories` int(11) NOT NULL DEFAULT '0',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT 'in meters',
  `speed` int(11) NOT NULL DEFAULT '0' COMMENT 'in meters/hour',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userorder_id` (`id`),
  KEY `userorder_status` (`status`),
  KEY `userorder_userid` (`userId`),
  KEY `userorder_bikeid` (`bikeId`),
  KEY `userorder_userorderno` (`orderNo`),
  KEY `userorder_startTime` (`createTime`),
  KEY `userorder_endtime` (`endTime`),
  KEY `userorder_createTime` (`createTime`),
  CONSTRAINT `userorder_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `userorder_ibfk_2` FOREIGN KEY (`bikeId`) REFERENCES `bike` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userorder`
--

LOCK TABLES `userorder` WRITE;
/*!40000 ALTER TABLE `userorder` DISABLE KEYS */;
INSERT INTO `userorder` VALUES ('00000000000000000000000000000000','15e9a5f0-8037-11e8-98e3-525437f07951','00000000000000000000000000000000','order-12345',200,200,0,1530612627000,1530612727000,1213,0.000000,0.000000,'Beijing','new',34,5000,22300,1530612627000,1530612627000,0),('00000000000000000000000000000001','15e9a5f0-8037-11e8-98e3-525437f07952','00000000000000000000000000000000','order-12345',400,400,0,1530612627000,1530612727000,1233,0.000000,0.000000,'Beijing','new',34,5000,22300,1530612627000,1530612627000,0);
/*!40000 ALTER TABLE `userorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrecharge`
--

DROP TABLE IF EXISTS `userrecharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userrecharge` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `userId` varchar(36) NOT NULL DEFAULT '',
  `channel` varchar(50) NOT NULL DEFAULT 'JSAPI' COMMENT 'recharge channel',
  `rechargeId` varchar(50) NOT NULL DEFAULT '',
  `refundId` varchar(50) NOT NULL DEFAULT '',
  `amount` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `refundAmount` int(11) NOT NULL DEFAULT '0' COMMENT '分',
  `refundFailReason` varchar(512) NOT NULL DEFAULT '',
  `clientIp` varchar(20) NOT NULL DEFAULT '',
  `rechargeStatus` varchar(16) NOT NULL DEFAULT 'success' COMMENT 'failed',
  `coupons` int(11) NOT NULL DEFAULT '0',
  `refundTime` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userrecharge_id` (`id`),
  KEY `userrecharge_userid` (`userId`),
  KEY `userrecharge_rechargeStatus` (`rechargeStatus`),
  KEY `userrecharge_createTime` (`createTime`),
  KEY `userrecharge_refundtime` (`refundTime`),
  CONSTRAINT `userrecharge_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrecharge`
--

LOCK TABLES `userrecharge` WRITE;
/*!40000 ALTER TABLE `userrecharge` DISABLE KEYS */;
/*!40000 ALTER TABLE `userrecharge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worklist`
--

DROP TABLE IF EXISTS `worklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worklist` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `bikeId` varchar(36) NOT NULL DEFAULT '',
  `userId` varchar(36) NOT NULL DEFAULT '',
  `maintenanceId` varchar(36) NOT NULL DEFAULT '',
  `taskNo` varchar(50) NOT NULL DEFAULT '',
  `status` varchar(16) NOT NULL DEFAULT 'new' COMMENT 'new/assigned/finished/confirmed',
  `remark` varchar(200) NOT NULL DEFAULT '',
  `confirmTime` bigint(20) NOT NULL DEFAULT '0',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `updateTime` bigint(20) NOT NULL DEFAULT '0',
  `deleteTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `worklist_id` (`id`),
  KEY `worklist_bikeid` (`bikeId`),
  KEY `worklist_userid` (`userId`),
  KEY `worklist_maintenanceid` (`maintenanceId`),
  KEY `worklist_taskno` (`taskNo`),
  KEY `worklist_status` (`status`),
  KEY `worklist_createtime` (`createTime`),
  KEY `worklist_confirmtime` (`confirmTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worklist`
--

LOCK TABLES `worklist` WRITE;
/*!40000 ALTER TABLE `worklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `worklist` ENABLE KEYS */;
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

-- Dump completed on 2018-07-13 11:30:13
