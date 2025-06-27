const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const InfoBiz = require('../../../biz/info_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		await this._loadDetail();
	},

	_loadDetail: async function (e) {

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(InfoBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let info = await cloudHelper.callCloudData('info/my_info_detail', params, opt);
		if (!info) {
			this.setData({
				isLoad: null
			})
			return;
		};
		this.setData({
			isLoad: true,
			formCateId: info.INFO_CATE_ID,
			formOrder: info.INFO_ORDER,
			formForms: info.INFO_FORMS
		});
	},

	bindMapTap: function (e) {
		InfoBiz.selectLocation(this);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},


	bindSubmitTap: async function (e) {
		try {
			let data = this.data;

			// 数据校验   
			data = validate.check(data, InfoBiz.CHECK_FORM, this);
			if (!data) return;

			let id = this.data.id;

			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;
			data.id = id;
			data.cateName = InfoBiz.getCateName(data.cateId);

			let opts = {
				title: '提交中'
			}
			await cloudHelper.callCloudSumbit('info/edit', data, opts).then(res => {
				let node = {
					INFO_CATE_NAME: data.cateName,
					'INFO_OBJ': { 
						'title': dataHelper.getDataByKey(forms, 'mark', 'title').val, 
					}
				}
				pageHelper.modifyPrevPageListNodeObject(id, node);

			});

			await cloudHelper.transFormsTempPics(forms, 'info/', id, 'info/update_forms');

			let callback = () => {
				wx.navigateBack();
			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.error(err);
		}
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})