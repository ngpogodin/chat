module.exports = class {
    constructor(model) {
        this.username = model.username
        this.id = model._id
        this.roomsList = model.roomsList
    }
    isUser() {
        delete this.roomsList
        return this
    }
}