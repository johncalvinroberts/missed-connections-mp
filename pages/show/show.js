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
          // console.log(post)
          that.setData({
            post: post
          })
          var thisMarker = '';
          if(post.attributes.gender == 1){
            thisMarker = "/images/marker-male.png"
          } else if (post.gender == 0){
            thisMarker = "/images/marker-female.png"
          } else{
            thisMarker = "/images/marker.png"
          }

          that.setData({
            marker: [{
              iconPath:thisMarker,
              id: post.objectId,
              latitude: latitude,
              longitude: longitude,
              width: 50,
              height: 50,
              callout: {
                content: "iMissed point",
                fontSize: 13,
                borderRadius: 5,
                bgColor: "#F95959",
                color: "#FFF",
                display: "ALWAYS",
                padding: 10
              }
            }]
          })
        }
        )
        .catch(console.error);
  },
  onShareAppMessage: function () {
    console.log('share')
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})
