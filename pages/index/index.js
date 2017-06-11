//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    markers: [{
      iconPath: "/images/marker.png",
      id: '593cfff1128fe1006ae41e77',
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    },
      {
        iconPath: "/images/marker.png",
        id: '593cfff1128fe1006ae41e77',
        latitude: 23.09898,
        longitude: 113.324590,
        width: 50,
        height: 50
      }]
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
