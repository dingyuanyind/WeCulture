/**
 * Notes: 后台信息管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-03-10 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const InfoModel = require('../../model/info_model.js');
const UserModel = require('../../model/user_model.js');


class AdminInfoService extends BaseProjectAdminService {

	/** 推荐首页SETUP */
	async vouchInfo(id, vouch) {
		this.AppError('[文旅]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶与排序设定 */
	async sortInfo(id, sort) {
		this.AppError('[文旅]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delInfo(id) {
		this.AppError('[文旅]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**修改状态 */
	async statusInfo(id, status) {
		this.AppError('[文旅]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/**取得分页列表 */
	async getAdminInfoList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'INFO_ORDER': 'asc',
			'INFO_ADD_TIME': 'desc'
		};
		let fields = 'INFO_COMMENT_CNT,INFO_VOUCH,INFO_QR,INFO_USER_ID,INFO_CATE_ID,INFO_CATE_NAME,INFO_ADD_TIME,INFO_ORDER,INFO_STATUS,INFO_FORMS,INFO_OBJ,user.USER_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'INFO_OBJ.desc': ['like', search] },
				{ 'INFO_OBJ.title': ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.INFO_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.INFO_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'INFO_ADD_TIME');
					break;
				}
			}
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'INFO_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		let result = await InfoModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);


		return result;
	}



}

module.exports = AdminInfoService;