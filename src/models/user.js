"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post1, { foreignKey: "userId", as: "userData" });
      User.belongsTo(models.Role, {
        foreignKey: "roleCode",
        targetKey: "code",
        as: "userRole",
      });
      // User.hasMany(models.LovePost);

      User.belongsToMany(models.Post1, {
        through: models.LovePost,
        as: "userPosts",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Post1, {
        through: models.RegisterPost,
        as: "userRegisterPosts",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      roleCode: DataTypes.STRING,
      phone: DataTypes.STRING,
      zalo: DataTypes.STRING,
      fbUrl: DataTypes.STRING,
      avatar: DataTypes.BLOB,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
