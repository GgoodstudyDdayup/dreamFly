// pages/videopage/video.js

const app = getApp();
var time = require('../../../utils/util');

Component({
    properties: {},
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        liveVideo: '', //直播地址
        // 点赞的图片
        weidianzan: '/pages/images/zan.png',
        yidianzan: '/pages/images/zanBG.png',
        page: 1,
        arr: ["yinyuejie", "shipin", "yinyue", "remen", "yedian", "taobao"],
        tabbar: {},
        nav: ["音乐节", "现场", "音乐", "热门推文", "夜店", "淘宝淘宝"],
        src: '',
        keyword: '', //获取搜索框的值
        // 年份pick数据
        array: ['2019', '2020', '2021'],
        index: 0,
        year: "2019",
        page: 1,
        //piker数据结束
        // 月份pick数据
        monthobjectArray: [{
                id: "",
                name: '全年'
            },
            {
                id: 1,
                name: '1月'
            },
            {
                id: 2,
                name: '2月'
            },
            {
                id: 3,
                name: '3月'
            },
            {
                id: 4,
                name: '4月'
            },
            {
                id: 5,
                name: '5月'
            },
            {
                id: 6,
                name: '6月'
            },
            {
                id: 7,
                name: '7月'
            },
            {
                id: 8,
                name: '8月'
            },
            {
                id: 9,
                name: '9月'
            },
            {
                id: 10,
                name: '10月'
            },
            {
                id: 12,
                name: '11月'
            },
            {
                id: 12,
                name: '12月'
            }
        ],
        monthindex: 0,
        month: ""
        //月份piker数据结束
    },

    methods: {
        // 播放视频
        videoPlay(e) {
            this.setData({
                curr_id: e.currentTarget.dataset.id,
            })
        },
        toDetails: function(e) {
            wx.navigateTo({
                url: 'details/details?id=' + e.target.dataset.videoid,
            })
        },
        // 获取input内容
        getinput: function(e) {
            var data = e.detail.value;
            this.setData({
                keyword: data
            })
        },
        // piker组件
        bindPickerChange(e) {
            var index = e.detail.value;
            var year = this.data.array[index]
            this.setData({
                index: index,
                year: year
            })
            console.log(this.data.year)
        },
        // 月份piker组件
        bindPickerChangeMonth(e) {
            var index = e.detail.value;
            var month = this.data.monthobjectArray[index].id
            this.setData({
                monthindex: index,
                month: month
            })
            console.log(this.data.month)
        },
        /**
        * 加载更多
        */
        addMore: function () {
            // 页数+1
            this.data.page += 1;
            // 获取视频列表
            wx.request({
                url: app.globalData.host + '/index/article/GetArticlePageList',
                data: {
                    cate_id: 2,
                    user_id: app.globalData.user_id,
                    page: this.data.page,
                    pagelimit: 2,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month
                },
                success: (res) => {
                    console.log(res)
                    for (var i = 0; i < res.data.length; i++) {
                        // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D/h');
                    }
                    var cont = this.data.dataList.concat(res.data);
                    this.setData({
                        dataList: cont
                    })
                    wx.hideLoading();
                }
            })
        },
        downRefresh: function () {
            // page重置为1
            this.setData({
                page: 1
            });
            // 获取视频列表
            wx.request({
                url: app.globalData.host + '/index/article/GetArticlePageList',
                data: {
                    cate_id: 2,
                    page: 1,
                    pagelimit: 2,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month,
                    user_id: app.globalData.user_id,
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D/h');
                    }
                    this.setData({
                        dataList: res.data
                    });
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 1000
                    })
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                }
            })
        },
        getVideo:function(){
            wx.request({
                url: app.globalData.host + '/index/article/GetArticlePageList',
                data: {
                    cate_id: 2,
                    page: 1,
                    pagelimit: 5,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].create_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].create_time, 'M/D/h');
                    }
                    this.setData({
                        dataList: res.data
                    })
                }
            })
        },
        toLive:function(){
            wx.navigateTo({
                url: '/pages/template/video/live-video/live-video',
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    ready: function(options) {
        // 获取视频列表
        this.getVideo()
        // 获取直播
        wx.request({
            url: app.globalData.host + '/index.php/index/zhibo/get_zhibo_url',
            success: (res) => {
                console.log(res.data.address)
                // this.setData({
                //     liveVideo: res.data.address.lld
                // })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    /**
     * 用户点击分享
     */
    onShareAppMessage: function(e) {
        // 组件内传来的参数
        console.log(e);
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})