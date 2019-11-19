const app = getApp()
var util = require('../../../utils/util.js');

Component({
    /**
     * 页面的初始数据
     */
    properties: {
        over_jiang: Object,
    },
    data: {
        
    },
    methods: {
        toGuize: function() {
            wx.navigateTo({
                url: '/pages/shopping-mall/guize/guize',
            })
        },
    },
    ready:function(){
    }
})