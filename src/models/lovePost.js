"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LovePost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    LovePost.init(
        {
            userId: DataTypes.STRING,
            postId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "LovePost",
        },
    );
    return LovePost;
};
