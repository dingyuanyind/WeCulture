/**
 * Notes: 文件处理相关函数
 * Ver : CCMiniCloud Framework 2.7.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-02-05 04:00:00 
 */
const pageHelper = require('./page_helper.js');
const timeHelper = require('./time_helper.js');

async function openFile(fileNode) {

	let url = fileNode.path;
	let type = fileNode.type;
	let name = fileNode.name;

	let ext = url.toLowerCase().substring(url.lastIndexOf(".") + 1);

	if (ext == 'doc' || ext == 'docx' || ext == 'xls' || ext == 'xlsx' || ext == 'ppt' || ext == 'pptx' || ext == 'pdf') {
		openDoc(name, url, '.' + ext, true);
	}
	else if (type == 'image') {
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: [url]
		});
	}
	else if (type == 'video') {
		wx.previewMedia({
			current: 0, // 当前显示图片的http链接  
			sources: [{
				url: url, // 需要预览的视频http链接列表  
				type: 'video'
			}]
		}) 
	}
	else
		pageHelper.showModal('不支持预览此文件');
}

// directName:是否用name作为文件名
async function openDoc(name, url, ext = '.xlsx', directName = false) {
	if (!url.includes('cloud://') && (url.includes('tmp') || url.includes('temp') || url.includes('wxfile'))) {
		// 本地临时文件直接打开
		wx.openDocument({
			showMenu: true,
			filePath: url,
			success: function (res) {
				console.log('打开文档成功');
			}
		});

		return;
	}

	else if (url.includes('cloud://')) {
		const cloudHelper = require('./cloud_helper.js');
		url = await cloudHelper.getTempFileURLOne(url);
	}


	wx.showLoading({
		title: '文件下载中',
	});

	let filePath = directName ? wx.env.USER_DATA_PATH + '/' + name : wx.env.USER_DATA_PATH + '/' + name + timeHelper.time('YMDhms') + ext;
	wx.downloadFile({
		url,
		//fileID:' ',
		filePath,
		success: function (res) {
			wx.hideLoading();
			if (res.statusCode != 200)
				return pageHelper.showModal('打开文件失败，请重试或者采取别的下载方式');

			const filePath = res.filePath;
			wx.openDocument({
				showMenu: true,
				filePath: filePath,
				success: function (res) {
					console.log('打开文档成功');
				}
			})
		},
		fail: function (err) {
			wx.hideLoading();
			console.log(err);
			pageHelper.showModal('打开文件失败，请重试或者采取别的下载方式');
		}
	})
}

module.exports = {
	openDoc,
	openFile
}