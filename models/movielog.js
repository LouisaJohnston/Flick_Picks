'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movielog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.movielog.belongsToMany(models.user, {through: "users_movielog"})
    }
  };
  movielog.init({
    title: DataTypes.STRING,
    imdbID: DataTypes.STRING,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movielog',
  });
  return movielog;
};