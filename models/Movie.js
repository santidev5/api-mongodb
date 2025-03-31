import { ObjectId } from "mongodb";

import { getCollection } from "../DB/database.js"; // <- conexion a base de datos
export class MovieModel {
    constructor() {
        this.collection = null;
    }
    static async initCollection() {
        if (!this.collection) {
            this.collection = await getCollection("embedded_movies");
        }
    }
    static async getByOffset(offset, logsPerPage) {
        await this.initCollection();
        const movies = await this.collection
            .find(
                {},
                { projection: { title: 1, year: 1, poster: 1, genres: 1 } } // <- traemos solo esos campos, no se pueden mezclar 1 y 0
            )
            .skip(offset)
            .limit(logsPerPage)
            .toArray();
        return movies;
    }
    static async getTotalLogs() {
        await this.initCollection();
        return await this.collection.countDocuments();
    }
    static async delete(id) {
        await this.initCollection();
        return this.collection.deleteOne({
            _id: ObjectId.createFromHexString(id),
        });
    }
    static async update(id) {
        await this.initCollection();
    }
}
