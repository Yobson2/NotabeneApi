const { sequelize } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const photos = sequelize.define('photos', {
    id_photos: {
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
    id_Localisation: {
      type: DataTypes.INTEGER,
      references: {
        model: 'localisations',
        key: 'id_Localisation',
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  return photos;
};
