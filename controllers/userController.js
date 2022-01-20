const userModel = require('../models/userModel')


class UserController {
    async getUser(req,res,next) {
        try{
            const username = req.params.username
            const user = await userModel.findOne({username}).select('-hash -_id -__v');
            res.json(user)
        }catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()