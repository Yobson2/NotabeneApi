const {sequelize}=require('./index'); 



module.exports=(sequelize, DataTypes )=>{
    
    const entreprise = sequelize.define('entreprise', {
        id_entreprise: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nom_entreprise: {
          type: DataTypes.STRING,
        },
        mot_de_passe_entreprise:{
            type: DataTypes.STRING,
        },
        adresse_entreprise: {
            type: DataTypes.STRING,
        },
        photo_entreprises: {
            type: DataTypes.STRING,
        },
        categories: {
            type:DataTypes.STRING,
          },
        id_Localisation: {
            type:DataTypes.INTEGER,
            references: {
                model: 'localisations', 
                key: 'id_Localisation', 
              },
        }
      });

      return entreprise;
}

