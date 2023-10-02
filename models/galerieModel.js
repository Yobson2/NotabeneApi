const { sequelize } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const galerie = sequelize.define('galerie', {
    id_photo_galerie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_utilisateur: {
      type: DataTypes.INTEGER,
      references: {
        model: 'utilisateurs',
        key: 'id_utilisateur',
      },
    },
    photosName: {
      type: DataTypes.STRING,
    },
  });

  return galerie;
};
