const router = require('express').Router();
const authRepository = require('../repository/authRepository');


router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authRepository.userLogin({ username, password });
        res.json(token);
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