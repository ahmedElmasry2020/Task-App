const express = require('express');
const mongoose =require('mongoose');

const titleDesc = express.Router();
const taskSchema = require('../db/models/task');
const auth =require('../middleware/auth');
//Save Task To DataBase
titleDesc.post('/', auth,(req, res, next) => {
    const task = new taskSchema({
        Title: req.body.title,
        Description: req.body.desc,
        owner :req.user._id
    })
    task.save().then(result => {
        res.status(200).json({
            data: result,
            message: "task has saved successfuly"
        })
    })
        .catch(err => {
            res.status(400).json({
                error: err.toString(),
            })
        })
})
// fetch Tasks From DataBase
titleDesc.get('/',auth, (req, res, next) => {
    taskSchema.find({owner:req.user._id}).exec().then(data => {
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

//fecth Single Task From DataBase
titleDesc.get('/:id',auth, (req, res, next) => {
    const _id = req.params.id
    taskSchema.findOne({_id,owner:req.user._id}).exec().then(task => {
        if (!task) {
             res.status(404).json({
                message: "Not Found"
            })
        }
         res.status(200).json({
            message: "Sucess",
            dat: task
        })
    }).catch(err => {
        res.status(400).json({
            "message": "error",
            error: err
        })
    })
})

//update Task 
titleDesc.patch('/:id', (req, res, next) => {
    var idd = req.params.id;
    var id = mongoose.Types.ObjectId(idd);
    const task = {
        Title: req.body.title,
        Description: req.body.desc
    }
    taskSchema.updateOne({_id:id,owner:req.user._id},req.body,{ runValidators: true }).exec().then(result => {
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

//Delete Single Task
titleDesc.delete('/:id',auth,(req,res,next)=>{
  const idd =req.params.id;
  var id = mongoose.Types.ObjectId(idd);

  taskSchema.deleteOne({_id:id,owner:req.user._id}).exec().then(result=>{
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


module.exports = titleDesc