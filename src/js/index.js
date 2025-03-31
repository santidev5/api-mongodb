(async function () {
    async function getMoviesData() {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page");

        const res = await fetch(`/api/movies?page=${page}`);
        const data = await res.json();
        const { movies, pages } = data;
        return {
            pagination: {
                pages: parseInt(pages),
                page: parseInt(page),
            },
            movies: movies,
        };
    }

    renderMovies();

    async function renderMovies() {
        const moviesC = document.querySelector(".movies");
        if (moviesC) {
            moviesC.innerHTML = "";
        }
        const { movies } = await getMoviesData();
        if (movies.length > 0) {
            const frgm = document.createDocumentFragment();
            movies.forEach((movie) => {
                const movieC = createMovieElements(movie);
                moviesC.appendChild(movieC);
            });

            frgm.appendChild(moviesC);
            const main = document.querySelector("main");
            main.insertBefore(frgm, document.querySelector(".pagination"));
        }
    }

    function createMovieElements(movie) {
        const movieC = document.createElement("DIV");
        movieC.classList.add("movie");
        movieC.dataset.id = movie._id;

        const posterC = createPoster(movie);

        const content = createContent(movie);

        const actions = createActions(movie);

        content.appendChild(actions);
        movieC.appendChild(posterC);
        movieC.appendChild(content);
        return movieC;
    }

    function createPoster(movie) {
        const posterC = document.createElement("DIV");
        posterC.classList.add("movie__poster-container");
        const poster = document.createElement("IMG");
        poster.classList.add("movie__poster");
        poster.src =
            movie.poster ??
            "https://kzmnnrx7q0ns0pyx3ccz.lite.vusercontent.net/placeholder.svg?height=450&width=300";
        poster.alt = movie.title;
        posterC.appendChild(poster);
        return posterC;
    }
    function createContent(movie) {
        const content = document.createElement("DIV");
        content.classList.add("movie__content");

        const header = document.createElement("DIV");
        header.classList.add("movie__header");

        const h2 = document.createElement("H2");
        h2.classList.add("movie__heading");
        h2.title = movie.title;
        h2.textContent = movie.title;

        const year = document.createElement("SPAN");
        year.classList.add("movie__year");
        year.textContent = movie.year;

        header.appendChild(h2);
        header.appendChild(year);

        const genres = document.createElement("DIV");
        genres.classList.add("movie__genres");
        movie.genres.forEach((g) => {
            const genre = document.createElement("P");
            genre.classList.add("movie__genre");
            genre.textContent = g;
            genres.appendChild(genre);
        });

        content.appendChild(header);
        content.appendChild(genres);

        return content;
    }

    function createActions({ _id }) {
        const actions = document.createElement("DIV");
        actions.classList.add("movie__actions");

        const editBtn = document.createElement("BUTTON");
        editBtn.classList.add("movie__action", "movie__action--edit");
        editBtn.title = "Edit movie";
        editBtn.onclick = () => {
            renderModal();
            const modal = document.querySelector(".modal");
            modal.showModal();
        };
        const editBtnIcon = document.createElement("IMG");
        editBtnIcon.classList.add("movie__action-icon");
        editBtnIcon.src = "/src/images/pencil.svg";
        editBtnIcon.alt = "pen icon";
        editBtn.append(editBtnIcon);

        const deleteBtn = document.createElement("BUTTON");
        deleteBtn.classList.add("movie__action", "movie__action--delete");
        deleteBtn.title = "Delete movie";
        deleteBtn.onclick = () => {
            deleteMovie(_id);
        };

        const deleteBtnIcon = document.createElement("IMG");
        deleteBtnIcon.classList.add("movie__action-icon");
        deleteBtnIcon.src = "/src/images/trash.svg";
        deleteBtnIcon.alt = "trash icon";

        deleteBtn.appendChild(deleteBtnIcon);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        return actions;
    }

    async function deleteMovie(movieId) {
        const res = await fetch(`/${movieId}`, {
            method: "DELETE",
        });
        const { state, msg } = await res.json();
        if (state === 1) {
            const movie = document.querySelector(`[data-id='${movieId}']`);
            movie.remove();
        }
        showAlert(msg);
        renderMovies(data);
    }

    function showAlert(msg, remove = true) {
        const prevAlert = document.querySelector(".alerts");
        if (prevAlert) {
            prevAlert.remove();
        }
        const alerts = document.createElement("DIV");
        alerts.classList.add("alerts");
        const alert = document.createElement("P");
        alert.classList.add("alert", "text-center");
        alert.textContent = msg;
        alerts.appendChild(alert);
        const main = document.querySelector("main");
        main.insertBefore(alerts, document.querySelector(".movies"));
        deleteAlert(alerts);
    }

    function deleteAlert(element) {
        setTimeout(() => {
            element.remove();
        }, 1500);
    }

    async function pagination(data) {
        const { pagination } = data;

        const { pages, page } = pagination;

        const nextBtn = document.querySelector(".pagination__next");
        const prevBtn = document.querySelector(".pagination__prev");
        nextBtn.href = page < pages ? `?page=${page + 1}` : "#";
        nextBtn.classList.toggle("hidden", page === pages);
        prevBtn.href = page > 1 ? `?page=${page - 1}` : "#";
        prevBtn.classList.toggle("hidden", page === 1);

        const halfRange = Math.floor(10 / 2);

        const start = Math.max(1, page - halfRange);
        const end = Math.min(pages, page + halfRange + 1);

        const fragment = document.createDocumentFragment();

        for (let index = start; index <= end; index++) {
            if (index === page) {
                const currentP = document.createElement("SPAN");
                currentP.classList.add("pagination__current-page");
                currentP.textContent = index;
                fragment.appendChild(currentP);
            } else {
                const numPage = document.createElement("A");
                numPage.textContent = index;
                numPage.classList.add("pagination__page");
                numPage.href = `?page=${index}`;
                fragment.appendChild(numPage);
            }
        }
        const paginationNumbers = document.querySelector(
            ".pagination__numbers"
        );
        paginationNumbers.appendChild(fragment);
    }

    const data = await getMoviesData();
    pagination(data);
})();
