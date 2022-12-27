"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Posts", {
            id: {
                allowNull: false,
                // autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            // title: DataTypes.STRING,
            // star: DataTypes.STRING,
            // labelCode: DataTypes.STRING,
            // address: DataTypes.STRING,
            // attributesId: DataTypes.STRING,
            // categoryCode: DataTypes.STRING,
            // description: DataTypes.TEXT,
            // userId: DataTypes.STRING,
            // overviewId: DataTypes.STRING,
            // imageId: DataTypes.STRING,
            title: { type: Sequelize.STRING },
            star: { type: Sequelize.STRING, defaultValue: "0" },
            labelCode: { type: Sequelize.STRING },
            address: { type: Sequelize.STRING },
            attributesId: { type: Sequelize.STRING },
            categoryCode: { type: Sequelize.STRING },
            description: { type: Sequelize.TEXT },
            userId: { type: Sequelize.STRING },
            overviewId: { type: Sequelize.STRING },
            imageId: { type: Sequelize.STRING },
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
        await queryInterface.dropTable("Posts");
    },
};
