// pages/lucky/lucky.js
var app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["未开始", "进行中"],
    // , "往期"
    tabindex: 0,
	zhezhao_show: true, //遮罩是否显示
	show_mask: true,
	navdata:[],
	imglist:['../images/wei.png','../images/ing.png','../images/end.png'],
	clist:0
  },
  //获取用户信息并保存到服务器
  getUserInfo: function(e) {
    let that = this;
    console.log(e, "getuserinfo")
    if (e.detail.userInfo) {
      // 已授权
      app.globalData.userInfo = e.detail.userInfo;
      that.setData({
        zhezhao_show:false
      })
    } else {
      console.log("拒绝授权")
      return
    }
    // 将微信信息存到服务器
    wx.request({
      url: app.globalData.host + '/index/user/SetUserInfo',
      data: {
        city: app.globalData.userInfo.city,
        country: app.globalData.userInfo.country,
        gender: app.globalData.userInfo.gender,
        nickname: app.globalData.userInfo.nickName,
        province: app.globalData.userInfo.province,
        openid: app.globalData.openid,
        head_img: e.detail.userInfo.avatarUrl
      },
      success: (res) => {
        console.log(res)
      }
    })

  },
  onShareAppMessage: function(e) {
    console.log(e)
    return {
      title: this.data.now_jiang.title,
      path: '/pages/prizeTime/prizeTime',
      imageUrl: this.data.now_jiang.thumb_path,
    }
  },
  getPhone(e) {
    let that = this;
    console.log('获取手机号e:', e);
    console.log('globalData:', app.globalData);
    wx.request({
      url: app.globalData.host + '/index/index/GetMusiciPhone',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        user: app.globalData.user_id,
      },
      success: (res) => {
        console.log('获取手机号返回结果:', res);
        if (res.data.code == '1') {
          that.setData({
            show_mask: false
          })
          wx.setStorageSync('user_phone', res.data.data)
        } else {
          wx.showModal({
            title: '失败',
            content: '授权失败~',
          })
        }
      }
    })
  },
  // 切换tab栏
  tabchange: function (e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
  },
  // 切换tab栏
  listchange: function (e) {
    this.setData({
      clist: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var that=this
	  var newary=Object.assign([]);
	if (app.globalData.userInfo2) {
	  that.setData({
	    zhezhao_show: false
	  })
	}
	if (wx.getStorageSync('user_phone')) {
	  this.setData({
	    show_mask: false
	  })
	}
	new Promise((rev)=>{
	wx.request({
	  url: app.globalData.host + '/index/shop/GetJiangList',
	  data: {
	    user_id: app.globalData.user_id
	  },
	  success: (res) => {
     console.log(res);
	    var next_jiang = res.data.next_jiang;
	    var now_jiang = res.data.now_jiang;
	    var over_jiang = res.data.over_jiang;
	    // 添加时间戳转换
	    if (next_jiang != null) {
	      next_jiang.thumb_path =  next_jiang.thumb_path
	      next_jiang.add_time = util.formatTime(next_jiang.add_time, 'M月D日');
	    }
	    if (now_jiang != null) {
	      // 拼接图片地址
	      now_jiang.thumb_path = now_jiang.thumb_path
	      // 开奖时间戳转换
	      now_jiang.kai_time1 = util.formatTime(now_jiang.kai_time, 'Y/M/D');
	      now_jiang.add_time = util.formatTime(now_jiang.add_time, 'M月D日');
	    }
	    if (over_jiang != null) {
	      over_jiang.kai_time = util.formatTime(over_jiang.kai_time, 'M月D日');
	      // 拼接图片地址
	      over_jiang.thumb_path =   over_jiang.thumb_path
	    }
	    this.setData({
	      next_jiang: next_jiang,
	      now_jiang: now_jiang,
	      over_jiang: over_jiang,
	      show: 1
	    })
		newary.push(next_jiang,now_jiang)
		this.setData({
			navdata:newary
		})
			rev()
	  }
	});
	}).then(()=>{
		var newart=Object.assign([],that.data.navdata)
		wx.request({
		      url: app.globalData.host + '/index/shop/yikaijiang',
		      success: (res) => {
		        for (var i = 0; i < res.data.length; i++) {
		          res.data[i].thumb_path =  res.data[i].thumb_path;// 拼接地址
		          // res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');
		          res.data[i].time2 = util.formatTime(res.data[i].kai_time, 'Y-M-D');
		        }
		        newart.push(res.data)
				this.setData({
					navdata:newart
				})
		      }
		    });
	})
	
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
  // 规则
  toGuize: function () {
    wx.navigateTo({
      url: '/pages/shopping-mall/guize/guize?is_choujiang=1',
    })
  }
})