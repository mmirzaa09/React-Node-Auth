module.exports = (sequelize, DataType) => {
    const Post = sequelize.define("Post" , {
        title: {
            type: DataType.STRING,
            allowNull: false
        },
        postText: {
            type: DataType.STRING,
            allowNull: false
        },
        username: {
            type: DataType.STRING,
            allowNull: false
        },
    });

    return Post
}