const dbConfig=require('../database/config');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize= new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorsAliases:false,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            ilde:dbConfig.pool.ilde
        }
    }
    
)
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données :', error);
  });


  const db={};
  db.Sequelize=Sequelize
  db.sequelize=sequelize
 
//Importation et définition des modèles de la base de données :
  db.utilisateur=require('./userModel.js')(sequelize,DataTypes);
  db.commentaire=require('./commModel.js')(sequelize,DataTypes);
  db.localisation=require('./locModel.js')(sequelize,DataTypes);
  db.photos=require('./photoModel.js')(sequelize,DataTypes);
  db.entreprise=require('./entrepriseModel.js')(sequelize,DataTypes);
  db.etsComm=require('./entCommModel.js')(sequelize,DataTypes);

//Synchronisation des modèles avec la base de données
  db.sequelize.sync({force: false})
  .then(()=>console.log('yes re-sync done !'))

  module.exports=db