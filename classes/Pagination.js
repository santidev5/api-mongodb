export class Pagination {
    constructor(totalLogs, logsPerPage, currentPage) {
        this.totalLogs = totalLogs;
        this.logsPerPage = logsPerPage;
        this.currentPage = currentPage ?? 1;
    }

    totalPages() {
        return Math.ceil(this.totalLogs / this.logsPerPage);
    }

    offset() {
        return this.logsPerPage * (this.currentPage - 1);
    }

    nextPage() {
        if (this.currentPage < this.totalPages()) {
            return this.currentPage + 1;
        }
        return false;
    }
    prevPage() {
        if (this.currentPage > 1) {
            return this.currentPage - 1;
        }
        return false;
    }
    nextLink() {
        if (this.nextPage()) {
            return `
                <a href=?page=${this.nextPage()} class="pagination__next">&gt;</a>
            `;
        }
        return "";
    }
    prevLink() {
        if (this.prevPage()) {
            return `
                <a href=?page=${this.prevPage()} class="pagination__prev">&lt;</a>
            `;
        }
        return "";
    }

    pagesNumber(range = 10) {
        const totalPages = this.totalPages();
        // esto crea un rango medio de paginas, es decir si estamos en la pagina 5 mostramos las paginas 3,4,5,6,7
        const halfRange = Math.floor(range / 2);

        // Inicio del bucle for, max va elegir el mayor de dos numeros
        // De esta forma si la pagina actual es la 5 le restamos el rango medio que en este caso sería 2 nos queda 3, osea arrancamos a contar desde el 3
        const start = Math.max(1, this.currentPage - halfRange);

        // tomamos el minimo, si la pagina actual más el rango medio (2) es menor al total de paginas arrancamos desde ese rango, por ejemplo la pagina actual es 5 + 2 = 7, terminaríamos el bucle en en el 7
        const end = Math.min(totalPages, this.currentPage + halfRange + 1);

        // Con lo anterior creamos los respectivos numeros de pagina correspondiendo la pagina donde nos encontremos

        let links = "";
        for (let i = start; i < end; i++) {
            if (this.currentPage === i) {
                links += `
                    <span class="pagination__current-page">${i}</span>
                `;
            } else {
                links += `
                    <a href="?page=${i}" class="pagination__page">${i}</a>
                `;
            }
        }
        return links;
    }
    pagination() {
        if (this.totalLogs > 1) {
            const html = `
                <div class="pagination">
                    ${this.prevLink() ? this.prevLink() : ""}
                    <div class="pagination__numbers">
                        ${this.pagesNumber()}
                    </div>
                    ${this.nextLink() ? this.nextLink() : ""}
                </div>
            `;
            return html;
        }
    }
}
