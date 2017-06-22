const AV = require('../../utils/av-weapp-min.js');
const Posts = require('../../model/post.js');
Page({
<<<<<<< Updated upstream
 data: {
   location: {},
   posts: {}
 },
 onLoad: function () {
  // 1. Detect user location and set location
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
     // Loop through posts and build markers
     posts.forEach(function (e) {
     // 3. get the latitude, longitudes and set markers
       var id = e.id;
       var lat = e.attributes.latitude;
       var lg = e.attributes.longitude;
       var marker = {
         id: id,
         latitude: lat,
         longitude: lg,
         width: 50,
         height: 50,
       }
       // Assign a marker image based on gender
       if(e.attributes.gender == 1){
         marker.iconPath = "/images/marker-male.png"
       } else if (e.attributes.gender == 0){
          marker.iconPath = "/images/marker-female.png"
       } else{
          marker.iconPath = "/images/marker.png"
       }
       markers.push(marker);
     })
     that.setData({
       markers: markers
     })
   }).catch(console.error);
 },
 markertap: function (e) {
   console.log(e.markerId)
   wx.navigateTo({
    url: '/pages/show/show?id=' + e.markerId
   })
 },
 onShareAppMessage: function () {
=======
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
            var id = e.id;
            var marker = {
              id: id,
              latitude: lat,
              longitude: lg,
              width: 50,
              height: 50,
            }
            //assign a marker image based on gender
            if(e.attributes.gender == 1){
              marker.iconPath = "/images/marker-male.png"
            } else if (e.attributes.gender == 0){
              marker.iconPath = "/images/marker-female.png"
            } else{
              marker.iconPath = "/images/marker.png"
            }
            markers.push(marker);
          })
          that.setData({
            markers: markers
          })
        }).catch(console.error);

    },
  markertap: function (e) {
    console.log(e.markerId)
    wx.navigateTo({
      url: '/pages/show/show?id=' + e.markerId
    })
  },
  onShareAppMessage: function () {
>>>>>>> Stashed changes
    return {
      title: 'iMissed around you',
      path: 'pages/map/map'
    }
  }
})

