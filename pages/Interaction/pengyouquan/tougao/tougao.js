// pages/personalCenter/tougao/tougao.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgSrc: '',
        videoSrc: '',
        title: '',
        content: '',
        videoPath: '',
        // piker数据
        objectArray: [],
        index: 0,
        imgPath: '' //图片预览路径
    },
    //添加图片  
    updateImg: function() {
        var that = this
        // 选择图片文件
        wx.chooseImage({
            success: (res) => {
                const tempFilePaths = res.tempFilePaths;
                // 赋值给imgPath渲染出来
                this.setData({
                    imgPath: tempFilePaths[0]
                })
                wx.showLoading({
                    title: '图片上传中',
                })
                // 上传图片
                wx.uploadFile({
                    url: app.globalData.host + '/index/index/uploadfile',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        user_id: app.globalData.user_id
                    },
                    success: (res) => {
                        wx.hideLoading()
                        wx.showToast({
                            title: '图片上传成功',
                            icon: 'success',
                            duration: 2000
                        })
                        var img_src = res.data; //返回的图片路径
                        that.setData({
                            imgSrc: app.globalData.host + img_src
                        })
                        console.log(that.data.imgSrc)
                    }
                })
            }
        })
    },
    //选择视频
    chooseVideo: function() {
        var that = this
        wx.chooseVideo({
            success: function(res) {
                console.log(res)
                that.setData({
                    videoPath: res.tempFilePath,
                })
                console.log(that.data.videoPath + '1111')
                that.uploadvideo()
            }
        })
    },
    //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
    uploadvideo: function() {
        wx.showLoading({
            title: '上传中',
        })
        var src = this.data.videoPath;
        wx.uploadFile({
            url: app.globalData.host + '/index/index/uploadfile',
            filePath: src,
            header: {
                'content-type': 'multipart/form-data'
            },
            name: 'file', //服务器定义的Key值
            formData: {
                user_id: app.globalData.user_id
            },
            success: (res) => {
                wx.hideLoading()
                wx.showToast({
                    title: '视频上传成功',
                    icon: 'success',
                    duration: 2000
                })
                this.setData({
                    videoSrc: app.globalData.host + res.data
                })
                console.log(this.data.videoSrc)
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    title: '视频上传失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    // 绑定标题
    bindinput: function(e) {
        this.setData({
            title: e.detail.value
        })
    },
    // 绑定内容
    bindtextarea: function(e) {
        this.setData({
            content: e.detail.value
        })
    },
    // 绑定音乐节
    bindPickerChange(e) {
        var index = e.detail.value;
        var music_id = this.data.objectArray[index].music_id
        this.setData({
            index: e.detail.value,
            music_id: music_id
        })
        console.log(this.data.music_id)
    },
    // 提交表单
    submit: function() {
        var data = this.data
        if ( data.title == '' || data.content == "") {
            wx.showToast({
                title: '内容不能为空',
                icon: 'none'
            })
            return
        }
        wx.request({
            url: app.globalData.host + '/index/hudong/SetQuan',
            method: "post",
            data: {
                user_id: app.globalData.user_id,
                music_id: this.data.music_id,
                title: this.data.title,
                content: this.data.content,
                img: this.data.imgSrc,
                vedio: this.data.videoSrc,
            },
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000,
                        success: function() {
                            setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }, 1500)
                        }
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.request({
            url: app.globalData.host + '/index/article/GetMusicId',
            success: (res) => {
                var data = res.data; //音乐节数据
                var qita = {
                    music_id: '',
                    name: "其他"
                } //默认是其他
                data.unshift(qita) //把其他push到数组里第一位
                this.setData({
                    objectArray: data,
                    music_id: data[0].music_id
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
    onShareAppMessage: function() {

    }
})