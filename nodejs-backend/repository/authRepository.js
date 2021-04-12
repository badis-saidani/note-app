const User = require('../models/user');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const saltRounds = 10;
const hashPassword = function (plainPassword) {
    return bcrypt.hash(plainPassword, saltRounds);
}

const comparePassword = function (password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

const secret = 'zolasproperty';

const getJWT = function (uid) {
    const token = jwt.sign({
        uid
    }, secret, { expiresIn: '1h' });
    return token;
}

function autheticateByJWT(req, res, next) {
    const token = req.jwt;
    try {
        const decoded = jwt.verify(token, secret);
        req.jwt = decoded;
        next();
    } catch (err) {
        next(err);
    }
}

async function userRegister({ username, email, password }) {
    const hashedPwd = await hashPassword(password);
    const user = await User.createUser(username, email, hashedPwd);
    console.log(user, hashedPwd);
}

async function userLogin({ username, password }) {
    const user = await User.getUserByUid(username);

    if (user && await comparePassword(password, user.pwd)) {
        const token = getJWT(user.uid);
        return token;
    }
    else {
        throw new Error('Invalid Username or Password');
    }
}



module.exports = { userRegister, userLogin, autheticateByJWT }