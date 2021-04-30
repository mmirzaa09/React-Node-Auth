module.exports = (sequelize, DataType) => {
    const Posts = sequelize.define("Posts" , {
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

    return Posts
}