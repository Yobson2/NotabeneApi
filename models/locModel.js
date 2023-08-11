const {sequelize}=require('./index'); 


module.exports=(sequelize, DataTypes )=>{
    
  const localisation = sequelize.define('localisation', {
    id_Localisation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_partages: {
      type:DataTypes.INTEGER
    },
      
    });

    return localisation;
}


