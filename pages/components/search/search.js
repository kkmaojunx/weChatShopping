// pages/components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    colorChange:'#ccc',
    searchColor:'#aaa',
    searchValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeColor:function(){
      this.setData({
        colorChange :'#000',
        searchColor:'#000',
        
      })
    },
    rebackColor(e){
      this.setData({
        colorChange: '#ccc',
        searchColor: '#aaa',
        searchValue:e.detail.value
      })
    },
    startSearch(){
      wx.request({
        url: 'http://192.168.6.102/shop/search',
        data: {
          title: this.data.searchValue
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          console.log(res)
        },
        fail: function (err) {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})
