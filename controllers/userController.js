const db= require('../models/index');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

//CREATE MAIN MODEL

const Users=db.utilisateur

/// START 

const privateKey="egfdfgvsbkbziudviccujujqcfqcv";

//------ CREATE USER-------------//

const createUser = async (req, res) => {
    try {
        const infoUser = req.body;
        console.log('Data received from client:', infoUser);
        // Générer un sel sécurisé
        const salt = await bcrypt.genSalt(10);

        // // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, salt);

        const newInfos={
            "nom_utilisateur":req.body.nom_utilisateur,
            "adresse_email":req.body.adresse_email,
            "mot_de_passe":hashedPassword
        };

        console.log('hast infos',newInfos)
        const newUser = await Users.create(newInfos);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
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

//------ GET USER BY ID-------------//

const getUsersById = async (req, res) => {
    const id_utilisateur = req.params.id;
    try {
        const allUsers = await Users.findOne({
            where: {
                id_utilisateur: id_utilisateur
            }
        });
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
const loginUser = async (req, res) => {
    try {
        const { adresse_email, mot_de_passe } = req.body;

        // Utilisez la méthode findOne de votre modèle Sequelize
        const userDoc = await Users.findOne({
            where: {
                adresse_email: adresse_email
            }
        });

        // Vérifiez si l'utilisateur existe
        if (!userDoc) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

       const passwordMatch = await bcrypt.compare(mot_de_passe, userDoc.mot_de_passe);
    //    expiresIn: '10s'
        if (passwordMatch) {
            jwt.sign({ userId: userDoc.id_utilisateur,adresse_email:userDoc.adresse_email}, privateKey, { }, (err, token) => {
                if (err) {
                    console.error("Une erreur s'est produite lors de la génération du token", err);
                    res.status(500).json({
                        success: false,
                        message: "Erreur de serveur",
                        error: err.message
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Connexion réussie",
                        token:token,
                        data:userDoc,
                    });
                }
            });
        } 
        
    } catch (error) {
        console.error("Une erreur s'est produite", error);
    }
};


//------ UPDATE USER-------------//

const updateUsers= async (req,res)=>{

    let id=req.params.id  
    const users = await Users.update(req.body,{
        where: {id_utilisateur: id}
    })
    res.status(200).send(users)
}


//------ DELETE USER-------------//

const deleteUsers= async (req,res)=>{

    let id=req.params.id
    await Users.destroy({
        where: {id_utilisateur: id}
    })
    res.status(200).send("User is deleted !")
}




module.exports={
    createUser,
    getAllUsers,
    loginUser,
    updateUsers,
    deleteUsers,
    getUsersById
}

////-------END---------///