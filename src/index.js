const express =require('express');
const app =express();
const user=require('../src/Routes/user');
const task =require ('../src/Routes/task');
const port =process.env.PORT || 3000;

app.use(express.json());
app.listen(port,()=>{
    console.log('app is listen to port'+port);
})

//app.use('/user',user);
app.use('/task',task);