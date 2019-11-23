const express =require('express');
const app =express();
const user=require('../src/Routes/user');
const task =require ('../src/Routes/task');
const port =process.env.PORT || 3000;


app.use(express.json());
app.listen(port,()=>{
    console.log('app is listen to port'+port);
})
// app.use((req,res,next)=>{
//     if(req.method =='GET'){
//         res.status(503).json({
//             message:"Server Uneder Maintance",

//         })
//     }
// })
app.use('/user',user);
app.use('/task',task);