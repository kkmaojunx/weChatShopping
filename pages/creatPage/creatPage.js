// pages/creatPage/creatPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  msgM:'注册窗口',
  username: '',
  password: '',
  repassword:'',
  userStatus:'',//辨识买家卖家
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  showCreat: function () {
  wx.navigateBack({
    delta:1
  })
  },
  getusername: function (e) {
    this.setData({
      username: e.detail.value
    })


  },
  getrepassword:function(e){
    this.setData({
      repassword: e.detail.value
    })
  },
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toCreat: function () {
    if(this.data.password!==this.data.repassword){
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      wx.showActionSheet({
        itemList: ['我是买家', '我是卖家'],
        success: (res) => {
          console.log(res.tapIndex)
          if (res.tapIndex == '0') {
            this.setData({
              userStatus:2
            })
          } else if (res.tapIndex == '1'){
            this.setData({
              userStatus: 1
            })
          }
            wx.showLoading({
              title: '注册中',
              mask:'true'
            })
            wx.request({
              url: 'http://www.zhangdanling.cn/user/register',
              data: {
                username: this.data.username,
                password: this.data.password,
                userStatus: this.data.userStatus
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: (res) => {
                wx.hideLoading()
                if (res.data.code == 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                } else if (res.data.code == 1) {
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 2000

                  )
                }


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
      })
 
    }
    
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