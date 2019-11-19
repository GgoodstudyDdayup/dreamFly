// pages/personalCenter/myOrder/myOrder.js
var app = getApp();
var util = require('../../../../utils/util.js');
Component({
    properties:{
        musicItem:Object,
        meanPrice:Number,
        orderid:String
    },
    /**
     * 页面的初始数据
     */
    data: {
        piaoindex: null,//当前选则的票
        is_Showform:false,//表单显示隐藏
        userName: '',
        userPhone:'',
        address:'',
        userWx:'',
        yuan_money: null,//原来的价格
        xian_money:null//现在的价格

    },
    methods:{
        choosepiao: function (e) {
            console.log(e)
            var dataset = e.currentTarget.dataset;
            this.setData({
                piaoindex: dataset.index,
                yuan_money:dataset.yuan_money,
                xian_money: dataset.xian_money,

            })
        },
        //输入用户名
        userNameInput: function (e) {
            this.setData({
                userName: e.detail.value
            })
        },
        userNamePhone: function (e) {
            this.setData({
                userPhone: e.detail.value
            })
        },
        userNameAdress: function (e) {
            this.setData({
                address: e.detail.value
            })
        },
        userNameWx: function (e) {
            this.setData({
                userWx: e.detail.value
            })
            console.log(this.data.userWx)
        },
        // 提交表单
        submit:function(){
            // 表单验证
            var data = this.data;
            if (data.userName == "" || data.userPhone == '' || data.address == '' || data.userWx == '') {
                wx.showToast({
                    title: '内容不能为空',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                });
                return false
            } else if (data.userPhone != Number && data.userPhone.length != 11) {
                wx.showToast({
                    title: '手机号错误',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                });
                return false
            };
            wx.request({
                url: app.globalData.host + '/index/shop/exchange',
                data: {
                    user_id: app.globalData.user_id,
                    music_id: this.data.musicItem.music_id,
                    ticket_id: this.data.musicItem.menpiaores[this.data.piaoindex].musicticket_id,
                    number: 1,
                    link_name: this.data.userName,
                    link_tel: this.data.userPhone,
                    link_addressed: this.data.address,
                    link_wechat: this.data.userWx,
                    order_id: this.data.orderid,
                    yuan_money:this.data.yuan_money,
                    xian_money:this.data.xian_money
                },
                success: (res) => {
                    console.log(res)
                    if(res.data.code==1){
                        wx.showToast({
                            title: '兑换成功！',
                        })
                        setTimeout(()=>{
                            wx.redirectTo({
                                url: "/pages/personalCenter/myOrder/myOrder"
                            })
                        },1000)
                    }
                }
            })
        },
        // 兑换
        duihuan:function(){
            console.log(this.data.musicItem)
            if (this.data.piaoindex==null){   
                wx.showToast({
                    title: '请选择票价',
                    icon: 'none',
                })
                return
            }else{
                this.setData({
                    is_Showform:true
                })
            };
            
        },
        close:function(){
            this.setData({
                is_Showform: false
            })
        }
    }
})