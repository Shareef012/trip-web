const express=require('express')
const app=express()
app.use()
app.get('/',(req,res)=>{
    console.log(req.query);
})
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})