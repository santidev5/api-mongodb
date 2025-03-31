(async function () {
    const editBtns = document.querySelectorAll("#edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            renderModal();
            const modal = document.querySelector(".modal");
            modal.showModal();
        });
    });
    function renderModal() {
        const prevModal = document.querySelector(".modal-container");
        if (prevModal) {
            prevModal.remove();
        }
        const modalContainer = document.createElement("DIV");
        modalContainer.classList.add("modal-container");

        const modal = document.createElement("DIALOG");
        modal.classList.add("modal");

        const form = document.createElement("FORM");
        form.classList.add("form");

        // Matriz de inputs y labels para el formulario
        const formElements = [
            {
                tag: "LABEL",
                classess: ["form__label"],
                attributes: { for: "title", textContent: "Title" },
            },
            {
                tag: "INPUT",
                classess: ["form__input"],
                attributes: {
                    type: "text",
                    name: "title",
                    id: "title",
                    placeholder: "Movie title",
                },
            },
            {
                tag: "LABEL",
                classess: ["form__label"],
                attributes: { for: "year", textContent: "Year" },
            },
            {
                tag: "INPUT",
                classess: ["form__input"],
                attributes: {
                    type: "number",
                    name: "year",
                    id: "year",
                    placeholder: "Movie year",
                },
            },
            {
                tag: "LABEL",
                classess: ["form__label"],
                attributes: { for: "genres", textContent: "Genres" },
            },
            {
                tag: "INPUT",
                classess: ["form__input"],
                attributes: {
                    type: "text",
                    name: "genres",
                    id: "genres",
                    placeholder: 'Movie genres separated by "," ',
                },
            },
            {
                tag: "LABEL",
                classess: ["form__label"],
                attributes: { for: "image", textContent: "Image" },
            },
            {
                tag: "INPUT",
                classess: ["form__input"],
                attributes: {
                    type: "file",
                    accept: ".jpg,.webp,.png,.jpge",
                    name: "image",
                    id: "image",
                    placeholder: "Movie image",
                },
            },
            {
                tag: "BUTTON",
                classess: ["form__button", "form__button--cancel"],
                attributes: { textContent: "Cancel" },
            },
            {
                tag: "BUTTON",
                classess: ["form__button", "form__button--save"],
                attributes: { textContent: "Save changes" },
            },
        ];

        formElements.forEach((el) => {
            const element = createElement(el.tag, el.classess, el.attributes);
            form.appendChild(element);
        });

        modal.appendChild(form);
        modalContainer.appendChild(modal);

        const fragment = document.createDocumentFragment();
        fragment.appendChild(modalContainer);

        const main = document.querySelector(".main");
        document.body.insertBefore(fragment, main);
    }

    // Funcion para crear los inputs a partir de una matriz
    function createElement(tag, classess, attributes) {
        // Creamos el elemento, tag será igual al tipo de elemento a crear
        const element = document.createElement(tag);
        // iteramos el array de clases para añadirlas en caso de que haya más de una
        for (let className of classess) {
            element.classList.add(className);
        }
        // iteramos los atributtos, y le asignamos a cada propiedad del elemento, el attr (la key en del objeto con el nombre del atributi) y le assignamos su valor correspondiente
        for (let attr in attributes) {
            element[attr] = attributes[attr];
        }
        // retornamos el elemento
        return element;
    }
})();
