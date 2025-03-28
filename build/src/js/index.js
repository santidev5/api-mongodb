let movies;
(async function () {
    const req = await fetch("/api/movies");
    movies = await req.json();

    movies.forEach((m) => {
        const movieContainer = document.createElement("ARTICLE");
        movieContainer.dataset.id = m._id;
        movieContainer.classList.add("movie");

        const movieContent = document.createElement("DIV");
        movieContent.classList.add("movie__content");

        const movieHeader = document.createElement("DIV");
        movieHeader.classList.add("movie__header");

        const heading = document.createElement("H2");
        heading.classList.add("movie__heading");
        heading.title = m.title ?? "";
        heading.textContent = m.title ?? "";

        const year = document.createElement("SPAN");
        year.classList.add("movie__year");
        year.textContent = m.year ?? "";

        const posterContainer = document.createElement("DIV");
        posterContainer.classList.add("movie__poster-container");
        const poster = document.createElement("IMG");
        poster.classList.add("movie__poster");
        poster.src =
            m.poster ??
            "https://kzmnnrx7q0ns0pyx3ccz.lite.vusercontent.net/placeholder.svg?height=450&width=300"; // <- default image
        poster.alt = m.title ?? "";

        const genres = document.createElement("SPAN");
        genres.classList.add("movie__genres");
        m.genres.forEach((g) => {
            const genre = document.createElement("P");
            genre.textContent = g ?? "";
            genre.classList.add("movie__genre");
            genres.appendChild(genre);
        });

        const deleteBtn = document.createElement("BUTTON");
        deleteBtn.classList.add("movie__delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            const movieId = e.target.closest(".movie").dataset.id;
            fetch(`/${movieId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(({ deletedCount }) => {
                    if (deletedCount === 1) {
                        const movie = document.querySelector(
                            `[data-id='${movieId}']`
                        );
                        movie.remove();
                    } else {
                        alert("Movie could'n be deleted");
                    }
                });
        });

        movieHeader.appendChild(heading);
        movieHeader.appendChild(year);
        movieContent.appendChild(movieHeader);
        movieContent.appendChild(genres);
        movieContent.appendChild(deleteBtn);
        posterContainer.appendChild(poster);

        movieContainer.appendChild(movieContent);
        movieContainer.appendChild(posterContainer);

        const frgm = document.createDocumentFragment();
        frgm.appendChild(movieContainer);
        document.querySelector(".movies").appendChild(frgm);
    });
})();
