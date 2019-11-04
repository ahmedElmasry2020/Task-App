const express = require('express');
const mongoose =require('mongoose');

const titleDesc = express.Router();
const taskSchema = require('../db/models/task');

//Save Task To DataBase
titleDesc.post('/', (req, res, next) => {
    const task = new taskSchema({
        Title: req.body.title,
        Description: req.body.desc
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
titleDesc.get('/', (req, res, next) => {
    taskSchema.find().exec().then(data => {
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
titleDesc.get('/:id', (req, res, next) => {
    const id = req.params.id
    taskSchema.findById(id).exec().then(task => {
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
    taskSchema.updateOne({_id:id},req.body,{ runValidators: true }).exec().then(result => {
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
titleDesc.delete('/:id',(req,res,next)=>{
  const idd =req.params.id;
  var id = mongoose.Types.ObjectId(idd);

  taskSchema.deleteOne({_id:id}).exec().then(result=>{
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