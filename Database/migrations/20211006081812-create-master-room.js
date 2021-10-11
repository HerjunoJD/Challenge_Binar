'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_name: {
        type: Sequelize.STRING
      },
      id_player_1: {
        type: Sequelize.INTEGER
      },
      id_player_2: {
        type: Sequelize.INTEGER
      },
      unique_code: {
        type: Sequelize.STRING
      },
      round_1_result: {
        type: Sequelize.INTEGER
      },
      round_2_result: {
        type: Sequelize.INTEGER
      },
      round_3_result: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('master_rooms');
  }
};