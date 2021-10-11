'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_in_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_in_room.init({
    room_id: DataTypes.INTEGER,
    room_name: DataTypes.STRING,
    player_1_choice: DataTypes.INTEGER,
    player_2_choice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_in_room',
  });
  return user_in_room;
};