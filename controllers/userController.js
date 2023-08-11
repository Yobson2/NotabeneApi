const db= require('../models/index');

//create main model

const Users=db.utilisateur

/// START 

//------ Create user

const addUser= async (req,res)=>{
    let infoUser={
        // tittle:req.body.tittle,
        // price:req.body.price,
        // description:req.body.description,
        // published:req.body.published ? req.body.published :false
    }

    const users = await Users.create(infoUser)
    res.status(200).send(users)
}



module.exports={
    addUser,
}