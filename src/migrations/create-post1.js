"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Post1s", {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: { type: Sequelize.STRING },
      star: { type: Sequelize.STRING, defaultValue: "0" },
      labelCode: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      attributesId: { type: Sequelize.STRING },
      categoryCode: { type: Sequelize.STRING },
      priceCode: { type: Sequelize.STRING },
      areaCode: { type: Sequelize.STRING },
      provinceCode: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      userId: { type: Sequelize.STRING },
      overviewId: { type: Sequelize.STRING },
      imagesId: { type: Sequelize.STRING },
      priceNumber: { type: Sequelize.FLOAT },
      areaNumber: { type: Sequelize.FLOAT },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Post1s");
  },
};
