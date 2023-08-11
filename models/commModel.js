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
          key: 'id_photos', 
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
      
    });

    return commentaires;
}
