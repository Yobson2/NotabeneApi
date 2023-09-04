//importation des modules
const express=require('express');
const cors=require('cors');
const port=8082
const routersUser=require('./routes/userRouter')
const routersCommentaires=require('./routes/commRouter')
const routersPhoto=require('./routes/photoRouter')

//Initialisation du serveur
const app=express();
// const corOptions={
//     origin:"https://localhost/:8081"
// }


//mildllewares
app.get('/',(req,res)=>{
    res.send('This is my server')
})
// app.use(cors(corOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use('/apiNotabene/v1/',routersUser)
app.use('/apiNotabene/v1/',routersCommentaires)
app.use('/apiNotabene/v1/',routersPhoto)

//listen on port
app.listen(port,()=>{
    console.log(`server started at http://localhost/:${port}`)
})