DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
		`id` VARCHAR(36) NOT NULL DEFAULT '',
		`role` INTEGER NOT NULL DEFAULT '7' COMMENT '4:super,3:admin,1:audit',
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

DROP TRIGGER IF EXISTS trigger_delete_account;

DELIMITER //

DELIMITER ;
