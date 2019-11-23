const express = require('express');
const User = express.Router();
const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');
const userSchema = require('../db/models/user');
const auth = require('../middleware/auth');
// insert user To DataBase
User.post('/', (req, res, next) => {
    const user = new userSchema({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(data => {
        user.generateAuth().then(token => {
            console.log(token)
            res.status(201).json({
                mesaage: "Success",
                data: data,
                token: token
            })
        });
        // res.status(200).json({
        //     message: 'sucess saved user',
        //     dat: data
        // })
    }).catch(err => {
        res.status(400).json({
            message: 'can\'t save user',
            error: err.toString()
        })
    })

})

//fetch Users From DataBase auth,
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
//my Profile
User.get('/me', auth, (req, res, next) => {

    res.status(201).json({
        user: req.user
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
User.patch('/me', auth,(req, res, next) => {
    var idd = req.user._id;
    var id = mongoose.Types.ObjectId(idd);

    userSchema.updateOne({ _id: id }, req.body, { runValidators: true }).exec().then(result => {
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
User.delete('/me', auth,(req, res, next) => {
    const idd = req.user._id;
    var id = mongoose.Types.ObjectId(idd);

    userSchema.deleteOne({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "Sucess",
            resu: result
        })
    }).catch(err => {
        res.status(400).json({
            message: "Error",
            er: err
        })
    })
})


//User login

// User.post('/login', async (req, res) => {
//     const userLogin = {
//         email: req.body.email,
//         password: req.body.pass
//     }
//     const user = await userSchema.finByCredentials(userLogin.email, userLogin.password);
//     if (user) {
//         res.status(201).json({
//             message: "success",
//             user: user
//         })
//     }
//     else{
//         res.status(400).json({
//             message: "wrong",
//         })
//     }
// })

User.post('/login', async (req, res) => {
    // try {
    const email = req.body.email;
    const password = req.body.password;
    userSchema.findOne({ email: email }).exec().then(user => {
        try {
            if (!user) {
                res.status(400).json({
                    message: "no user for this email"
                })
                throw new Error('unable to login');
            }
        }
        catch (e) { console.log(e) }
        bycrpt.compare(password, user.password).then(checkPass => {
            try {
                if (!checkPass) {
                    res.status(400).json({
                        message: "wrong password"
                    })
                    throw new Error('uncorrect Password');
                }
                //console.log(user.generateAuth());
                user.generateAuth().then(token => {
                    console.log(token)
                    res.status(201).json({
                        mesaage: "Success",
                        data: user,
                        token: token
                    })
                });

            } catch (e) { console.log(e) }
        });
    })
})

//User Logout 
User.post('/logout', auth, async (req, res) => {
    console.log('hhh');
    console.log(req.user);
    console.log(req.token);
    try {
        console.log(req.user);
        console.log(req.token);
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        console.log(req.user.tokens);
        req.user.save()
        res.status(200).json({
            message: "Logout"
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Error",
            error: e
        })
    }
})

//User Logout ALL tokens 
User.post('/logout/all', auth, async (req, res) => {
   
    try {
        // req.user.tokens = req.user.tokens.filter(token => {
        //     return token.token !== req.token
        // })
        
        req.user.tokens = []; 
        // req.user.tokens.filter(token => {
        //     return token.token !== req.token
        // })
        
        console.log(req.user.tokens);
        req.user.save()
        res.status(200).json({
            message: "Logout All Tokens"
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Error",
            error: e
        })
    }
})

module.exports = User