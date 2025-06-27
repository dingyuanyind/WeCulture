/**
 * Notes: 活动模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const InfoService = require('../service/info_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');

class InfoController extends BaseProjectController {

	/** 浏览详细 */
	async viewInfo() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new InfoService();
		let info = await service.viewInfo(input.id);

		if (info) {
			info.INFO_ADD_TIME = timeUtil.timestamp2Time(info.INFO_ADD_TIME, 'Y-M-D h:m');
		}

		return info;
	}


	/** 浏览详细 */
	async getMyInfoDetail() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new InfoService();
		let info = await service.getMyInfoDetail(this._userId, input.id);

		if (info) {

		}

		return info;
	}

	async insertInfo() {

		// 数据校验 
		let rules = {

		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new InfoService();
		let result = await service.insertInfo(this._userId, input);


		return result;

	}

	/** 更新图片信息 */
	async updateInfoForms() {

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new InfoService();
		return await service.updateInfoForms(input);
	}

	async editInfo() {

		let rules = {

		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new InfoService();
		let result = service.editInfo(this._userId, input);


		return result;
	}

	async getMyInfoList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new InfoService();
		let result = await service.getMyInfoList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].my = (this._userId === list[k].INFO_USER_ID);
			list[k].INFO_ADD_TIME = timeUtil.timestamp2Time(list[k].INFO_ADD_TIME, 'Y-M-D h:m:s');
			list[k].INFO_REPLY_TIME = timeUtil.timestamp2Time(list[k].INFO_REPLY_TIME, 'Y-M-D h:m:s');
		}

		result.list = list;

		return result;

	}

	async getInfoList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new InfoService();
		let result = await service.getInfoList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].my = (this._userId === list[k].INFO_USER_ID);
			list[k].INFO_ADD_TIME = timeUtil.timestamp2Time(list[k].INFO_ADD_TIME, 'Y-M-D h:m:s');
			list[k].INFO_REPLY_TIME = timeUtil.timestamp2Time(list[k].INFO_REPLY_TIME, 'Y-M-D h:m:s');
		}

		result.list = list;

		return result;

	}

	/** 取消*/
	async dellMyInfo() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new InfoService();
		return await service.delMyInfo(this._userId, input.id);
	}

}

module.exports = InfoController;