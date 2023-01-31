"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegisterPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  RegisterPost.init(
    {
      userId: DataTypes.STRING,
      postId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RegisterPost",
    },
  );
  return RegisterPost;
};
