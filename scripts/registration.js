import UI from "../utils/script.js";
import ValidationError from "../utils/errors/validationError.js"

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
            placeholder: "First Name",
          }),
          UI.createElement("input", {
            type: "text",
            id: "reg-last-name",
            class: "reg-last-name w-100",
            placeholder: "Last Name",
          }),
          UI.createElement("input", {
            type: "email",
            id: "reg-user-email",
            class: "reg-user-email w-100",
            placeholder: "Email",
          }),
          UI.createElement("input", {
            type: "text",
            id: "reg-user-login",
            class: "reg-user-login w-100",
            placeholder: "Username",
          }),
          UI.createElement("input", {
            type: "password",
            id: "reg-user-password",
            class: "reg-user-password w-100",
            placeholder: "Password",
          }),
          UI.createElement(
            "div",
            {
              class:
                "gender-selection d-flex justify-content-between align-items-center",
            },
            [
              UI.createElement(
                "div",
                {
                  class:
                    "gender-block d-flex justify-content-between align-items-center",
                },
                [
                  UI.createElement("div", { class: "gender-option" }, [
                    UI.createElement("input", {
                      type: "radio",
                      id: "male",
                      name: "gender",
                      value: "male",
                    }),
                    UI.createElement("label", { for: "male" }, " Male"),
                  ]),
                  UI.createElement("div", { class: "gender-option" }, [
                    UI.createElement("input", {
                      type: "radio",
                      id: "female",
                      name: "gender",
                      value: "female",
                    }),
                    UI.createElement("label", { for: "female" }, " Female"),
                  ]),
                ]
              ),
              UI.createElement(
                "div",
                { class: "btn-content" },
                UI.createElement(
                  "button",
                  { class: "btn", type: "submit" },
                  "Submit"
                )
              ),
            ]
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

