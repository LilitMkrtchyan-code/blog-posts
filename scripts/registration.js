import UI from "./utils/script.js";
import ValidationError from "../scripts/utils/errors/validationError.js";
import { api } from "./apis/api.js";

function createRegistrationHeader() {
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
              { href: "index.html", class: "navigation-link f-w-500 t-center" },
              "Log in"
            ),
          ]),
        ]
      )
    )
  );
}

function createRegistrationForm() {
  return UI.createElement(
    "div",
    { class: "root-container" },
    UI.createElement(
      "div",
      {
        class:
          "form-wrapper d-flex justify-content-center align-items-center h-100",
      },
      UI.createElement(
        "form",
        { action: "#", class: "user-data-form d-flex", id: "reg-user-form" },
        [
          UI.createElement(
            "div",
            { id: "error-message", class: "error-message t-center d-none" },
            ""
          ),
          UI.createElement("input", {
            type: "text",
            id: "reg-first-name",
            class: "reg-first-name w-100",
            placeholder: "first name",
          }),
          UI.createElement("input", {
            type: "text",
            id: "reg-last-name",
            class: "reg-last-name w-100",
            placeholder: "last name",
          }),
          UI.createElement("input", {
            type: "text",
            id: "reg-user-login",
            class: "reg-user-login w-100",
            placeholder: "username",
          }),
          UI.createElement("input", {
            type: "email",
            id: "reg-user-email",
            class: "reg-user-email w-100",
            placeholder: "email",
          }),
          UI.createElement("input", {
            type: "password",
            id: "reg-user-password",
            class: "reg-user-password w-100",
            placeholder: "password",
          }),
          UI.createElement("input", {
            id: "reg-image-upload",
            class: "reg-image-upload w-100",
            type: "file",
          }),
          UI.createElement(
            "div",
            {
              class: "gender-selection d-flex justify-content-center",
            },
            UI.createElement(
              "div",
              { class: "btn-content" },
              UI.createElement(
                "button",
                { class: "btn", type: "submit" },
                "Submit"
              )
            )
          ),
        ]
      )
    )
  );
}

function createRegistrationLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createRegistrationHeader(),
    createRegistrationForm(),
  ]);
  UI.render(page, document.body);
}
createRegistrationLayout();

async function createNewUser() {
  try {
    const firstName = document.querySelector("#reg-first-name").value.trim();
    const lastName = document.querySelector("#reg-last-name").value.trim();
    const username = document.querySelector("#reg-user-login").value.trim();
    const email = document.querySelector("#reg-user-email").value.trim();
    const password = document.querySelector("#reg-user-password").value.trim();
    const userImageUpload = document.querySelector("#reg-image-upload");
    console.log(userImageUpload);

    const uploadedImage = await api.fileUpload.upload(userImageUpload.files[0]);

    const user = {
      firstName,
      lastName,
      username,
      email,
      password,
      avatar: uploadedImage.url,
    };
    const isValid = validateForm(user);
    if (!isValid) {
      console.log("The entered data is invalid.");
      return;
    }
    await addUser(user);
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

async function addUser(newUser) {
  try {
    const response = await api.auth.register(newUser);
    console.log(response);
    if (response && response.id) {
      console.log("User registered successfully!");
      window.location.assign("index.html");
    } else {
      alert("Something is wrong, please check your details");
    }
  } catch (error) {
    console.error("User registration failed:", error);
    alert("Registration failed: " + error.message);
  }
}

function validateForm(user) {
  if (!user.firstName) {
    throw new ValidationError("Invalid first name");
  }
  if (!user.lastName) {
    throw new ValidationError("Invalid last name");
  }
  if (!user.email.includes("@")) {
    throw new ValidationError("Invalid email address");
  }
  if (user.username.length < 6) {
    throw new ValidationError("Username must be at least 6 characters");
  }
  if (user.password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters");
  }
  return true;
}

document
  .querySelector("#reg-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createNewUser();
  });

UI.clearErrorMessage();
