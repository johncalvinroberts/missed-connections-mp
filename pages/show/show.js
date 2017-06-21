// pages/show/show.js
const AV = require('../../utils/av-weapp-min.js');
var util = require('../../utils/util.js')
Page({
  data: {
    postId: null,
    dateP:{}
  },
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
          var date = post.createdAt
          console.log(date)
          var format = util.formatTime(new Date(date))
          console.log(format)
          
          that.setData({
            post: post,
            dateP: format,
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
        },
       ).catch(console.error);
  },
  onShareAppMessage: function () {
    console.log('share')
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // Loading spinner when page load
  onload: function () {
    wx.showNavigationBarLoading()
  },
  // Change naviagtion bar title
  onShow: function () {
    wx.setNavigationBarTitle({
      title: 'iMissed story',
      success: function (res) {
        console.log(res)
      }
    })
  }
})
