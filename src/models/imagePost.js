"use strict";
const { Model } = require("sequelize");
const post = require("./post");
module.exports = (sequelize, DataTypes) => {
    class ImagePost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ImagePost.hasOne(models.Post, { foreignKey: "imagesId", as: "imagesData" });
        }
    }
    ImagePost.init(
        {
            images: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ImagePost",
        },
    );
    return ImagePost;
};
