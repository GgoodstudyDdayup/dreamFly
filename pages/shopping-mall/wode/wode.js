const app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ticket_id: '',
    details: {}, //砍价详情
    clock: {}, //倒计时的时间
    helpArrs: [], //帮忙砍价的记录
    my_kan: {}, //我自己的砍价
    options: {}, //传过来的数据
    userInfo: {},
    zhezhao_show: false, //遮罩是否显示
    show_mask:true,
	tgetkan:{}
  },
  countdown: function(that) { //倒计时
    var EndTime = that.data.details.end_time * 1000 || [];
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || []; //剩余时间
    // 渲染倒计时时钟
    that.setData({
      clock: this.dateformat(total_micro_second),
    });
    if (total_micro_second <= 0) {
      that.setData({
        clock: "已经截止"
      });
      return;
    }
    setTimeout(() => {
      total_micro_second -= 1000;
      this.countdown(that);
    }, 1000)
  },
  // 跳转提交订单页
  toorder: function() {
    const user_id = app.globalData.userInfo2.user_id
    const music_id = this.data.tgetkan.music_id
    const number = this.data.tgetkan.kan_num
    const money = this.data.tgetkan.end_money
    const ticket_id = this.data.tgetkan.ticket_id
    wx.navigateTo({
      url: `../../order/order?user_id=${user_id}&music_id=${music_id}&number=${number}&money=${money}&ticket_id=${ticket_id}`,
    })
  },
  dateformat: function(micro_second) { // 时间格式化输出，如11:03 25:19 每1s都会调用一次
    // 总秒数(毫秒)
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // return day * 24+ hr + "小时" + min + "分钟" + sec + "秒";
    return {
      hr: day * 24 + hr,
      min: min,
      sec: sec
    }
  },
  // 跳转砍价页面
  toguize() {
    wx: wx.navigateTo({
      url: '../guize/guize?kan_id=' + this.data.options.id,
    })
  },

  // 跳转购票页面
  toGoupiao: function(e) {
    console.log('票：', this.data.ticket_id)
    wx.navigateTo({
      url: '/pages/huodong/goupiao/goupiao?piaojia=' + e.currentTarget.dataset.piaojia + "&is_vip=" + e.currentTarget.dataset.is_vip + "&music_id=" + e.currentTarget.dataset.music_id + "&ticketname=普通票&ticket_id=" + this.data.ticket_id
    })
  },
  // 获取砍价信息
  creatOrder: function() {
    wx.request({
      url: app.globalData.host + '/index/shop/GetKanjiaInfo',
      data: {
        kan_id: this.data.options.id,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        var data = res.data;
		var getkan=Object.assign({},res.data.kanjia)
        console.log('砍价info:', data);
        data.kanjia.thumb_path =  data.kanjia.thumb_path
        data.kanjia.kan_money = data.kanjia.old_money - data.kanjia.min_money
        data.kanjia.yikan_money = data.kanjia.old_money - data.kanjia.end_money
        data.kanjia.persent = parseInt(data.kanjia.yikan_money / data.kanjia.kan_money * 100)
        this.setData({
          details: data.kanjia,
          helpArrs: data.bang_list,
          my_kan: data.my_kan,
          ticket_id: data.kanjia.musicticket4_id,
		  tgetkan:getkan
        })
        this.countdown(this);
      }
    })
  },
  //第一次进去自砍一刀，然后邀请别人砍
  help: function() {
    wx.request({
      url: app.globalData.host + '/index/shop/SetKanjiaUser',
      data: {
        kan_id: this.data.options.id,
        user_id: app.globalData.user_id,
      },
      success: (res) => {
        console.log(res, "自己进来的")
        if (res.data.code == 1) {
          wx.showToast({
            title: '帮自己砍价成功',
            icon: 'success',
            duration: 2000
          })
        }
        //请求砍价详情
        this.creatOrder()
      }
    })
  },
  // 请求个人详细信息
  getDetailsUserInfo: function() {
    wx.request({
      url: app.globalData.host + '/index/user/GetUserInfo',
      data: {
        user_id: app.globalData.user_id,
      },
      success: (res) => {
        console.log(res, "请求个人详细信息")
        if (res.data.nickname == null || res.data.nickname == '') {
          // 用户未授权
          this.setData({
            hasUserInfo: false
          })
        } else {
          // 编号补够6位
          this.setData({
            userInfo: res.data,
            zhezhao_show: false
          })
          app.globalData.userInfo2 = res.data
        }
      }
    })
  },
  //获取用户信息并保存到服务器
  getUserInfo: function(e) {
    console.log(e, "getuserinfo")
    if (e.detail.userInfo) {
      // 已授权
      app.globalData.userInfo = e.detail.userInfo;
      this.helpfriend() //帮朋友开始砍价
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
        // 调取最新的用户信息
        this.getDetailsUserInfo()
      }
    })

  },
  // 帮朋友砍
  helpfriend: function() {
    wx.login({
      success: res => {
        // 获取openid
        wx.request({
          url: app.globalData.host + '/index/user/GetOpenid',
          data: {
            code: res.code
          },
          success: (login_res) => {
            console.log('登录后login_res：', login_res)
            wx.request({
              url: 'https://www.dreamflygo.com' + '/index/shop/SetKanjiaUser',
              data: {
                kan_id: this.data.options.id,
                user_id: this.data.options.user_id,
                buser_id: login_res.data.user_id,
              },
              success: (res) => {
                console.log(res, '帮好友砍价')
                if (res.data.code == 1) {
                  wx.showToast({
                    title: '帮好友砍价成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else if (res.data.code == 0) {
                  wx.showToast({
                    title: '已帮好友砍过',
                    icon: 'none',
                    duration: 2000
                  })
                }
                this.help() //自己砍一刀
                this.creatOrder() //请求砍价详情
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('user_phone')) {
      this.setData({
        show_mask: false
      })
    }
    // 获取个人基本信息
    this.setData({
      userInfo: app.globalData.userInfo2,
      options: options
    })
    //自己进去的
    if (options.user_id == undefined) {
      this.help()
    } else {
      // 分享页进去的
      if (app.globalData.userInfo2 == null) {
        // 用户第一次通过分享页进来的未授权
        this.setData({
          zhezhao_show: true
        })
        return
      } else {
        this.helpfriend()
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    var dataset = e.target.dataset
    console.log(dataset)
    return {
      title: this.data.details.name,
      path: '/pages/shopping-mall/wode/wode?user_id=' + dataset.user_id + '&id=' + dataset.id + '&kan_money=' + dataset.kan_money,
      imageUrl: dataset.fengmian,
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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

})