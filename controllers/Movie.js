import { Pagination } from "../classes/Pagination.js";
import { MovieModel } from "../models/Movie.js";
import { validateId } from "../schemas/schemas.js";

export class MovieController {
    static async index(req, res) {
        const page = parseInt(req.query.page);
        // En caso de que la pagina no sea un numero
        if (isNaN(page)) {
            return res.redirect("?page=1");
        }
        const totalLogs = await MovieModel.getTotalLogs();
        const pagination = new Pagination(totalLogs, 10, page);
        res.render("layout", {
            content: "pages/index",
            pagination: pagination.pagination(),
            title: "Movies",
        });
    }
    static async delete(req, res) {
        const result = await validateId({ id: req.params.id }); //<- destructuramos porque el id viene como objeto

        const id = result.data;
        if (result.success) {
            const { deletedCount } = await MovieModel.delete(id);
            if (deletedCount !== 1) {
                return res.json({
                    state: 0,
                    msg: "movie could'n be deleted",
                });
            }
            res.json({
                state: deletedCount,
                msg: "movie has been deleted",
            });
        } else {
            res.json({
                state: 0,
                msg: "movie id is invalid",
            });
        }
    }
    static async update(req, res) {}
}
