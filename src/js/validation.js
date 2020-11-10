const validationInputs = document.getElementsByClassName("valid-input");

export const showError = (elem) => {
  const error = document.createElement("div");
  const errorMessage = document.createElement("li");
  const errorClass = elem.dataset.name.toString() + "-error";
  const errorContainer = document.querySelector(`.${errorClass}`);

  if (!errorContainer) {
    errorMessage.textContent = "Please, enter your " + elem.dataset.name + ".";
    error.append(errorMessage);
    error.classList.add(
      "ui",
      "error",
      "message",
      "error-message",
      "visible",
      errorClass
    );
    elem.after(error);
  }
};

const errorHandler = (elem) => {
  if (elem.value.length !== 0) {
    elem.classList.remove("invalid");
    elem.classList.add("valid");
  } else {
    elem.classList.add("invalid");
    elem.classList.remove("valid");
    showError(elem);
  }
};

export const validationListener = () => {
  for (let input of validationInputs) {
    input.addEventListener("blur", (e) => {
      errorHandler(e.target);
    });

    input.addEventListener("input", (e) => {
      if (e.target.value !== 0) {
        const errorClass = e.target.dataset.name.toString() + "-error";
        let errorContainer = document.querySelector(`.${errorClass}`);
        if (errorContainer) {
          errorContainer.remove();
        }
      }
    });
  }
};
