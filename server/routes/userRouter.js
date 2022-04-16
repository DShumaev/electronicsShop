const Router = require('express');
const userController = require('../controllers/userController');
const authCheck = require('../middleware/authMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authCheck, userController.tokenUpdate);

module.exports = router;
