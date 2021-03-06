const AV = require('../../utils/av-weapp-min.js');
const Posts = require('../../model/post.js');
Page({
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
         width: 35,
         height: 50,
       }

       // Assign a marker image based on gender
       if(e.attributes.gender == 1){
         marker.iconPath = "/images/male-marker.png"
       } else if (e.attributes.gender == 0){
         marker.iconPath = "/images/female-marker.png"
       } else{
          marker.iconPath = "/images/female-marker.png"
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
    return {
      title: 'iMissed around you',
      path: 'pages/map/map'
    }
  }
})

