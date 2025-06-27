/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2025-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const ActivityModel = require('../model/activity_model.js');
const InfoModel = require('../model/info_model.js');
const ProdcutModel = require('../model/product_model.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {

		let fields = 'ACTIVITY_STATUS,ACTIVITY_TITLE,ACTIVITY_CATE_NAME,ACTIVITY_OBJ.cover';
		let where = {
			ACTIVITY_STATUS: 1,
			ACTIVITY_VOUCH: 1
		}
		let activityList = await ActivityModel.getAll(where, fields, { 'ACTIVITY_ADD_TIME': 'desc' }, 10);

		fields = 'PRODUCT_STATUS,PRODUCT_TITLE,PRODUCT_CATE_NAME,PRODUCT_OBJ.cover';
		where = {
			PRODUCT_STATUS: 1,
			PRODUCT_VOUCH: 1
		}
		let productList = await ProdcutModel.getAll(where, fields, { 'PRODUCT_ADD_TIME': 'desc' }, 10);


		let UserModel = require('../model/user_model.js');
		let joinParams = {
			from: UserModel.CL,
			localField: 'INFO_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		fields = 'INFO_OBJ.cover,INFO_OBJ.title,INFO_CATE_NAME,user.USER_NAME,user.USER_PIC';
		where = {
			INFO_STATUS: 1,
			INFO_VOUCH: 1
		}
		let infoList = await InfoModel.getListJoin(joinParams, where, fields, { 'INFO_ADD_TIME': 'desc' });
		infoList = infoList.list;

		return { activityList, infoList, productList }

	}
}

module.exports = HomeService;