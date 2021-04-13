const router = require('express').Router();
const authRepository = require('../repository/authRepository');


router.get('/', authRepository.autheticateByJWT, async (req, res, next) => {
    try {
        res.json({ uid: req.user._id, username: req.user.uid, email: req.user.email });
    }
    catch (err) {
        next(err.message);
    }
})

router.post('/login', async (req, res, next) => {
    console.log('you called me! , ', req.body);
    try {
        const { username, password } = req.body;
        const userInfo = await authRepository.userLogin({ username, password });
        res.json(userInfo);
    }
    catch (err) {
        next(err.message);
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await authRepository.userRegister({ username, email, password });
        res.json('OK');
    }
    catch (err) {
        next(err.message);
    }
})

module.exports = router;