// pages/buyDetails/buyDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valudScale: 0,  //购买框的大小
    beiClick: null,
    goodsDetail: [],  //详情页的总体数据
    imgUrl:'',//放大图片的图片地址
    showBig:false,
    clickTitle:'',
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
      fail:(err)=>{
        console.log(err)
      }
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/shop/shopById',
      data: { id:options.id },
      success: (res) => {
        this.setData({
          goodsDetail: res.data.info,
        })
        wx.hideLoading()
        console.log(res.data.info)
      }
    })

  },
  //添加购物车
  toShopCar() {
    this.setData({
      valudScale:1,
      clickTitle:'添加购物车'
    })
    
  },
  //弹出购买框
  showBox() {
    this.setData({
      valudScale: 1,
      clickTitle:'确认购买'
    })
  },
  //确认购买按钮
  submitBtn() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.beiClick == null) {
      wx.showToast({
        title: '未选择购买条件',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '添加中',
      })
      if(this.data.userId==''){
        wx.showToast({
          title: '您还没有登录~',
          icon:'none',
          duration:1000
        })
      }else{
        wx.request({
          url: "http://www.zhangdanling.cn/trolley/add",
          data: { shoppingid: this.data.goodsDetail.id, userid: this.data.userId, labelId: this.data.beiClick, buy: this.data.clickTitle == '确认购买' ? 1 : 0 },
          success: () => {
            wx.showToast({
              title: this.data.clickTitle == '确认购买' ? '购买成功' : '添加成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              valudScale: 0,
              beiClick: null
            })
          },
          fail: (err) => {
            wx.showToast({
              title: err,
            })
          }
        })
        wx.hideLoading()
      }
   
     
    }

  },
  //点击标签
  showId(event) {
    this.setData({
      beiClick: event.currentTarget.dataset.index
    })
    console.log(event.currentTarget.dataset.index)
  },
  closeBox() {
    this.setData({
      valudScale: 0,
      beiClick:null,
    })
  },
  closeBig(){
    this.setData({
      showBig: false
    })
  },
  //放大商品图片
  bigImg(event){
     this.setData({
       imgUrl:event.currentTarget.dataset.index,
       showBig:true
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