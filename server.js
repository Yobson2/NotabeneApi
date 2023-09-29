//importation des modules
const express=require('express');
const cors=require('cors');
const path = require('path');
const port=8082
const routersUser=require('./routes/userRouter')
const routersCommentaires=require('./routes/commRouter')
const routersPhoto=require('./routes/photoRouter')
const routersLoc=require('./routes/locRouter')

//Initialisation du serveur
const app=express();

// Définir le dossier contenant les images
const mesImages = path.join(__dirname, 'uploads');
const allImagesProfil = path.join(__dirname, 'uploadsProfil');


//mildllewares
app.get('/',(req,res)=>{
    res.send('This is my server')
})


app.use('/images', express.static(mesImages));
app.use('/imagesProfil', express.static(allImagesProfil));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 
app.use('/apiNotabene/v1/',routersUser)
app.use('/apiNotabene/v1/',routersCommentaires)
app.use('/apiNotabene/v1/',routersPhoto)
app.use('/apiNotabene/v1/',routersLoc)

//listen on port
app.listen(port,()=>{
    console.log(`server started at http://localhost/:${port}`)
})