// pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meDate: {},//我的界面全部信息
    userId: null,
    msgM: ' 登录窗口',
    username: '',
    password: '',
    dates: '1996-02-20',
    content:'',
    phone:'',
    loginRight: false,//是否显示我的窗口
    headImg: "http://www.zhangdanling.cn/static/images/dongwu1.jpg",
    backImg: "http://www.zhangdanling.cn/static/images/dongwu1.jpg",
    showPersonal: false,//个人信息显示
    changePwd: false,//修改密码显示
    getAdress: false,//收货地址点击
    isWriteAdd: false,//是否点击收货地址编辑按钮
    addressWrite: '',//收件地址
    nameWrite: '',//收件人
    phoneWrite: '',//收件号码
    oldPwd:'',//原来的密码
    newPwd:'',//新密码
    newPwd2:'',//新密码确认
    noCheck:true,//让新的密码不能输入
    index: 0,
    nowDate: new Date(),
    imageBack: '',
    imageHead: '',
    addressData:[],//收货地址的全部数据
    isadd:true,//新增还是修改的标识
    addId:'',//一条地址的id


    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },




  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  showCreat: function () {
    wx.navigateTo({
      url: '../creatPage/creatPage',
    })
  },
  getusername: function (e) {
    this.setData({
      username: e.detail.value
    })


  },
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //点击登录
  loginBtn: function () {
    wx.showLoading({
      title: '登陆中',
      mask:'true'
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/user/login',
      data: {
        username: this.data.username,
        password: this.data.password
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
          this.setData({
            userId: res.data.info,
          })
          if(res.data.userStatus==2){
            this.setData({
              loginRight: true,
            })
          }else if(res.data.userStatus==1){
           wx.redirectTo({
             url: '../threePages/mePage/mePage',
           })
          }
        
          wx.setStorage({
            key: 'username',
            data: this.data.username
          })
          wx.setStorage({
            key: 'password',
            data: this.data.password
          })
          wx.setStorage({
            key: 'userId',
            data: this.data.userId
          })
          wx.showLoading({
            title: '获取中',
            mask:'true'
          })
          wx.request({
            url: 'http://www.zhangdanling.cn/user/userInfo',
            data: { id: this.data.userId },
            success: (res) => {
              wx.hideLoading()
              console.log(res.data)
              if (res.data.code == 1) {
                this.setData({
                  meDate: res.data.info,
                  dates: res.data.info.birthday,
                  backImg: res.data.info.backgroundLocal,
                  headImg: res.data.info.headLocal,
                  imageBack: res.data.info.imageBackground,
                  imageHead: res.data.info.imageHead
                })
              }
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }

      },
      fail: function (err) {
        console.log('调用失败')
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //更换头像
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

              wx.showLoading({
                title: '更换中',
                mask:'true'
              })
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              var fileRoad = res.tempFiles[0]
              wx.uploadFile({
                url: 'http://www.zhangdanling.cn/user/updateImage', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }, // 设置请求的 header
                name: 'file',
                formData: {
                  'id': this.data.userId,
                  'imageHead': this.data.imageHead

                },
                success: (result) => {
                  result = JSON.parse(result.data)
                  console.log(result)
                  if (result.code == 1) {
                    wx.hideLoading()
                    this.setData({
                      headImg: tempFilePaths[0]
                    })
                  }
                }
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
              wx.showLoading({
                title: '更换中',
                mask:'true'
              })
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              console.log(tempFilePaths[0])
              var fileRoad = res.tempFiles
              wx.uploadFile({
                url: 'http://www.zhangdanling.cn/user/updateImage', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }, // 设置请求的 header
                name: 'file',
                formData: {
                  'id': this.data.userId,
                  'imageBackground': this.data.imageBack

                },
                success: (result) => {
                  result = JSON.parse(result.data)
                  console.log(result)
                  if (result.code == 1) {
                    wx.hideLoading()
                    this.setData({
                      backImg: tempFilePaths[0]
                    })
                  }
                }
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
  toWuliu() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1000
    })
  },
  //个人信息点击
  personalinfo() {
    this.setData({
      showPersonal: true
    })
    wx.showLoading({
      title: '获取中',
      mask:'true'
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/user/userInfo',
      data: { id: this.data.userId },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            meDate: res.data.info,
            dates: res.data.info.birthday,
            content:res.data.info.content,
            username:res.data.info.username,
            phone:res.data.info.phone
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  //修改按钮点击
  sureChange() {
    var x = /^1[3|4|5|7|8][0-9]{9}$/
    console.log(this.data.addressWrite)
    console.log(this.data.nameWrite)
    console.log(this.data.phoneWrite)
    if (!(x.test(this.data.phone))) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showLoading({
        title: '修改中',
        mask:'true'
      })
      wx.request({
        url: 'http://www.zhangdanling.cn/user/register',
        data: { id: this.data.userId, username: this.data.username, birthday: this.data.dates, content: this.data.content, phone: this.data.phone },
        success: (res) => {
          console.log(res.data)
          if(res.data.code==1){
            this.setData({
              showPersonal:false
            })
            wx.hideLoading()
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:2000,
              mask:'true'
            })
          }
        }
      })
    }
  

  },
  //关闭个人信息
  closeInfo() {
    this.setData({
      showPersonal: false
    })
  },
  //修改密码
  changePwd() {
    this.setData({
      changePwd: true,
      noCheck:true

    })
  },
  //获取原有密码
  getOldpwd(e){
     this.setData({
       oldPwd:e.detail.value
     })
  },
  //点击验证
  checkPwd(){
      wx.showLoading({
        title: '验证中',
        mask:'true'
      })
      wx.request({
        url: 'http://www.zhangdanling.cn/user/validPassword',
        data: { id: this.data.userId, password: this.data.oldPwd},
        success:(res)=>{
          wx.hideLoading()
            console.log(res.data)
            if(res.data.code==1){
              wx.showToast({
                title: '验证通过',
                icon:'success',
                duration:2000
              })
              this.setData({
                noCheck:false
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none',
                duration:1000
              })
            }
        }
      })
  },
  //获取新密码
  getNewPwd(e){
   this.setData({
     newPwd:e.detail.value
   })
  },
  getNewPwd2(e){
    this.setData({
      newPwd2: e.detail.value
    })
  },
  //确认修改密码
  rewritePwd(){
    if(this.data.newPwd!=this.data.newPwd2){
      wx.showToast({
        title: '请输入相同密码',
        icon:'none',
        duration:1000
      })
    }else{
      wx.showLoading({
        title: '修改中',
        mask: 'true'
      })
      wx.request({
        url: 'http://www.zhangdanling.cn/user/register',
        data: { id: this.data.userId, repetition: this.data.newPwd,password:this.data.newPwd2 },
        success: (res) => {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.code == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              changePwd: false
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:1000
            })
          }
        }
      })
    }
 
  },
  //关闭修改密码
  closePwd() {
    this.setData({
      changePwd: false,
      oldPwd:'',
      newPwd:'',
      newPwd2:''

    })
  },
  //积分管理
  toJifen() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1000
    })
  },
  //反馈
  toSay() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1000
    })
  },
  //新增收货地址
  addAddre(){
    this.setData({
      isWriteAdd: true,
      addressWrite:'',
      nameWrite:'',
      phoneWrite:'',
      isadd:true,
      addId:'',
    })
  },
  //收货地址点击
  addressManage() {
    this.setData({
      getAdress: true,
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/address/list',
      data:{userId:this.data.userId},
      success:(res)=>{
        console.log(res.data)
         if(res.data.code==1){
           this.setData({
             addressData:res.data.info
           })
         }
      }
    })
  },
  //关闭收货地址
  closeAddress() {
    this.setData({
      getAdress: false,
    })
  },
  //关闭编辑收货地址
  closeWritePage() {
    this.setData({
      isWriteAdd: false,
    })
  },
  //编辑收货地址
  writeAddress(event) {
    this.setData({
      isWriteAdd: true,
      isadd:false,
      addId:event.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中',
      mask:'true'
    })
    wx.request({
      url: 'http://www.zhangdanling.cn/address/oneAddress',
      data:{id:event.currentTarget.dataset.id},
      success:(res)=>{
        wx.hideLoading()
        console.log(res.data)
        if(res.data.code==1){
          this.setData({
            addressWrite:res.data.info.address,
            nameWrite:res.data.info.name,
            phoneWrite:res.data.info.phone
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration:1000
          })
        }
      }

    })
  },
  //获取输入的三个内容
  getInputValueAdd(e) {
    this.setData({
      addressWrite: e.detail.value
    })
  },
  getInputValuename(e) {
    this.setData({
      nameWrite: e.detail.value
    })
  },
  getInputValuephone(e) {
    this.setData({
      phoneWrite: e.detail.value
    })
  },
  //修改收货地址按钮
  changeAdd() {
    var x = /^1[3|4|5|7|8][0-9]{9}$/
    if (!(x.test(this.data.phoneWrite))) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showLoading({
        title: '加载中',
        mask:'true'
      })
      wx.request({
        url: 'http://www.zhangdanling.cn/address/save',
        data: { userId: this.data.userId, address: this.data.addressWrite, name: this.data.nameWrite, phone: this.data.phoneWrite, id: this.data.addId},
        success:(res)=>{
          wx.hideLoading()
          console.log(res.data)
          if(res.data.code==1){
            wx.showToast({
              title: '成功',
              icon:'success',
              duration:1000
            })
            this.setData({
              isWriteAdd:false
            })
            this.addressManage()
          }
        }
      })
    }
  },
  //删除收货地址
  deleteAddre(e){
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      confirmColor:'red',
      success:  (res)=> {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask:'true'
          })
         wx.request({
           url: 'http://www.zhangdanling.cn/address/delete',
           data:{ids:e.currentTarget.dataset.id},
           success:(res)=>{
             console.log(res)
             wx.hideLoading()
             if(res.data.code==1){
               this.addressManage()
               wx.showToast({
                 title: '删除成功',
                 icon:'success',
                 duration:2000
               })
             
             }else{
               wx.showToast({
                 title: res.data.msg,
                 icon: 'none',
                 duration: 2000
               })
             }
           }
         })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //退出登录
  existLogin() {
    wx.clearStorage()
    wx.setStorage({
      key: 'username',
      data: '',
    })
    wx.setStorage({
      key: 'password',
      data: '',
    })
    this.setData({
      loginRight: false,
      username: '',
      password: ''
    })
  },
  //获取用户名
  getUsername(e){
    this.setData({
      username: e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getContent(e){
    this.setData({
      content: e.detail.value
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
    if (this.data.loginRight==true){
      wx.request({
        url: 'http://www.zhangdanling.cn/user/userInfo',
        data: { id: this.data.userId },
        success: (res) => {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == 1) {
            this.setData({
              meDate: res.data.info,
              dates: res.data.info.birthday,
              backImg: res.data.info.backgroundLocal,
              headImg: res.data.info.headLocal,
              imageBack: res.data.info.imageBackground,
              imageHead: res.data.info.imageHead
            })
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  
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