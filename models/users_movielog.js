'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_movielog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_movielog.init({
    userId: DataTypes.INTEGER,
    movielogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_movielog',
  });
  return users_movielog;
};