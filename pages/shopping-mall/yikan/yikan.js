// pages/shopping-mall/yikan/yikan.js

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        countDownList: [],
        actEndTimeList: [],
        dataList: []
    },
    //砍价详情
    toWode: function(e) { 
        console.log(e)
        wx: wx.navigateTo({
            url: '../wode/wode?id=' + e.currentTarget.dataset.kan_id,
        })
    },
    //小于10的格式化函数
    timeFormat(param) { 
        return param < 10 ? '0' + param : param;
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = this.data.actEndTimeList;
        let countDownArr = [];

        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
            let endTime = o;
            let obj = null;
            // 如果活动未结束，对时间进行处理
            if (endTime - newTime > 0) {
                let time = (endTime - newTime) / 1000;
                // 获取天、时、分、秒
                let day = parseInt(time / (60 * 60 * 24));
                let hou = parseInt(time % (60 * 60 * 24) / 3600);
                let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                obj = {
                    day: this.timeFormat(day),
                    hou: this.timeFormat(hou),
                    min: this.timeFormat(min),
                    sec: this.timeFormat(sec)
                }
            } else { //活动已结束，全部设置为'00'
                obj = {
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                }
            }
            countDownArr.push(obj);
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            countDownList: countDownArr
        })
        setTimeout(this.countDown, 1000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // 获取我的砍价
        wx.request({
            url: app.globalData.host + '/index/shop/GetKanjiaList',
            data: {
                user_id: app.globalData.user_id
            },
            success: (res) => {
                var currentTime = Math.round(new Date() / 1000)
                var data = res.data
                for (var i = 0; i < data.length; i++) {
                    data[i].thumb_path =   data[i].thumb_path;
                    data[i].kan_money = data[i].old_money - data[i].end_money;
                    if (currentTime>data[i].end_time){
                        data[i].is_jieshu=1
                    }else{
                        data[i].is_jieshu = 0

                    }
                }
                console.log(data)
                this.setData({
                    dataList: data
                })
                let endTimeList = [];
                // 将活动的结束时间参数提成一个单独的数组，方便操作
                data.forEach(o => {
                    endTimeList.push(o.end_time * 1000)
                })
                this.setData({
                    actEndTimeList: endTimeList
                });
                // 执行倒计时函数
                this.countDown();
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
    onShareAppMessage: function() {

    }
})