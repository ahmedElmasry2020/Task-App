const mongoose = require('mongoose');
const validator = require('validator');
const dbConnect = require('../mongooseConnect');
const Schema = mongoose.Schema
const bycrpt = require('bcryptjs');

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
    password: {
        type: String,
        trim: true,
        required: true,
        validate(val) {
            if (validator.contains(val, 'password')) {
                throw Error('can\'t contain password word')
            }
            if (val.length < 6) {
                throw Error('length shoul be longer than 6')
            }
        }
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const use = await user.findOne({ email:email });
    console.log(use);
    if (!use) {
        throw new Error('unable to login');
    }
    else {
        const checkpass = await bycrpt.compare(password, use.password);
        if (!checkpass) {
            throw new Error('uncorrect password');
        }
        else {
            return use;
        }
    }
}
userSchema.pre('save', async function (next) {
    const user = this;
    console.log('just before saving');
    if (user.isModified('password')) {
        user.password = await bycrpt.hash(user.password, 8)
    }
    next()
})
const user = mongoose.model('user', userSchema);

module.exports = user;
// const user1=new user({
//    name:'hassan',
//    age:26,
//    email:'hassan.sa@g.com',
//    password:'123456'
// })

// user1.save().then(console.log('saved')).catch(err=>{console.log(err)});