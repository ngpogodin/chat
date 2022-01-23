module.exports = class RoomDto {
    constructor(model) {
        this.name = model.name
        this.admins = model.admins
        this.id = model._id
        this.isClose = model.isClose
        this.users = model.users
        this.messages = model.messages
    }
    isCloseMethod() {
        if(!this.isClose) return this
        delete this.users
        delete this.messages
        return this
    }
}