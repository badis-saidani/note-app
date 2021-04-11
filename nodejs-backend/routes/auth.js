const router = require('express').Router();
const userRepository = require('../repository/userRepository');


router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await userRepository.userLogin(email, password);
        res.json(token);
    }
    catch (err) {
        next(err.message);
    }
})

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    await userRepository.userRegister(email, password);
    res.json('OK');
})

module.exports = router;