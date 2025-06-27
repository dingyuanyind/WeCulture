const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const InfoBiz = require('../../../biz/info_biz.js');
const PublicBiz = require('../../../../../comm/biz/public_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!await PassportBiz.loginMustBackWin(this)) return;

		await this._loadDetail();
	},

	_loadDetail: async function (e) {

		this.setData(InfoBiz.initFormData());

		this.setData({
			isLoad: true,

		});
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


			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;
			data.cateName = InfoBiz.getCateName(data.cateId);

		 
			let result = await cloudHelper.callCloudSumbit('info/insert', data);
			let infoId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'info/', infoId, 'info/update_forms');

			let callback = () => {
				PublicBiz.removeCacheList('admin-info-list');
				PublicBiz.removeCacheList('info-list');
				wx.navigateBack();
			}
			pageHelper.showModal('发表成功！', '温馨提示', callback);


		} catch (err) {
			console.error(err);
		}
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})