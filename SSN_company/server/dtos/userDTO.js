module.exports = class UserDTO{
    id;
    role;

    constructor(model){
        this.id = model.id;
        this.role = model.role;
    }
}   