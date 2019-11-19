// pages/information/information.js
var time = require('../../../utils/util');
const app = getApp();
Component({
    properties: {},
    /**
     * 页面的初始数据
     */
    data: {
        yedian: [],
        // 点赞的图片
        weidianzan: '/pages/images/zan.png',
        yidianzan: '/pages/images/zanBG.png',
        arr: ["yinyuejie", "shipin", "yinyue", "remen", "yedian", "taobao"],
        nav: ["音乐节", "现场", "音乐", "热门推文", "夜店"],
        shareFriend: false, //分享好友弹窗
        page: 1, //页数
        keyword: '', //获取搜索框的值

        // 年份pick数据
        array: ['2019', '2020', '2021'],
        index: 0,
        year: "2019",
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
        // 获取input内容
        getinput: function(e) {
            var data = e.detail.value;
            console.log(data)
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
            console.log(e)
            var index = e.detail.value;
            var month = this.data.monthobjectArray[index].id
            this.setData({
                monthindex: index,
                month: month
            })
            console.log(this.data.month)
        },
        // 搜索功能
        downRefresh: function() {
            // page重置为1
            this.setData({
                page: 1
            });
            // 请求夜店列表
            wx.request({
                url: app.globalData.host + '/index/article/GetArticlePageList',
                data: {
                    cate_id: 8,
                    page: 1,
                    pagelimit: 2,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].create_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].create_time, 'M/D/h');
                    }
                    console.log(res.data)
                    this.setData({
                        yedian: res.data,
                    })
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 1000
                    })
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                }
            });
        },
        addMore: function() {
            // 页数+1
            this.data.page += 1;
            // 请求夜店列表
            wx.request({
                url: app.globalData.host +'/index/article/GetArticlePageList',
                data: {
                    cate_id: 8,
                    pagelimit: 2,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month,
                    page: this.data.page,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].create_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].create_time, 'M/D/h');
                    }
                    var cont = this.data.yedian.concat(res.data);
                    this.setData({
                        yedian: cont
                    })
                    wx.hideLoading();
                }
            });
        },
        getYedian: function () {
            wx.request({
                url: app.globalData.host + '/index/article/GetArticlePageList',
                data: {
                    cate_id: 8,
                    page: 1,
                    pagelimit: 2,
                    keyword: this.data.keyword,
                    year: this.data.year,
                    month: this.data.month,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].create_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].create_time, 'M/D/h');
                    }
                    this.setData({
                        yedian: res.data
                    })
                }
            })
        }
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    ready: function() {
        // 请求夜店列表
        this.getYedian()
    },



    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */

    /**
     * 用户点击右上角分享
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