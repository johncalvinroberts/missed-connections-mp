// pages/show/show.js
const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
      var which = option.id
      console.log(which)
      this.setData({
        postId: which
      })
      var that = this
      new AV.Query('Posts')
        .get(which)
        .then(
        function (post) {
          var latitude = post.attributes.latitude
          var longitude = post.attributes.longitude
          console.log(post)
          that.setData({
            post: post
          })
          console.log(latitude)
          that.setData({
            marker: [{
              iconPath: "/images/marker.png",
              id: post.objectId,
              latitude: latitude,
              longitude: longitude,
              width: 50,
              height: 50
            }]
          })
        }
        )
        .catch(console.error);
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
    console.log(this.data.post)
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