import UI from "./utils/script.js";
import ValidationError from "./utils/errors/validationError.js";
import { api } from "./apis/api.js";
import { Storage } from "./utils/storage.js";

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
          id: "user-email",
          class: "w-100",
          type: "email",
          placeholder: "email",
          required: "",
        }),
        UI.createElement("input", {
          id: "user-password",
          class: "w-100",
          type: "password",
          placeholder: "password",
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

function validateLoginForm(credentials) {
  if (!credentials.email.includes("@")) {
    throw new ValidationError("Invalid login");
  }
  if (credentials.password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters long");
  }
  return true;
}

async function login() {
  try {
    const email = document.querySelector("#user-email").value.trim();
    const password = document.querySelector("#user-password").value.trim();
    const credentials = {
      email,
      password,
    };
    const isValid = validateLoginForm(credentials);
    if (isValid) {
      const response = await api.auth.login(credentials);
      console.log(response);
      if (response.accessToken && response.user) {
        Storage.setItem("token", response.accessToken);
        Storage.setItem("user", response.user);
        window.location.assign("home.html");
      } else {
        alert("Invalid email or password");
      }
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
