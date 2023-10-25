const {sequelize}=require('./index'); 

module.exports=(sequelize, DataTypes )=>{
    
    const etsComm = sequelize.define('EtsComm', {
      id_ets_com: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_commentaire: {
        type:DataTypes.INTEGER,
        references: {
            model: 'commentaires', 
            key: 'id_commentaire', 
          },
      },
      id_entreprise: {
        type: DataTypes.INTEGER,
        references: {
          model: 'entreprises', 
          key: 'id_entreprise', 
        },
      },
        
      });
  
      return etsComm;
  }
