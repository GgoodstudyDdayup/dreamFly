//引入store
const Store = require('./utils/store.js');
//实例化一个Store，且允许初始化一个全局状态
let store = new Store({
    state: {
        //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
        backgroundAudioManager: {}
    },
    methods: {

    },
    pageLisener: {

    }
})
//创建播放器背景播放器
var backgroundAudioManager = wx.getBackgroundAudioManager(); //创建背景音乐实例
backgroundAudioManager.list = []; //获取播放列表
backgroundAudioManager.dangqian = null; //当前播放的索引
backgroundAudioManager.is_play = false; //全部播放是否在播放
backgroundAudioManager.loopPlay = function(index) { //顺序播放
    var $index = index || 0;
    this.dangqian = $index;
    store.setState({
        "backgroundAudioManager.src" : this.list[$index].filepath,
        "backgroundAudioManager.title" : this.list[$index].title
    })
    // console.log(this)
};
backgroundAudioManager.onEnded(function() { //播放完成后播放下一首
    if (backgroundAudioManager.dangqian < backgroundAudioManager.list.length) {
        store.setState({
            "backgroundAudioManager.src": backgroundAudioManager.list[backgroundAudioManager.dangqian + 1].filepath,
            "backgroundAudioManager.title": backgroundAudioManager.list[backgroundAudioManager.dangqian + 1].title
        })
      
    }else{
        store.setState({
            "backgroundAudioManager.src": null,
        })
    }
})
store.$state.backgroundAudioManager = backgroundAudioManager
//创建播放器背景播放器结束
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // 登录
        wx.login({
            success: res => {
                // 获取openid
                wx.request({
                    url: this.globalData.host + '/index/user/GetOpenid',
                    data: {
                        code: res.code
                    },
                    success: (res) => {
                        this.globalData.openid = res.data.openid
                        this.globalData.session_key = res.data.session_key
                        this.globalData.user_id = res.data.user_id
                        this.getDetailsUserInfo()
                        // 首页信息的回调函数
                        
                    }
                })
            }
        })
        // 是否开启分享朋友圈
        wx.request({
            url: 'https://www.dreamflygo.com/index/code/quanset',
            success: (res) => {
                this.globalData.is_shareFriend = res.data.quanset
            }
        })
    },
    // 获取个人详细个人信息
    getDetailsUserInfo: function () {
      // return new Promise((resolve, reject) => {
        wx.request({
            url: this.globalData.host + '/index/user/GetUserInfo',
            data: {
                user_id: this.globalData.user_id,
            },
            success: (res) => {
                if (res.data.nickname == null || res.data.nickname == '') {
                    // console.log("未授权")
                    wx.navigateTo({
                      url: '/pages/personalCenter/personalCenter',
                    })
                  // reject('error')
                }else{
                    // console.log(res, "app.js获取个人信息")
                    this.globalData.userInfo2 = res.data
                  if (this.getUserId) {
                    this.getUserId(res)
                  }
                  // resolve(res.data)
                }
            }
        })
      // }).catch((e) => {});
    },
    store: store,
    globalData: {
        userInfo: null,
        userInfo2:null,
        openid: null,
        session_key: null,
        user_id: null,
        host: 'https://www.dreamflygo.com',
        is_shareFriend:null,//是否显示分享朋友圈
    }
})
