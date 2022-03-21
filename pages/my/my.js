Page({
	data: {
		nickName:"未登录",
		src:"../../images/my1.png",
	},
	getUserProfile:function(e){
		wx.getUserProfile({
			desc: '用于获取用户昵称与头像',
			success:(res)=>{
				let info = res.userInfo;
				this.setData({
					nickName:info.nickName,
					src:info.avatarUrl,
					isLogin:true
				})
			}
		})
	},
	logout:function() {
		this.setData({
			nickName:'未登录',
			src:'../../images/my1.png',
			isLogin:false
		})
	},
	onLoad: function (options) {

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

	}
})