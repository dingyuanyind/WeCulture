/**
 * Notes: 活动实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-23 19:20:00 
 */

const BaseProjectModel = require('./base_project_model.js');

class InfoModel extends BaseProjectModel {

}

// 集合名
InfoModel.CL = BaseProjectModel.C('info');

InfoModel.DB_STRUCTURE = {
	_pid: 'string|true',
	INFO_ID: 'string|true',

	INFO_USER_ID: 'string|false',
	INFO_STATUS: 'int|true|default=1|comment=状态',

	INFO_CATE_ID: 'string|true|default=0|comment=分类',
	INFO_CATE_NAME: 'string|false|comment=分类冗余',

	INFO_ORDER: 'int|true|default=9999',

	INFO_FORMS: 'array|true|default=[]',
	INFO_OBJ: 'object|true|default={}',

	INFO_QR: 'string|false',
	INFO_VIEW_CNT: 'int|true|default=0',
	INFO_COMMENT_CNT: 'int|true|default=0',

	INFO_VOUCH: 'int|true|default=0',

	INFO_ADD_TIME: 'int|true',
	INFO_EDIT_TIME: 'int|true',
	INFO_ADD_IP: 'string|false',
	INFO_EDIT_IP: 'string|false',
};

// 字段前缀
InfoModel.FIELD_PREFIX = "INFO_";

/**
 * 状态 0=无用,1=待阅,2=有用 
 */
InfoModel.STATUS = {
	UNUSE: 0,
	COMM: 1,
	GOOD: 2,
};

InfoModel.STATUS_DESC = {
	UNUSE: '无用',
	COMM: '待阅',
	GOOD: '有用',
};



module.exports = InfoModel;