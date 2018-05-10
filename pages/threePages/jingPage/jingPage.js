// pages/goodList/goodList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: [],
    clickId: null,
    ishotPage: true,
    noSession:false,//是否登录
    userId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userId',
      success: (res)=> {
        this.setData({
          userId:res.data
        })
      },
    })
    wx.getStorage({
      key: 'username',
      success:  (res)=> {
        console.log(res.data)
        if(res.data==''){
       this.setData({
         noSession:true
       })
        }else {
          this.setData({
            noSession:false
          })
          wx.request({
            url: 'http://192.168.8.102/trolley/list',
            data: {
              userid: this.data.userId,
              buy: 1
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {

              this.setData({
                searchResult: res.data.info
              })
              console.log(res.data.info)
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



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('双方都')
    this.onLoad();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})