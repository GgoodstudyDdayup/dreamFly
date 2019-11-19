const app=getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        dataList: {
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        backgroundAudioManager:{}
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onMyEvent: function(e) {
            this.setData({
                playingSrc: e.detail.paramBtoA
            })
        },
        allplay:function(){
            app.store.setState({
                "backgroundAudioManager.is_play": true
            })
            app.store.$state.backgroundAudioManager.loopPlay()
        },
        stopplay:function(){
            app.store.setState({
                "backgroundAudioManager.is_play": false
            })
            app.store.$state.backgroundAudioManager.pause()
        }
    },
    ready:function(){
        app.store.setState({
            "backgroundAudioManager.list": this.data.dataList,
        })
        console.log(app.store.$state.backgroundAudioManager)
    }
})