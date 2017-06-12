// /pages/submit/submit.js
var app = getApp();
const AV = require('../../utils/av-weapp-min.js');
//temporarily calling this object posts in the plural, because of leancloud
class Posts extends AV.Object {
}

Page({

  data: {
    userInfo:{},
    location:{},
    scale: 14,
    loading: false
  },
  onLoad: function (options) {
    console.log('onLoad--submit page')
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    console.log(that.data.userInfo)
  },
  bindPostSubmit: function(e){
    this.setData({
      loading: !this.data.loading
    })
    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 2000
    })
    var that = this
    var text = e.detail.value.post_text
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    setTimeout(function (){
      new Posts({
        latitude: that.data.location.latitude.toString(),
        longitude: that.data.location.longitude.toString(),
        author: that.data.userInfo.nickName,
        avatarURL: that.data.userInfo.avatarUrl,
        text: text,
        upvotes: 0
      }).setACL(acl).save().catch(console.error);
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }, 200)

  },

  regionchange: function(e){
    var that = this
    if (e.type = 'end'){
      //change the missed connection location when map is moved
      this.mapCtx.getCenterLocation({
        success: function(res){
          that.data.location.latitude = res.latitude
          that.data.location.longitude = res.longitude
          //update marker to show the location
          that.mapCtx.translateMarker({
            markerId: 0,
            autoRotate: false,
            duration: 500,
            destination: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            animationEnd() {
              // console.log('animation end')
            }
          })
        }
      })
    }
  },
  onShow: function () {
    var that = this
    wx.getLocation({
      // API to locate user
      type: 'wgs84',
      success: function (res) {
        // storing the user coordinates
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude)
        console.log(longitude)

        // set map to display users current location as default
        that.setData({
          location: { latitude: latitude, longitude: longitude },
          scale: '14',
          markers: [{
            iconPath: "../../images/marker.png",
            id: 0,
            latitude: latitude,
            longitude: longitude,
            width: 50,
            height: 50,
            title: "",
            callout: { content: "Missed connection point", fontSize: 15, color: "#000000", display: "ALWAYS", padding: 10 }
          }]
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  onReady: function () {
    this.mapCtx = wx.createMapContext('submitMap')
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
