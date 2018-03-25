// pages/threePages/shouPage/shouPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTag:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
  setInterval(function(){
   self.setData({
     curTag: self.data.curTag == 1 ? 2 : self.data.curTag == 2 ? 3 : self.data.curTag == 3?1:2
   })
    
  },1000)
  },
  speak:function(){
    console.log('ff')
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