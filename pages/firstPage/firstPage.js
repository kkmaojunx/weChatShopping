// pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  msgM:' 登录窗口',
  username:'',
  password:'',
  loginRight:false,//是否显示我的窗口
  headImg: "http://192.168.8.102/static/images/dongwu1.jpg",
  backImg: "http://192.168.8.102/static/images/dongwu1.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  showCreat: function () {
wx.navigateTo({
  url: '../creatPage/creatPage',
})
  },
  getusername:function(e){
   this.setData({
     username:e.detail.value
   })

   
  },
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginBtn:function(){
     wx.request({
       url: 'http://192.168.8.102/user/login',
       data:{
         username:this.data.username,
         password:this.data.password
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: (res) =>{
         if(res.data.code==0){
           wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 2000
           })
         }else if(res.data.code==1){
           wx.showToast({
             title: '成功',
             icon: 'success',
             duration: 2000
           })
          this.setData({
            loginRight:true
          })
          wx.setStorage({
            key: 'username',
            data: this.data.username
          })
          wx.setStorage({
            key: 'password',
            data: this.data.password
          })
         }
        
       },
       fail:function(err){
         console.log('调用失败')
         wx.showToast({
           title: '失败',
           icon: 'none',
           duration: 2000
         })
       }
     })
  },
  changeHead() {
    wx.showActionSheet({
      itemList: ['查看大图', '更换头像'],
      success: (res) => {
        console.log(res.tapIndex)
        if (res.tapIndex == '0') {
          wx.previewImage({
            // 当前显示图片的http链接
            urls: [this.data.headImg] // 需要预览的图片http链接列表
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
  changeBack() {
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
//我的订单点击
  tipOne(){
   wx.navigateTo({
     url: '../threePages/jingPage/jingPage',
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
  console.log('下拉')
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