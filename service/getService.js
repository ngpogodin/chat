
module.exports = class  {
    constructor(model) {
        this.model = model
    }
    async getAll(limit,offset) {
        const arr = await this.model.find().skip(offset * limit - limit).limit(limit);
        return arr
    }

}