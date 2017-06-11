//app.js
const AV = require('./utils/av-weapp-min.js');
AV.init({
  appId: 'ccuhqExYyqmmkeU1zNN6OJJ9-gzGzoHsz',
  appKey: 'NkVtd61Kwqs2WBFFtzqHc86S',
});

App({
  onLaunch: function () {
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})