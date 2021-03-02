'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.movie.belongsToMany(models.user, {through: "unwatched_movie"})
      models.movie.belongsToMany(models.user, {through: "watched_movie"})
    }
  };
  movie.init({
    title: DataTypes.STRING,
    imdbID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};