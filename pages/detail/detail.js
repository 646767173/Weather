// pages/detail/detail.js
Page({
	data: {
		region:['广东省','广州市','海珠区'],
		region_id:'',
		daily:[],
		indexDaily:[],
		newDaliy:[],
	},
	// 改变城市的函数
	changeRegion:function(e){
		this.setData({
			region:e.detail.value,
		})
		wx.setStorage({
			key:'city',
			data:e.detail.value,
		});
		wx.setStorage({
			key:'hasStorage',
			data:true
		});
		this.getWeather();
	},
	// 查找城市天气的函数
	getWeather:function(){
		var that = this;
		wx.request({ // 1.寻找城市ID
			url: 'https://geoapi.heweather.net/v2/city/lookup',
			data:{
				location:that.data.region[2],
				key:'90e04bdb5b5a4a61b0bdc8879c7fe695'
			},
			success:function(res){//如果城市ID找到了，则寻找对应ID城市详细信息
				that.setData({
					region_id:res.data.location[0].id //将城市ID存储起来
				})

				wx.request({ //寻找城市的近一周天气
					url: 'https://devapi.qweather.com/v7/weather/7d?',
					data:{
						location:that.data.region_id,
						key:'90e04bdb5b5a4a61b0bdc8879c7fe695'
					},
					success:function(res){
						// console.log(res.data);
						that.setData({
							daily:res.data.daily,
						})
						var notes = res.data.daily;
						notes.splice(0,1);
						that.setData({
							newDaliy:notes
						})
					}
				})

				wx.request({ //寻找城市的天气生活指数
					url: 'https://devapi.qweather.com/v7/indices/1d?type=1,2,3,5,9,11',
					data:{
						location:that.data.region_id,
						key:'90e04bdb5b5a4a61b0bdc8879c7fe695'
					},
					success:function(res){
						// console.log(res.data);
						that.setData({
							indexDaily:res.data.daily,
						})
					}
				})

			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.clearStorage();
		this.getWeather();
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
		if(wx.getStorageSync('hasStorage'))
			this.setData({
				region:wx.getStorageSync('city'),
			})
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