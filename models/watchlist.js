'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.watchlist.belongsToMany(models.user, {through: "users_watchlist"})
    }
  };
  watchlist.init({
    title: DataTypes.STRING,
    imdbID: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'watchlist',
  });
  return watchlist;
};