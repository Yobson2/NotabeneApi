const express=require('express');
const multiPhoto=require('../middlewares/stockageMultiPhoto') 
const axios = require('axios');
const router= express.Router();


//MES ENDPOINTS

router.post('/trasitionPicture',multiPhoto,async (req, res)=>{
     let pictures = req.savedFiles;
     try {
          console.log('Adding', pictures); 
         await axios.post('http://localhost:8082/apiNotabene/v1/addPost',{pictures: pictures});
        
      } catch (error) {
          console.error(error);
      }
  
     console.log("test de recuperation des noms images");
});


module.exports=router