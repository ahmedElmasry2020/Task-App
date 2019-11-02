const mongoose = require('mongoose');
const validator = require('validator');
const dbConnect = require('../mongooseConnect');
const Schema =mongoose.Schema

dbConnect()

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw Error('invalid Age');
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('invalid email format');
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(val){
            if(validator.contains(val,'password')){
                throw Error('can\'t contain password word')
            }
            if(val.length < 6){
                throw Error('length shoul be longer than 6')
            } 
        }
    }
});
const user = mongoose.model('user', userSchema);

module.exports = user;
// const user1=new user({
//    name:'hassan',
//    age:26,
//    email:'hassan.sa@g.com',
//    password:'123456'
// })

// user1.save().then(console.log('saved')).catch(err=>{console.log(err)});