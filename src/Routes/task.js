const express = require('express');
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

module.exports = titleDesc