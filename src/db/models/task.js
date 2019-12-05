const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const connectDb = require('../mongooseConnect');

connectDb();

const titleDescSchema = new Schema({
    Title: {
        type: String,
        trim: true,
        required: true
    },
     Description: {
        type: String,
        trim: true,
        required: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})
const titleDesc = mongoose.model('TitleDesc', titleDescSchema);

module.exports = titleDesc;