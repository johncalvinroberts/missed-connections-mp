//index.js
//获取应用实例
var app = getApp()
var app = getApp();
const AV = require('../../utils/av-weapp-min.js');
//temporarily calling this object posts in the plural, because of leancloud
class Posts extends AV.Object {
}

Page({
  data: {
    userInfo: {},
    posts:{}
  },
  markertap: function (e) {
    console.log(e.markerId)
    wx.navigateTo({
      url: '/pages/show/show?id=' + e.markerId
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    new AV.Query('Posts')
      .descending('createdAt')
      .find()
      .then(posts => this.setData({ posts }))
      .catch(console.error);
  },
  postBindTap: function(e){
    wx.redirectTo({
      url:'../show/show?id=' + e.target.id
    })
  }

})
