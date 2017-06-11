const AV = require('../../utils/av-weapp-min.js');
const Posts = require('../../model/post.js');
Page({
  data: {
    location: {},
    posts: {}
  },
  onLoad: function () {
    // 1. detect user location and set location
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
        that.setData({
          location: {
            latitude: latitude,
            longitude: longitude,
            scale: "12",
          }  
        })
      }
    })  
   // 2. fetch all available posts
    new AV.Query('Posts')
      .find()
      .then(
        function(posts) {
          console.log(posts)
          that.setData({ posts })
          var markers = []
          // loop through posts and build markers
          posts.forEach(function (e) {
            console.log('ok')
            // 3. get the latitude/longitudes and set markers
            var lat = e.attributes.latitude;
            var lg = e.attributes.longitude;
            
            var marker = {
              iconPath: "/images/marker.png",
              latitude: lat,
              longitude: lg,
              width: 50,
              height: 50,
            }
            markers.push(marker);
          })
          that.setData({
            markers: markers
          })
        }
      )
      .catch(console.error);
    },      
})
    