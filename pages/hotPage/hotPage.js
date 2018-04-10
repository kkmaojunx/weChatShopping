// pages/hotPage/hotPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickData:[],
    clickId:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       clickId:options.id
     })
     wx.request({
       url: 'http://192.168.6.102/activity/list',
       data: { id:this.data.clickId},
       success:(res)=>{
         console.log(res.data)
         this.setData({
           clickData: res.data.info[0].fileid
         })
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