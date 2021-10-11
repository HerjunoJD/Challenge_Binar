'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game.hasOne(models.user_game_biodata, {foreignKey: 'user_game_id', as: 'user_biodata'});
      user_game.hasMany(models.user_game_history, {foreignKey: 'user_game_id', as: 'user_history'});
    }

    //Metode untuk melakukan enkripsi
    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    //Metode untuk regiester
    static register = ({username, password}) => {
      const encryptedPassword = this.#encrypt (password)

      return this.create({ username, password : encryptedPassword})
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)

    static authenticate = async({username, password}) => {
      try{
        const user = await this.findOne({where: {username}})
        if(!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject("Wrong Password")
        return Promise.resolve(user)
      }
      catch(err){
        return Promise.reject(err)
      }
    }
  };
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};