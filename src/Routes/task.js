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
// fetch Task From DataBase

module.exports = titleDesc