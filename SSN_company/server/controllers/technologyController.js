const ApiError = require("../error/ApiError");
const Controller = require("./controller");

const technologyService = require("../service/technologyService");

class TechnologyController extends Controller {
    async create(req, res) {  
        const {id_user, id_stack} = req.body;
        console.log(id_stack)
        const wish = await technologyService.create(id_user, id_stack);

        return res.json(wish);
    }

    async getAll(req, res) {  
        const technology = await technologyService.getAll();

        return res.json(technology);
    }

    async deleteWish(req, res){
        const {id} = req.body;

        const wish = await technologyService.deleteWish(id);

        return res.json(wish);
    }
}

module.exports = new TechnologyController();