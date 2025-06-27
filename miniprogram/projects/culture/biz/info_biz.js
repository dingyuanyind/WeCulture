/**
 * Notes: 反馈模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-03-10 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js'); 
const projectSetting = require('../public/project_setting.js'); 
const pageHelper = require('../../../helper/page_helper.js');

class InfoBiz extends BaseBiz {
 
    static getCateName(cateId) {
        let cateList = projectSetting.INFO_CATE;

        for (let k = 0; k < cateList.length; k++) {
            if (cateList[k].id == cateId) {
                return cateList[k].title;
            }
        }
        return '';
	} 
	
	/** 取得分类 */
	static getCateList() {
		let cateList = projectSetting.INFO_CATE; 

		let arr = [];
		for (let k = 0; k < cateList.length; k++) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',

				id: cateList[k].id,
				title: cateList[k].title,
				style: cateList[k].style,
				
				val: cateList[k].id, //for options
				value: cateList[k].id, //for list
			})
		}
		return arr;
	}

  
	/** 表单初始化相关数据 */
	static initFormData(id = '') {
		let cateIdOptions = InfoBiz.getCateList();

		return {
			id, 

			cateIdOptions,

			fields: projectSetting.INFO_FIELDS,

			// 表单数据  
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,   

			formForms: [],
		}

	}


}


/** 表单校验  本地 */
InfoBiz.CHECK_FORM = {   
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',

	forms: 'formForms|array',
};


module.exports = InfoBiz;