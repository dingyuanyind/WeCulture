module.exports = { //culture
	PROJECT_COLOR: '#AD683A',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#AD683A',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		mobile: 'formMobile|must|mobile|name=手机',
		pic: 'formPic|must|string|name=头像',
		forms: 'formForms|array'
	},


	NEWS_NAME: '内容管理',
	NEWS_CATE: [
		{ id: 1, title: '公告' },
		{ id: 2, title: '服务' },

	],
	NEWS_FIELDS: [
	],

	ACTIVITY_NAME: '活动',
	ACTIVITY_CATE: [
		{ id: 1, title: '文旅活动' },
		{ id: 2, title: '旅行搭子' },
		{ id: 3, title: '体育活动' },
		{ id: 4, title: '读书活动' },
		{ id: 5, title: '亲子活动' },
		{ id: 6, title: '其他' },
	],
	ACTIVITY_FIELDS: [
		{ mark: 'time', title: '预计时长(小时)', type: 'digit', must: true },
		{ mark: 'fee', title: '活动费用', type: 'text', must: true },
		{ mark: 'desc', title: '活动内容', type: 'content', must: true },
		{ mark: 'cover', title: '活动封面', type: 'image', min: 1, max: 8, must: true },
	],
	ACTIVITY_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30 },
		{ mark: 'phone', type: 'mobile', title: '手机', must: true, edit: false }
	],


	COMMENT_NAME: '评论',
	COMMENT_FIELDS: [
		{ mark: 'content', title: '评论内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },

	],

	PRODUCT_NAME: '旅行攻略',
	PRODUCT_CATE: [
		{ id: 1, title: '线路' },
		{ id: 2, title: '吃喝' },
		{ id: 3, title: '住宿' },
		{ id: 4, title: '购物' },
		{ id: 5, title: '其他' },
	],
	PRODUCT_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', len: 1, must: true },
		{ mark: 'desc', title: '简介', type: 'textarea', must: true, max: 100 },
		{ mark: 'content', title: '详情', type: 'content', must: true },
	],


	INFO_NAME: '游记',
	INFO_CATE: [
		{ id: 1, title: '美景' },
		{ id: 2, title: '美食' },
		{ id: 3, title: '美物' },
		{ id: 4, title: '美居' },
		{ id: 5, title: '其他' },
	],
	INFO_FIELDS: [
		{ mark: 'title', title: '标题', type: 'text', must: true, min: 5, max: 30 },
		{ mark: 'desc', title: '内容', type: 'content', must: true },
		{ mark: 'cover', title: '封面图', type: 'image', must: false, min: 1, max: 1 },
	],
}