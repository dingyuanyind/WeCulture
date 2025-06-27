const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js'); 
const InfoBiz = require('../../../biz/info_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLogin: true,
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();

		if (options && options.my) {
			this.setData({
				isLoad: true,
				_params: {
					sortType: 'my',
					sortVal: 'my',

				}
			})
		}
		else {
			this.setData({ isLoad: true })
		}

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
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {


		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '时间▽', type: 'timedesc', value: '' },
			{ label: '时间△', type: 'timeasc', value: '' },
		];

		let sortItems1 = [
			{ label: '分类', type: '', value: '' },
		];
		sortItems1 = sortItems1.concat(InfoBiz.getCateList());

		this.setData({
			search: '',
			sortItems: [sortItems1],
			sortMenus,
		});

	},

	bindDelTap: async function (e) {

		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('info/my_info_del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);
	}
})