// pages/threePages/shouPage/shouPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTag:1,
    hotList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    setInterval(function () {
      self.setData({
        curTag: self.data.curTag == 1 ? 2 : self.data.curTag == 2 ? 3 : self.data.curTag == 3 ? 1 : 2
      })

    }, 2000)
  },
  speak:function(){
  },
  seeHotPage:function(){
    wx.navigateTo({
      url: '../../hotPage/hotPage',
    })
  },
  intoActivePage(event){
    console.log(event.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../../hotPage/hotPage?id='+event.currentTarget.dataset.index,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  wx.request({
    url: 'http://192.168.6.102/activity/list',
    success:(res)=>{
      console.log(res.data.info)
    this.setData({
      hotList:res.data.info
    })
    }
  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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