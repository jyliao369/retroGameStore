const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
    foreginKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreginKey: 'user_id'
});

module.exports = { User, Post };