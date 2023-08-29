const db= require('../models/index');

//CREATE MAIN MODEL

const Users=db.utilisateur

/// START 

//------ CREATE USER-------------//

const createUser = async (req, res) => {
    try {
        const infoUser = req.body;
        console.log('Data received from client:', infoUser);

        // const newUser = await Users.create(infoUser);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            // user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the user.',
            error: error.message
        });
    }
};


//------ GET ALL USERS-------------//

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.findAll({});
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users: allUsers
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving users.',
            error: error.message
        });
    }
};


//------ LOGIN USER-------------//

const loginUser= async (req,res)=>{
    // id_utilisateur
    const id=req.params.id
    let userdata = await Users.findOne({
        where: {id: id}
    })
    res.status(200).send(userdata)
}


//------ UPDATE USER-------------//


const updateUsers= async (req,res)=>{

    let id=req.params.id  
    const products = await Users.update(req.body,{
        where: {id: id}
    })
    res.status(200).send(products)
}


//------ DELETE USER-------------//

const deleteUsers= async (req,res)=>{

    let id=req.params.id
    await Users.destroy({
        where: {id: id}
    })
    res.status(200).send("Product is deleted !")
}




module.exports={
    createUser,
    getAllUsers,
    loginUser,
    updateUsers,
    deleteUsers
}

////-------END---------///