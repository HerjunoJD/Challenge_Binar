'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  master_room.init({
    room_name: DataTypes.STRING,
    id_player_1: DataTypes.INTEGER,
    id_player_2: DataTypes.INTEGER,
    unique_code: DataTypes.STRING,
    round_1_result: DataTypes.INTEGER,
    round_2_result: DataTypes.INTEGER,
    round_3_result: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'master_room',
  });
  return master_room;
};