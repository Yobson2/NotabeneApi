const db= require('../models/index');

//create main model

const Users=db.utilisateur

/// START 

//------ Create user

const addUser= async (req,res)=>{
    let infoUser={
        Nom:req.body.Nom,
        Email:req.Email,
        Password:req.Password
    }

    const users = await Users.create(infoUser)
    res.status(200).send(users)
}



module.exports={
    addUser,
}