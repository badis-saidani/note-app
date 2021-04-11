const User = require('../models/user');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const saltRounds = 10;
const hashPassword = function (plainPassword) {
    return bcrypt.hash(plainPassword, saltRounds);
}

const comparePassword = function(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}


const getToken = function (uid) {
    const token = jwt.sign({
        uid
    }, 'zolasproperty');
    return token;
}

async function userRegister(email, password) {
    const hashedPwd = await hashPassword(password);
    const user = await User.createUser(email, hashedPwd);
    console.log(user, hashedPwd);
}

async function userLogin(email, password) {
    const user = await User.getUserByEmail(email);
    
    if(user && await comparePassword(password, user.pwd)) {
        const token = getToken(user._id);
        return token;
    }
    else {
        throw new Error('Invalid Email or Password');
    }
}



module.exports = { userRegister, userLogin }