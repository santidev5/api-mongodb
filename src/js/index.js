(async function () {
    const deleteBtn = document.querySelectorAll("#delete");
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const movieId = e.target.closest(".movie").dataset.id;
            deleteMovie(movieId);
        });
    });
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
        document.body.insertBefore(alerts, document.querySelector(".movies"));
        deleteAlert(alerts);
    }

    function deleteAlert(element) {
        setTimeout(() => {
            element.remove();
        }, 1500);
    }
})();
