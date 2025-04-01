(function () {
    const cancelButton = document.querySelector(".form__button--cancel");
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.close();
    });
})();
