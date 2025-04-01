import { Pagination } from "../classes/Pagination.js";
import { MovieModel } from "../models/Movie.js";

export class APIMoviesController {
    static async index(req, res) {
        const page = parseInt(req.query.page);
        // En caso de que la pagina no sea un numero
        if (isNaN(page)) {
            return res.redirect("?page=1");
        }
        const totalLogs = await MovieModel.getTotalLogs();
        const pagination = new Pagination(totalLogs, 5, page);
        const movies = await MovieModel.getByOffset(
            pagination.offset(),
            pagination.logsPerPage
        );
        res.json({ movies: movies, pages: pagination.totalPages() });
    }
}
