// /pages/submit/submit.js
var app = getApp();
Page({

  data: {
    userInfo:{},
    location:{},
    scale: 18
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
    var that = this
    var text = e.detail.value.post_text
    console.log(text)
  },

  regionchange: function(e){
    console.log(e.type)
    if (e.type = 'end'){
      var that = this
      this.mapCtx.getCenterLocation({
        success: function(res){
          that.data.location.latitude = res.latitude
          that.data.location.longitude = res.longitude
        }
      });

      this.mapCtx.translateMarker({
        markerId: 0,
        autoRotate: false,
        duration: 100,
        destination: {
          latitude: that.data.location.latitude,
          longitude: that.data.location.longitude,
        },
        animationEnd() {
          console.log('animation end')
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

        // updating the map location and the marker
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
