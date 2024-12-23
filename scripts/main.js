import UI from "../utils/script.js";
import ValidationError from "../utils/errors/validationError.js";

function createLoginHeader() {
  return UI.createElement(
    "header",
    { class: "header" },
    UI.createElement(
      "div",
      { class: "root-container" },
      UI.createElement(
        "div",
        {
          class:
            "header-content d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement("h1", { class: "title" }, "Blog Post"),
          UI.createElement("div", { class: "navigation d-flex" }, [
            UI.createElement(
              "a",
              {
                href: "home.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Home"
            ),
            UI.createElement(
              "a",
              {
                href: "registration.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Sign Up"
            ),
          ]),
        ]
      )
    )
  );
}

function createLoginForm() {
  return UI.createElement(
    "div",
    {
      class:
        "form-wrapper d-flex justify-content-center align-items-center h-100",
    },
    UI.createElement("form", { class: "login-form d-flex" }, [
      UI.createElement(
        "div",
        { id: "error-message", class: "error-message t-center d-none" },
        ""
      ),
      UI.createElement("div", { class: "input-group" }, [
        UI.createElement("input", {
          id: "user-name",
          class: "w-100",
          type: "text",
          placeholder: "User name...",
          required: "",
        }),
        UI.createElement("input", {
          id: "user-password",
          class: "w-100",
          type: "password",
          placeholder: "Password...",
          required: "",
        }),
      ]),
      UI.createElement(
        "div",
        { class: "btn-content t-center" },
        UI.createElement(
          "button",
          { class: "btn f-w-500", type: "submit" },
          "Log in"
        )
      ),
    ])
  );
}

function createLoginLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createLoginHeader(),
    createLoginForm(),
  ]);
  UI.render(page, document.body);
}
createLoginLayout();

function validateLoginForm(login, password) {
  if (!login.includes("@")) {
    throw new ValidationError("Invalid login");
  }
  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long");
  }
  return true;
}

function login() {
  try {
    const inputLoginValue = document.querySelector("#user-name").value.trim();
    const inputPassValue = document
      .querySelector("#user-password")
      .value.trim();
    const isValid = validateLoginForm(inputLoginValue, inputPassValue);
    if (isValid) {
      window.location.href = "home.html";
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const errorMessage = document.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("d-none");
      }
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrorMessage();
    login();
  });

function clearErrorMessage() {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.classList.add("d-none");
  }
}
