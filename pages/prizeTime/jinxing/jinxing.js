const app = getApp()
var util = require('../../../utils/util.js');

Component({
  properties: {},
  data: {
    choujiangcishu: null, //抽奖次数
    userInfo: {}, //用户信息
    choujiangma: '', //获取到的抽奖码
    now_jiang: {},
    endTime: "",
  },
  methods: {
    countdown: function(that) {
      var EndTime = that.data.now_jiang.kai_time * 1000 || [];
      var NowTime = new Date().getTime();
      var total_micro_second = EndTime - NowTime || []; //剩余时间
      // 渲染倒计时时钟
      that.setData({
        clock: this.dateformat(total_micro_second),
        endTime: that.data.now_jiang.kai_time1
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
    // 时间格式化输出，如11:03 25:19 每1s都会调用一次
    dateformat: function(micro_second) {
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
    // 获取抽奖次数
    getCishu: function() {
      wx.request({
        url: app.globalData.host + '/index/shop/GetUserChou',
        data: {
          user_id: app.globalData.user_id,
          jiang_id: this.data.now_jiang.jiang_id
        },
        success: (res) => {
          console.log(res)
          this.setData({
            choujiangcishu: res.data.num
          })
        }
      })
    },
    
    // 增加抽奖次数
    addcishu: function() {
      wx.request({
        url: app.globalData.host + '/index/shop/SetUserChou',
        data: {
          user_id: app.globalData.user_id,
          jiang_id: this.data.now_jiang.jiang_id,
          number: 0
        },
        success: (res) => {
          console.log(res)
          if (res.data.num >= 1 ){
            this.setData({
              choujiangcishu: this.data.choujiangcishu + res.data.num,
            })
          }else{
            wx.showToast({
              title: '你的分享抽奖次数用完啦~~',
              icon:'none'
            })
          }
          
        }
      })
    },
    // 点击抽奖
    getChoujiangma: function() {
      wx.request({
        url: app.globalData.host + '/index/shop/GetJiangCode',
        data: {
          user_id: app.globalData.user_id,
          jiang_id: this.data.now_jiang.jiang_id
        },
        success: (res) => {
          var arr = this.data.now_jiang.my_code;
          arr.push(res.data.code)
          this.setData({
            choujiangcishu: this.data.choujiangcishu - 1,
            "now_jiang.my_code": arr
          })
          console.log(this.data.choujiangcishu)
        }
      })
    },
    // 往期查看
    towangqi: function() {
      wx.navigateTo({
        url: "/pages/shopping-mall/wangqi-choujiang/wangqi-choujiang"
      })
    },
    // 规则
    toGuize: function() {
      wx.navigateTo({
        url: '/pages/shopping-mall/guize/guize?is_choujiang=1',
      })
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ready: function(options) {
    //获取三条数据
    wx.request({
      url: app.globalData.host + '/index/shop/GetJiangList',
      data: {
        user_id: app.globalData.user_id
        
      },
      success: (res) => {
        console.log(res)
        console.log("数据请求")
        var next_jiang = res.data.next_jiang;
        var now_jiang = res.data.now_jiang;
        var over_jiang = res.data.over_jiang;
        // 添加时间戳转换
        if (now_jiang != null) {
          // 拼接图片地址
          now_jiang.thumb_path = now_jiang.thumb_path
          // 开奖时间戳转换
          now_jiang.kai_time1 = util.formatTime(now_jiang.kai_time, 'Y/M/D');
          now_jiang.add_time = util.formatTime(now_jiang.add_time, 'Y年M月D');
        } else {
          wx.showToast({
            title: '暂无抽奖活动',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              detal: 2
            })
          }, 2200)
        }
        this.setData({
          now_jiang: now_jiang,
        })
        // 执行倒计时
        this.countdown(this);
        // 获取抽奖码次数
        this.getCishu()
      }
    });
    this.setData({
      userInfo: app.globalData.userInfo2
    })
  },
})