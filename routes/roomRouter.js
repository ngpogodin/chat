const Router = require('express');
const router = new Router();
const roomController = require('../controllers/roomController');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');


router.post('/',roomController.createRoom);
router.get('/',roomController.getAllRooms);
router.get('/:id', roomController.getByIdOrName);
router.post('/invite',isAdminMiddleware, roomController.inviteToRoom); 
router.post('/remove',isAdminMiddleware, roomController.removeMember); 
router.delete('/:id',isAdminMiddleware, roomController.deleteRoom); 


module.exports = router
