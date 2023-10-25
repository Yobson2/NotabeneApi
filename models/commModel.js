const {sequelize}=require('./index'); 

module.exports=(sequelize, DataTypes )=>{
    
  const commentaires = sequelize.define('commentaires', {
    id_commentaire: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_photo: {
      type:DataTypes.INTEGER,
      references: {
          model: 'photos', 
          key: 'id_photo', 
        },
     },
    contenu_commentaire: {
      type:DataTypes.STRING,
    },
    date_commentaire: {
      type:DataTypes.DATE,
    },
    nombre_etoiles: {
      type:DataTypes.INTEGER,
    },
    categories: {
      type:DataTypes.STRING,
    },
      
    });

    return commentaires;
}
