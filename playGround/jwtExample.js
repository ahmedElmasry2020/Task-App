var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// console.log(token)
const sign = () => {
    const signD=jwt.sign( {id:"ahmed"} , "secret");
    console.log(signD);
    const verfiy=jwt.verify(signD,"secret")
    console.log(verfiy);
}
sign()