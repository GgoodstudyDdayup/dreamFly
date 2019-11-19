// pages/details/details.js
var app = getApp();
var utils = require('../../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 详情
        details: {},
        pinglunList: [],
        playState: false, //播放状态
        percent: '', //播放进度百分比
        updateState: false, //防止视频播放过程中导致的拖拽失效
        // 图片路径
        musicStarSrc: "/pages/images/5.png",
        musicStopSrc: "/pages/images/6.png"
    },
    toPinglun: function(e) {
        wx.navigateTo({
            url: "../pinglun/pinglun?id=" + e.target.dataset.id
        })
    },

    // 开始播放
    musicPlay: function() {
        this.setData({
            playState: true
        })
        //开始播放
        app.globalData.backgroundAudioManager.play()
        // // 获取播放进度
        app.globalData.backgroundAudioManager.onTimeUpdate(() => {
            var alltime = parseInt(app.globalData.backgroundAudioManager.duration) //总时长
            var currentTime = parseInt(app.globalData.backgroundAudioManager.currentTime) //播放进度
            var percent = parseInt(currentTime / alltime * 100)
            console.log(percent)
            if (this.data.updateState) {
                this.setData({
                    percent: percent
                })
            }
        })

    },
    // 暂停播放
    musicStop: function() {
        this.setData({
            playState: false
        })
        app.globalData.backgroundAudioManager.pause()
    },
    // 进度条拖动中禁止给slider赋值
    bindchanging: function() {
        this.setData({
            updateState: false
        })
    },
    // 拖动进度条
    changestep: function(e) {
        var alltime = parseInt(app.globalData.backgroundAudioManager.duration) //总时长
        var percent = e.detail.value //进度条百分比
        // 跳转到对应百分比歌曲位置
        var time = parseInt(percent / 100 * alltime)
        app.globalData.backgroundAudioManager.seek(time);
        // 解除禁止给slider赋值
        this.setData({
            updateState: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleInfo',
            data: {
                id: options.id,
                user_id: app.globalData.user_id
            },
            success: (res) => {


                res.data.filepath = app.globalData.host + res.data.filepath;
                res.data.thumbpath = app.globalData.host + res.data.thumbpath;
                res.data.content = utils.cutString(res.data.content);
                this.setData({
                    details: res.data
                })
                // 开启可以拖动slider
                this.setData({
                    updateState: true
                })
                // 监听音乐播放完成
                // innerAudioContext.onEnded(() => {
                //     this.setData({
                //         playState: false,
                //         percent: ''
                //     })
                // })

                var data = res.data
                if (data.filepath != app.globalData.backgroundAudioManager.src) {
                    console.log(app.globalData.backgroundAudioManager)
                  
                    app.globalData.backgroundAudioManager.title = data.title
                    app.globalData.backgroundAudioManager.epname = data.title
                    app.globalData.backgroundAudioManager.singer = '许巍'
                    app.globalData.backgroundAudioManager.coverImgUrl = data.thumbpath
                    app.globalData.backgroundAudioManager.src = data.filepath // 设置了 src 之后会自动播放
                    app.globalData.backgroundAudioManager.onCanplay((res) => { //监听音乐进入播放状态
                        app.globalData.backgroundAudioManager.pause()
                    })
                } else {
                    this.musicPlay()
                }
            }
        });
        // 获取音乐评论
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleCommentPageList',
            data: {
                article_id: options.id
            },
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].time1 = utils.formatTime(res.data[i].add_time, 'Y-M-D');
                }
                this.setData({
                    pinglunList: res.data
                })
            }
        })
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(e) {
        // 组件内传来的参数
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})