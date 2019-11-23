const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const auth = async (req, res, next) => {
    try {
        let checkToken = req.header('Authorization').split(' ')
        checkToken =checkToken[1];
        console.log(checkToken);
        const jwtData=jwt.verify(checkToken,'secret');
        console.log(jwtData);
        const user=await User.findOne({_id:jwtData._id,'tokens.token':checkToken})
        if(!user){
            throw Error('invalid user')
        }
        req.user =user
        //req.token =jwtData
        req.token=checkToken
          next();
    }
    catch (err) {
        res.status(500).json({
            message:"wrong Auth.",
            e:err
        })
    }
}

module.exports = auth;