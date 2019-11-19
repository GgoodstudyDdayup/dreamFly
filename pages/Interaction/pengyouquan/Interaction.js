// pages/Interaction/Interaction.js
var app = getApp();
var time = require('../../../utils/util.js');
Component({
    properties: {
        dataList: Array,

    },
    /**
     * 页面的初始数据
     */
    data: {
      
      
    },

    methods:{
        // 跳转投稿
        toTougao: function () {
            wx.navigateTo({
                url: '/pages/Interaction/pengyouquan/tougao/tougao'
            })
        },
        // 跳转详情
        toDetails: function (e) {
            wx.navigateTo({
                url: '/pages/Interaction/pengyouquan/details/details?quan_id=' + e.currentTarget.dataset.quan_id
            })
        },
        // 跳转音乐节
        toMusic: function (e) {
            wx.navigateTo({
                url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.music_id,
            })
        },
        // 关注
        // guanzhu:function(e){
        //   wx.request({
        //     url: app.globalData.host+'/index/hudong/SetGuan',
        //     data:{
        //       status:1,
        //       user_id:app.globalData.user_id,
        //       buser_id: e.currentTarget.dataset.uid
        //     },
        //     success:(res)=>{
        //       var index = e.currentTarget.dataset.index;
        //       var is_guan = "dataList[" + index +'].is_guan';
        //       this.setData({
        //         [is_guan]:true
        //       })
        //     }
        //   })
        // },
        //取消关注
        qxguanzhu: function (e) {
            wx.request({
                url: app.globalData.host + '/index/hudong/SetGuan',
                data: {
                    status: 0,
                    user_id: app.globalData.user_id,
                    buser_id: e.currentTarget.dataset.uid
                },
                success: (res) => {
                    var index = e.currentTarget.dataset.index;
                    var is_guan = "dataList[" + index + '].is_guan';
                    this.setData({
                        [is_guan]: false
                    })
                }
            })
        }
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    ready: function() {
       
    },
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