const pageHelper = require('../../../helper/page_helper.js');
const fileHelper = require('../../../helper/file_helper.js'); 

Component({
	options: {
		addGlobalClass: true
	},

	/**
	 * 组件的属性列表
	 */
	properties: {
		fileList: {  // {path,ext,name,type}
			type: Array,
			value: []

		},
		fileMax: { // 文件个数上限
			type: Number,
			value: 5,
		},
		title: {
			type: String,
			value: '文件上传',
		},
		must: { //是否必填
			type: Boolean,
			value: true,
		},
		isCheck: { //是否做文件内容校验
			type: Boolean,
			value: true,
		},
		uploadSize: { // 文件大小M
			type: Number,
			value: 100,
		},
		isShowSize: { //是否提示文件尺寸
			type: Boolean,
			value: true,
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		//fileList:[] 
	},


	/**
	 * 生命周期方法
	 */
	lifetimes: {
		attached: function () {

		},

		ready: function () {

		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 选择上传文件 
		bindChooseFileTap: function (e) {
			if (this.data.fileList.length >= this.data.fileMax) return pageHelper.showModal('最多可上传' + this.data.fileMax + '个文件');

			wx.chooseMessageFile({
				count: 1,
				type: 'file',
				//extension: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'png'],file时无效，仅能打开文档
				success: async (res) => {
					// console.log(res)
					for (let k = 0; k < res.tempFiles.length; k++) {
						let size = res.tempFiles[k].size;
						let path = res.tempFiles[k].path;

						//console.log(res.tempFiles[k]);

						let fileMaxSize = 1024 * 1000 * this.data.uploadSize;
						if (size > fileMaxSize) {
							return pageHelper.showNoneToast('单个文件大小不能超过 ' + this.data.uploadSize + 'M', 3000);
						}


						this.setData({
							fileList: this.data.fileList.concat({
								path,
								name: res.tempFiles[k].name,
								type: res.tempFiles[k].type,
								ext: this.getExt(path)
							})
						});
						this.triggerEvent('upload', this.data.fileList);

					}

				}
			});
		},

		bindPreviewFileTap: function (e) {
			wx.previewImage({
				urls: this.data.fileList,
				current: e.currentTarget.dataset.url
			});
		},

		bindOpenTap: async function (e) {
			let idx = pageHelper.dataset(e, 'idx');
			return fileHelper.openFile(this.data.fileList[idx]);
		},
 
		// 获取文件类型
		getExt: function (fileName) {

			if (!fileName) return 'other';
			if (!fileName.includes('.')) return 'other';

			fileName = fileName.toLowerCase();
			let suffix = fileName.substring(fileName.lastIndexOf(".") + 1);

			if (suffix == 'png' || suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif' || suffix == 'svg')
				return 'image';

			if (suffix == 'doc' || suffix == 'docx')
				return 'word';

			if (suffix == 'xls' || suffix == 'xlsx')
				return 'excel';

			if (suffix == 'ppt' || suffix == 'pptx')
				return 'ppt';

			if (suffix == 'txt')
				return 'txt';

			if (suffix == 'pdf')
				return 'pdf';

			if (suffix == 'zip' || suffix == 'rar')
				return 'zip';

			if (suffix == 'mp4' || suffix == 'mov' || suffix == 'm4v' || suffix == '3gp' || suffix == 'avi' || suffix == 'm3u8' || suffix == 'webm')
				return 'video';

			if (suffix == 'm4a' || suffix == 'mp3' || suffix == 'aac' || suffix == 'wav')
				return 'audio';

			return 'other';
		},

		// 	删除文件 
		catchDelTap: function (e) {
			let idx = pageHelper.dataset(e, 'idx');

			let cb = () => {
				this.data.fileList.splice(idx, 1);
				this.setData({
					fileList: this.data.fileList
				});
				this.triggerEvent('upload', this.data.fileList);
			}
			pageHelper.showConfirm('确定要删除该文件吗？', cb);
		},

		// 	修改文件名 
		catchEditTap: function (e) {
			let idx = pageHelper.dataset(e, 'idx');

			let name = this.data.fileList[idx].name;

			let ext = name.substring(name.lastIndexOf("."));
			let content = name.substring(0, name.lastIndexOf("."));


			let that = this;
			wx.showModal({
				title: '修改名称',
				content,
				editable: true,
				success(res) {
					if (res.cancel) return;

					if (!res.content || !res.content.trim()) return pageHelper.showModal('名称不能为空');
					that.data.fileList[idx].name = res.content.trim() + ext;
					that.setData({
						fileList: that.data.fileList
					});
					that.triggerEvent('upload', that.data.fileList);

				}
			})
		},

	}
})