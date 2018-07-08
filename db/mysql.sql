DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`role` INTEGER NOT NULL DEFAULT '7' COMMENT '7:super,3:admin,1:audit',
		`status` VARCHAR(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled',
		`username` VARCHAR(128) NOT NULL DEFAULT '' COMMENT '',
		`password` VARCHAR(128) NOT NULL DEFAULT '',
		`phone` VARCHAR(20) NOT NULL DEFAULT '',
		`lastLogin` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE account ADD INDEX account_id (id);
ALTER TABLE account ADD INDEX account_state (status);
ALTER TABLE account ADD INDEX account_name (username);
ALTER TABLE account ADD INDEX account_phone (phone);
ALTER TABLE account ADD INDEX account_createtime (createTime);
ALTER TABLE account ADD INDEX account_lastlogin (lastLogin);

DROP TABLE IF EXISTS `apitrace`;
CREATE TABLE `apitrace` (
		`id` BIGINT NOT NULL AUTO_INCREMENT,
		`apiId` VARCHAR(200) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'finished' COMMENT 'failed,finished',
		`name` VARCHAR(128) NOT NULL DEFAULT '',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`startTime` BIGINT NOT NULL DEFAULT '0',
		`finishTime` BIGINT NOT NULL DEFAULT '0',
		`request` VARCHAR(8192) NOT NULL DEFAULT '{}',
		`reply` VARCHAR(8192) NOT NULL DEFAULT '{}',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE apitrace ADD INDEX apitrace_id (id);
ALTER TABLE apitrace ADD INDEX apitrace_apiid (apiId);
ALTER TABLE apitrace ADD INDEX apitrace_status (status);
ALTER TABLE apitrace ADD INDEX apitrace_createtime (createTime);
ALTER TABLE apitrace ADD INDEX apitrace_finishtime (finishTime);
ALTER TABLE apitrace ADD INDEX apitrace_starttime (startTime);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`unionId` VARCHAR(64) NOT NULL DEFAULT '',
		`openId` VARCHAR(64) NOT NULL DEFAULT '',
		`type` TINYINT NOT NULL DEFAULT '1' COMMENT 'WX: 1, 2: OTHER',
		`status` VARCHAR(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled',
		`gender` TINYINT NOT NULL DEFAULT '0' COMMENT '0:Male, 1: Female, 2: Other',
		`nickname` VARCHAR(128) NOT NULL DEFAULT '' COMMENT '',
		`avatar` VARCHAR(200) NOT NULL DEFAULT '' COMMENT 'url of avatar',
		`phone` VARCHAR(20) NOT NULL DEFAULT '' COMMENT 'Phone Number',
		`coupons` INTEGER NOT NULL DEFAULT '0' COMMENT '优惠券数量',
		`cash` INTEGER NOT NULL DEFAULT '0' COMMENT 'in cents',
		`registerLongitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '经度',
		`registerLatitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '纬度',
		`lastLogin` BIGINT NOT NULL DEFAULT '0',
		`lastRent` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE user ADD INDEX user_id (id);
ALTER TABLE user ADD INDEX user_unionid (unionId);
ALTER TABLE user ADD INDEX user_openid (openId);
ALTER TABLE user ADD INDEX user_cash (cash);
ALTER TABLE user ADD INDEX user_registerLongitude (registerLongitude);
ALTER TABLE user ADD INDEX user_registerLatitude (registerLatitude);
ALTER TABLE user ADD INDEX user_state (status);
ALTER TABLE user ADD INDEX user_name (nickname);
ALTER TABLE user ADD INDEX user_phone (phone);
ALTER TABLE user ADD INDEX user_createtime (createTime);
ALTER TABLE user ADD INDEX user_lastlogin (lastLogin);
ALTER TABLE user ADD INDEX user_lastrent (lastRent);

DROP TABLE IF EXISTS `promotion`;
CREATE TABLE `promotion` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`type` VARCHAR(32) NOT NULL DEFAULT 'newbie' COMMENT 'newbie/recharge/qrcode/share/invite',
		`name` VARCHAR(128) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled,disabled',
		`amount` INTEGER NOT NULL DEFAULT '1',
		`startTime` BIGINT NOT NULL DEFAULT '0',
		`endTime` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE promotion ADD INDEX promotion_id (id);
ALTER TABLE promotion ADD INDEX promotion_name (name);
ALTER TABLE promotion ADD INDEX promotion_status (status);
ALTER TABLE promotion ADD INDEX promotion_createTime (createTime);
ALTER TABLE promotion ADD INDEX promotion_starttime (startTime);
ALTER TABLE promotion ADD INDEX promotion_endtime (endTime);


DROP TABLE IF EXISTS `usercoupon`;
CREATE TABLE `usercoupon` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`promotionId` VARCHAR(36) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled,disabled',
		`amount` INTEGER NOT NULL DEFAULT '1',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`useTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (userId) REFERENCES user(id),
		FOREIGN KEY (promotionId) REFERENCES promotion(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE usercoupon ADD INDEX usercoupon_id (id);
ALTER TABLE usercoupon ADD INDEX usercoupon_userid (userId);
ALTER TABLE usercoupon ADD INDEX usercoupon_promotionid (promotionId);
ALTER TABLE usercoupon ADD INDEX usercoupon_status (status);
ALTER TABLE usercoupon ADD INDEX usercoupon_createTime (createTime);
ALTER TABLE usercoupon ADD INDEX usercoupon_usetime (useTime);

DROP TABLE IF EXISTS `rentcharge`;
CREATE TABLE `rentcharge` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`name` VARCHAR(128) NOT NULL DEFAULT '',
		`freeDuration` INTEGER NOT NULL DEFAULT '2' COMMENT '免费骑行时长，分钟',
		`freeDurationPrice` INTEGER NOT NULL DEFAULT '0' COMMENT '免费骑行费用，分',
		`unitPrice` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`unitPriceMinutes` INTEGER NOT NULL DEFAULT '0' COMMENT '分钟',
		`topHours` INTEGER NOT NULL DEFAULT '24' COMMENT '最大连续骑行时长',
		`topPrice` INTEGER NOT NULL DEFAULT '2400' COMMENT '最大连续骑行计费，分',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE rentcharge ADD INDEX rentcharge_id (id);

DROP TABLE IF EXISTS `userrecharge`;
CREATE TABLE `userrecharge` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`channel` VARCHAR(50) NOT NULL DEFAULT 'JSAPI' COMMENT 'recharge channel',
		`rechargeId` VARCHAR(50) NOT NULL DEFAULT '',
		`refundId` VARCHAR(50) NOT NULL DEFAULT '',
		`amount` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`refundAmount` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`refundFailReason` VARCHAR(512) NOT NULL DEFAULT '',
		`clientIp` VARCHAR(20) NOT NULL DEFAULT '',
		`rechargeStatus` VARCHAR(16) NOT NULL DEFAULT 'success' COMMENT 'failed',
		`coupons` INTEGER NOT NULL DEFAULT '0' COMMENT '',
		`refundTime` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (userId) REFERENCES user(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE userrecharge ADD INDEX userrecharge_id (id);
ALTER TABLE userrecharge ADD INDEX userrecharge_userid (userId);
ALTER TABLE userrecharge ADD INDEX userrecharge_rechargeStatus (rechargeStatus);
ALTER TABLE userrecharge ADD INDEX userrecharge_createTime (createTime);
ALTER TABLE userrecharge ADD INDEX userrecharge_refundtime (refundTime);

DROP TABLE IF EXISTS `bikemodel`;
CREATE TABLE `bikemodel` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`name` VARCHAR(128) NOT NULL DEFAULT '',
		`brand` VARCHAR(64) NOT NULL DEFAULT '',
		`model` VARCHAR(32) NOT NULL DEFAULT 'default',
		`batteryVoltage` INTEGER NOT NULL DEFAULT '0' COMMENT '毫伏',
		`batteryBrand` VARCHAR(64) NOT NULL DEFAULT '',
		`batteryModel` VARCHAR(64) NOT NULL DEFAULT 'default',
		`batteryCapacity` INTEGER NOT NULL DEFAULT '30000' COMMENT '毫安时',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE bikemodel ADD INDEX bikemodel_id (id);
ALTER TABLE bikemodel ADD INDEX bikemodel_name (name);
ALTER TABLE bikemodel ADD INDEX bikemodel_brand (brand);

DROP TABLE IF EXISTS `bike`;
CREATE TABLE `bike` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`serial` VARCHAR(36) NOT NULL DEFAULT '',
		`modelId` VARCHAR(36) NOT NULL DEFAULT '',
		`currentUser` VARCHAR(36) NOT NULL DEFAULT '',
		`lastUser` VARCHAR(36) NOT NULL DEFAULT '',
		`imei` VARCHAR(50) NOT NULL DEFAULT '',
		`longitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '经度',
		`latitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '纬度',
		`batterySurplus` INTEGER NOT NULL DEFAULT '0' COMMENT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'enabled' COMMENT 'enabled/disabled/deleted/maint',
		`rentStatus` VARCHAR(16) NOT NULL DEFAULT 'free' COMMENT 'occupied',
		`onlineStatus` VARCHAR(16) NOT NULL DEFAULT 'online' COMMENT 'online/offline',
		`lockStatus` VARCHAR(16) NOT NULL DEFAULT 'locked' COMMENT 'locked/unlocked',
		`batteryStatus` VARCHAR(16) NOT NULL DEFAULT 'sufficient' COMMENT 'sufficient/normal/lack/none',
		`address` VARCHAR(200) NOT NULL DEFAULT '',
		`floor` VARCHAR(64) NOT NULL DEFAULT '',
		`lastRent` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (modelId) REFERENCES bikemodel(id),
		FOREIGN KEY (currentUser) REFERENCES user(id),
		FOREIGN KEY (lastUser) REFERENCES user(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE bike ADD INDEX bike_id (id);
ALTER TABLE bike ADD INDEX bike_serial (serial);
ALTER TABLE bike ADD INDEX bike_imei (imei);
ALTER TABLE bike ADD INDEX bike_batterySurplus (batterySurplus);
ALTER TABLE bike ADD INDEX bike_status (status);
ALTER TABLE bike ADD INDEX bike_rentstatus (rentStatus);
ALTER TABLE bike ADD INDEX bike_onlinestatus (onlineStatus);
ALTER TABLE bike ADD INDEX bike_lockstatus (lockStatus);
ALTER TABLE bike ADD INDEX bike_batterystatus (batteryStatus);
ALTER TABLE bike ADD INDEX bike_createTime (createTime);
ALTER TABLE bike ADD INDEX bike_lastrent (lastRent);


DROP TABLE IF EXISTS `userorder`;
CREATE TABLE `userorder` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`orderNo` VARCHAR(50) NOT NULL DEFAULT '',
		`totalFee` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`cashFee` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`couponFee` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`startTime` BIGINT NOT NULL DEFAULT '0',
		`endTime` BIGINT NOT NULL DEFAULT '0',
		`duration` INTEGER NOT NULL DEFAULT '0' COMMENT '分',
		`longitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '经度',
		`latitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '纬度',
		`address` VARCHAR(200) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'new' COMMENT 'unpaid,finished',
		`calories` INTEGER NOT NULL DEFAULT '0' COMMENT '',
		`distance` INTEGER NOT NULL DEFAULT '0' COMMENT 'in meters',
		`speed` INTEGER NOT NULL DEFAULT '0' COMMENT 'in meters/hour',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (userId) REFERENCES user(id),
		FOREIGN KEY (bikeId) REFERENCES bike(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE `userorder` ADD INDEX userorder_id (id);
ALTER TABLE `userorder` ADD INDEX userorder_status (status);
ALTER TABLE `userorder` ADD INDEX userorder_userid (userId);
ALTER TABLE `userorder` ADD INDEX userorder_bikeid (bikeId);
ALTER TABLE `userorder` ADD INDEX userorder_userorderno (orderNo);
ALTER TABLE `userorder` ADD INDEX userorder_startTime (createTime);
ALTER TABLE `userorder` ADD INDEX userorder_endtime (endTime);
ALTER TABLE `userorder` ADD INDEX userorder_createTime (createTime);

DROP TABLE IF EXISTS `bikelog`;
CREATE TABLE `bikelog` (
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`type` VARCHAR(16) NOT NULL DEFAULT 'open' COMMENT 'open/close',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		FOREIGN KEY (userId) REFERENCES user(id),
		FOREIGN KEY (bikeId) REFERENCES bike(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE bikelog ADD INDEX bikelog_user (userId);
ALTER TABLE bikelog ADD INDEX bikelog_bikeid (bikeId);
ALTER TABLE bikelog ADD INDEX bikelog_type (type);
ALTER TABLE bikelog ADD INDEX bikelog_createtime (createTime);

DROP TABLE IF EXISTS `orderlog`;
CREATE TABLE `orderlog` (
		`orderId` VARCHAR(36) NOT NULL DEFAULT '',
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`originalFee` INTEGER NOT NULL DEFAULT '0' COMMENT 'in cents',
		`currentFee` INTEGER NOT NULL DEFAULT '0' COMMENT 'in cents',
		`remark` VARCHAR(200) NOT NULL DEFAULT '',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		FOREIGN KEY (orderId) REFERENCES `userorder`(id),
		FOREIGN KEY (userId) REFERENCES user(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE orderlog ADD INDEX orderlog_orderid (orderId);
ALTER TABLE orderlog ADD INDEX orderlog_userid (userId);
ALTER TABLE orderlog ADD INDEX orderlog_createtime (createTime);

DROP TABLE IF EXISTS `battery`;
CREATE TABLE `battery` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`serial` VARCHAR(50) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`manufacturer` VARCHAR(64) NOT NULL DEFAULT '',
		`capacity` INTEGER NOT NULL DEFAULT '30000',
		`usageCount` INTEGER NOT NULL DEFAULT '0',
		`imei` VARCHAR(50) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'online' COMMENT 'online/offline/recharging/unknown',
		`remark` VARCHAR(200) NOT NULL DEFAULT '',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (bikeId) REFERENCES bike(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE battery ADD INDEX battery_id (id);
ALTER TABLE battery ADD INDEX battery_serial (serial);
ALTER TABLE battery ADD INDEX battery_imei (imei);
ALTER TABLE battery ADD INDEX battery_status (status);
ALTER TABLE battery ADD INDEX battery_manufacturer (manufacturer);
ALTER TABLE battery ADD INDEX battery_createtime (createTime);

DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeSerial` VARCHAR(50) NOT NULL DEFAULT '',
		`serialNo` VARCHAR(50) NOT NULL DEFAULT '',
		`type` VARCHAR(16) NOT NULL DEFAULT 'phone' COMMENT 'phone/routine/app/other',
		`result` VARCHAR(16) NOT NULL DEFAULT 'new' COMMENT 'finished/remain/new',
		`parts` VARCHAR(200) NOT NULL DEFAULT '[]' COMMENT '',
		`remark` VARCHAR(200) NOT NULL DEFAULT '',
		`longitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '经度',
		`latitude` DECIMAL(11,6) NOT NULL DEFAULT '0.0' COMMENT '纬度',
		`address` VARCHAR(200) NOT NULL DEFAULT '',
		`images` VARCHAR(1024) NOT NULL DEFAULT '[]',
		`maintenanceId` VARCHAR(36) NOT NULL DEFAULT '',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (bikeId) REFERENCES bike(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE maintenance ADD INDEX maintenance_id (id);
ALTER TABLE maintenance ADD INDEX maintenance_bikeid (bikeId);
ALTER TABLE maintenance ADD INDEX maintenance_serialno (serialNo);
ALTER TABLE maintenance ADD INDEX maintenance_maintenanceid (maintenanceId);
ALTER TABLE maintenance ADD INDEX maintenance_type (type);
ALTER TABLE maintenance ADD INDEX maintenance_result (result);
ALTER TABLE maintenance ADD INDEX maintenance_createtime (createTime);


DROP TABLE IF EXISTS `worklist`;
CREATE TABLE `worklist` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`userId` VARCHAR(36) NOT NULL DEFAULT '',
		`maintenanceId` VARCHAR(36) NOT NULL DEFAULT '',
		`taskNo` VARCHAR(50) NOT NULL DEFAULT '',
		`status` VARCHAR(16) NOT NULL DEFAULT 'new' COMMENT 'new/assigned/finished/confirmed',
		`remark` VARCHAR(200) NOT NULL DEFAULT '',
		`confirmTime` BIGINT NOT NULL DEFAULT '0',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		`updateTime` BIGINT NOT NULL DEFAULT '0',
		`deleteTime` BIGINT NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`),
		FOREIGN KEY (bikeId) REFERENCES bike(id),
		FOREIGN KEY (userId) REFERENCES user(id),
		FOREIGN KEY (maintenanceId) REFERENCES maintenance(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE worklist ADD INDEX worklist_id (id);
ALTER TABLE worklist ADD INDEX worklist_bikeid (bikeId);
ALTER TABLE worklist ADD INDEX worklist_userid (userId);
ALTER TABLE worklist ADD INDEX worklist_maintenanceid (maintenanceId);
ALTER TABLE worklist ADD INDEX worklist_taskno (taskNo);
ALTER TABLE worklist ADD INDEX worklist_status (status);
ALTER TABLE worklist ADD INDEX worklist_createtime (createTime);
ALTER TABLE worklist ADD INDEX worklist_confirmtime (confirmTime);

DROP TABLE IF EXISTS `ridemsg`;
CREATE TABLE `ridemsg` (
		`orderId` VARCHAR(36) NOT NULL DEFAULT '',
		`bikeId` VARCHAR(36) NOT NULL DEFAULT '',
		`heartRate` INTEGER NOT NULL DEFAULT '0',
		`speed` INTEGER NOT NULL DEFAULT '0' COMMENT 'meters/hour',
		`calories` INTEGER NOT NULL DEFAULT '0',
		`seconds` INTEGER NOT NULL DEFAULT '0',
		`distance` INTEGER NOT NULL DEFAULT '0' COMMENT 'in meters',
		`createTime` BIGINT NOT NULL DEFAULT '0',
		FOREIGN KEY (orderId) REFERENCES `userorder`(id),
		FOREIGN KEY (bikeId) REFERENCES bike(id)
) ENGINE=Innodb DEFAULT CHARSET=utf8;
ALTER TABLE ridemsg ADD INDEX ridemsg_orderid (orderId);
ALTER TABLE ridemsg ADD INDEX ridemsg_bikeid (bikeId);
ALTER TABLE ridemsg ADD INDEX ridemsg_createtime (createTime);


DROP TRIGGER IF EXISTS trigger_delete_user;

DELIMITER //

CREATE TRIGGER trigger_delete_user AFTER DELETE ON user FOR EACH ROW
BEGIN
DELETE FROM usercoupon WHERE userId=old.id;
END; //

DELIMITER ;
