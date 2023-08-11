//importation des modules
const express=require('express');
const cors=require('cors');
const port=8082
const routers=require('./routes/userRouter')

//Initialisation du serveur
const app=express();
// const corOptions={
//     origin:"https://localhost/:8081"
// }


//mildllewares
app.get('/',(req,res)=>{
    res.send('bonjour')
})
// app.use(cors(corOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/apiNotabene/v1/',routers)

//listen on port
app.listen(port,()=>{
    console.log(`server started at http://localhost/:${port}`)
})