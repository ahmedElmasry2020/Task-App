const express = require('express');
const User = express.Router();
const mongoose =require('mongoose');
const userSchema = require('../db/models/user');
// insert user To DataBase
User.post('/', (req, res, next) => {
    const user = new userSchema({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(data => {
        res.status(200).json({
            message: 'sucess saved user',
            dat: data
        })
    }).catch(err => {
        res.status(400).json({
            message: 'can\'t save user',
            error: err.toString()
        })
    })

})

//fetch Users From DataBase
User.get('/', (req, res, next) => {
    userSchema.find().exec().then(data => {
        res.status(200).json({
            message: "Sucess",
            dat: data
        })
    }).catch(err => {
        res.status(400).json({
            "message": "error",
            error: err
        })
    })
})
//Fetch Single Task From database
User.get('/:id', (req, res, next) => {
    const id = req.params.id
    userSchema.findById(id).exec().then(user => {
        if (!user) {
            return res.status(404).json({
                message: "Not Found"
            })
        }
        res.status(200).json({
            message: "Sucess",
            dat: user
        })
    }).catch(err => {
        res.status(400).json({
            "message": "error",
            error: err
        })
    })
})

//update user 
User.patch('/:id', (req, res, next) => {
    var idd = req.params.id;
    var id = mongoose.Types.ObjectId(idd);
    
    userSchema.updateOne({_id:id},req.body,{ runValidators: true }).exec().then(result => {
        res.status(200).json({
            message: "sucess",
            dat: result
        })
    }).catch(err => {
        res.status(400).json({
            message: "failed",
        })
        console.log(err)
    })
})

//Delete User
User.delete('/:id',(req,res,next)=>{
    const idd =req.params.id;
    var id = mongoose.Types.ObjectId(idd);
  
    userSchema.deleteOne({_id:id}).exec().then(result=>{
      res.status(200).json({
          message:"Sucess",
          resu:result
      })
    }).catch(err=>{
        res.status(400).json({
            message:"Error",
            er:err
        })
    })
  })
  

module.exports = User