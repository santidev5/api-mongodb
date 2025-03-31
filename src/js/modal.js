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
            attributes: { htmlFor: "title", textContent: "Title" },
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
            attributes: { htmlFor: "year", textContent: "Year" },
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
            attributes: { htmlFor: "genres", textContent: "Genres" },
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
            classess: ["form__label", "form__label--image"],
            attributes: {
                htmlFor: "image",
                textContent: "Click to upload an image",
            },
        },
        {
            tag: "INPUT",
            classess: ["form__input", "form__input--image"],
            attributes: {
                type: "file",
                accept: ".jpg,.webp,.png,.jpge",
                name: "image",
                id: "image",
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

    // Create and add inputs to form
    createInputs(formElements, form);

    modal.appendChild(form);
    modalContainer.appendChild(modal);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(modalContainer);

    const main = document.querySelector(".main");
    document.body.insertBefore(fragment, main);

    createCancelButton();
}

function createCancelButton() {
    const cancelButton = document.querySelector(".form__button--cancel");
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = document.querySelector(".modal");
        const modalContainer = document.querySelector(".modal-container");
        modal.close();
        modalContainer.remove();
    });
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
    return element;
}

function createInputs(formElements, form) {
    // For con paso dos para crear los elementos y agregarlos en par de label,input a un div
    for (let i = 0; i < formElements.length; i += 2) {
        const formField = document.createElement("DIV");

        if (formElements[i].tag !== "BUTTON") {
            formField.classList.add(
                "form__field",
                `form__field--${formElements[i + 1].attributes.name}`
            );
        } else {
            formField.classList.add("form__actions");
        }

        if (formElements[i].classess.includes("form__label--image")) {
            const labelImage = document.createElement("LABEL");
            labelImage.classList.add("form__label");
            labelImage.textContent = "Image";
            formField.appendChild(labelImage);
        }

        // creo el label con las propiedades del primer objeto
        const element1 = createElement(
            formElements[i].tag,
            formElements[i].classess,
            formElements[i].attributes
        );

        // creo el input con el segundo objeto
        const element2 = createElement(
            formElements[i + 1].tag,
            formElements[i + 1].classess,
            formElements[i + 1].attributes
        );

        // agrego el lable y el input al div
        formField.appendChild(element1);
        formField.appendChild(element2);
        // creamo el div al formulario
        form.appendChild(formField);
    }
}
