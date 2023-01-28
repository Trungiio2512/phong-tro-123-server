"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("LovePosts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.STRING,
                // references: {
                //     model: "Users",
                //     key: "id",
                // },
                // onDelete: "CASCADE",
                allowNull: false,
            },
            postId: {
                type: Sequelize.STRING,
                // references: {
                //     model: "Posts",
                //     key: "id",
                // },
                // onDelete: "CASCADE",
                allowNull: false,
            },
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
        await queryInterface.dropTable("LovePosts");
    },
};
