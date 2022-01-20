const Router = require('express');
const router = new Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/' ,roomController.createRoom);
router.get('/',roomController.getAllRooms);
router.get('/:id', roomController.getById);
router.post('/invite', roomController.inviteToRoom); //add middleware
router.post('/remove', roomController.removeMember); //add middleware
router.delete('/:id', roomController.deleteRoom); //add middleware


module.exports = router
