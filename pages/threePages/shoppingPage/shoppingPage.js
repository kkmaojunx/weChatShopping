// pages/threePages/shoppingPage/shoppingPage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],//购物车数据
    noSession:false,
    userId:''
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
  success: (res)=> {
    if(!res.data){
      this.setData({
        noSession: true
      })
    }else{
      this.setData({
        noSession: false
      })
      wx.setNavigationBarTitle({
        title: '购物车',
      })
      wx.request({
        url: 'http://www.zhangdanling.cn/trolley/list',
        data: { userid: this.data.userId, buy: 0 },
        success: (res) => {


          console.log(res)
          this.setData({
            mainData: res.data.info
          })
        }
      })
    }
 
  },
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('刷新啦')

  },
  //删除购物车
  deleteShopList(event){
    wx.showLoading({
      title: '删除中',
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/trolley/delete',
      data:{id:event.currentTarget.dataset.index},
      success:()=>{
        wx.showToast({
          title: '删除成功',
          icon:'success',
          duration:2000
        })
        this.onLoad()
      },
      fail:(err)=>{
         wx.showToast({
           title: err,
           icon:'none',
           duration:2000
         })
      }
    })
    wx.hideLoading()
  },
  //从购物车购买
  buyInShopList(event){
wx.request({
  url: 'http://www.zhangdanling.cn/trolley/buy',
  data:{ids:event.currentTarget.dataset.index},
  success:(res)=>{
    wx.showToast({
      title: '购买成功',
      icon:'success',
      duration:1000,
    })
    this.onLoad()
  },
  fail:(err)=>{
   console.log(err)
  }
})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('chuxianla')
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