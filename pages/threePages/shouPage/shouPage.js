// pages/threePages/shouPage/shouPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTag:0,
    hotList:[],//下方活动
    lunImg:[],//轮播图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    setInterval(function () {
      self.setData({
        curTag: self.data.curTag == 0 ? 1 : self.data.curTag == 1 ? 2 : self.data.curTag == 2 ? 0 : 1
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
    url: 'http://www.zhangdanling.cn/activity/list',
    success:(res)=>{
    this.setData({
      hotList:res.data.info.splice(3,res.data.info.length-3),
      lunImg:res.data.info.splice(0,3)
    })
    }
  })
  },
  //分类点击
  hotOne(event){
    wx.navigateTo({
      url: '../../goodList/goodList?hot=' + event.currentTarget.dataset.index +"&searchValue=null",
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