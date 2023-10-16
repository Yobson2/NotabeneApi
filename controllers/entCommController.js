const db = require('../models/index');
const EtsComm = db.etsComm;
const axios = require('axios');

const addEtsComm = async (req, res) => {
    try {
        const { id_entreprise , id_commentaire } = req.body.data;

        const newEtsComm = await EtsComm.create({
            id_commentaire:id_commentaire,
            id_ets_com:id_entreprise
        });
     
        res.status(201).json({
            success: true,
            message: 'Ets created successfully',
            user: newEtsComm 
        });
    } catch (error) {
        console.error('Error creating Ets:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the Ets.',
            error: error.message
        });
    }
}

module.exports = {
    addEtsComm
};
