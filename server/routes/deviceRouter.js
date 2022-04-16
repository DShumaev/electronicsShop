const Router = require('express');
const deviceRouter = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), deviceRouter.create);
router.get('/', deviceRouter.getAll);
router.get('/:id', deviceRouter.getOne);

module.exports = router;
