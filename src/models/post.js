"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.ImagePost, {
        foreignKey: "imagesId",
        targetKey: "id",
        as: "imagesData",
      });
      Post.belongsTo(models.Attribute, {
        foreignKey: "attributesId",
        targetKey: "id",
        as: "attributesData",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
      Post.belongsTo(models.Overview, {
        foreignKey: "overviewId",
        targetKey: "id",
        as: "overviews",
      });
      Post.belongsTo(models.Label, {
        foreignKey: "labelCode",
        targetKey: "code",
        as: "labelData",
      });
      // Post.hasMany(models.LovePost);
      Post.belongsToMany(models.User, {
        through: models.LovePost,
        as: "postUsers",
        foreignKey: "postId",
      });
      Post.belongsToMany(models.User, {
        through: models.RegisterPost,
        as: "postRegisterByUsers",
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelCode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributesId: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.STRING,
      overviewId: DataTypes.STRING,
      imagesId: DataTypes.STRING,
      priceNumber: DataTypes.FLOAT,
      areaNumber: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
