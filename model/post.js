const AV = require('../utils/av-weapp-min.js');
class Posts extends AV.Object {
}

// Register object
AV.Object.register(Posts, 'Posts');

// Export object
module.exports = Posts;