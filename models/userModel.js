const {sequelize}=require('./index'); 

module.exports=(sequelize, DataTypes )=>{
    
    const utilisateur = sequelize.define('utilisateur', {
        id_utilisateur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        nom_utilisateur: {
          type: DataTypes.STRING,
        },
        mot_de_passe:{
            type: DataTypes.STRING,
        },
        adresse_email: {
            type: DataTypes.STRING,
        },
        photo_user: {
            type: DataTypes.STRING,
        },
        id_Localisation: {
            type:DataTypes.INTEGER,
            references: {
                model: 'localisations', 
                key: 'id_Localisation', 
              },
        }
      });

      return utilisateur;
}

