// pages/threePages/mePage/mePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: "http://tmp/wx6bc69f050bfce54e.o6zAJs1H90tnildSj3TU-BTVJOek.h2eaFVXw4E9c4ab3e7435769d68ef52208e349e5dd5b.jpg",
    backImg: "http://tmp/wx6bc69f050bfce54e.o6zAJs1H90tnildSj3TU-BTVJOek.h2eaFVXw4E9c4ab3e7435769d68ef52208e349e5dd5b.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //更换头像
  changeHead(){
    wx.showActionSheet({
      itemList: ['查看大图', '更换头像'],
      success: (res) =>{
        console.log(res.tapIndex)
        if (res.tapIndex=='0'){
          wx.previewImage({
            // 当前显示图片的http链接
            urls: [this.data.headImg] // 需要预览的图片http链接列表
          })
        } else if (res.tapIndex == '1'){
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success:  (res)=> {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              this.setData({
                headImg: tempFilePaths[0]
              })
            }
          })
        }
    
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //更换背景
  changeBack(){
    wx.showActionSheet({
      itemList: ['查看大图', '更换背景'],
      success: (res) => {
        console.log(res.tapIndex)
        if (res.tapIndex == '0') {
          wx.previewImage({
            // 当前显示图片的http链接
            urls: [this.data.backImg] // 需要预览的图片http链接列表
          })
        } else if (res.tapIndex == '1') {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              this.setData({
                backImg: tempFilePaths[0]
              })
            }
          })
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
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