import UI from "./utils/script.js";
import ValidationError from "./utils/errors/validationError.js";
import { api } from "./apis/api.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

function createPostHeader() {
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
          UI.createElement("h1", { class: "title" }, "Create Post"),
          UI.createElement(
            "div",
            { class: "navigation d-flex" },
            UI.createElement(
              "a",
              {
                href: "home.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Home"
            )
          ),
        ]
      )
    )
  );
}

function createPostForm() {
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
        { id: "post-form", class: "post-form d-flex", action: "#" },
        [
          UI.createElement(
            "div",
            { id: "error-message", class: "error-message t-center d-none" },
            ""
          ),
          UI.createElement("div", { class: "input-group" }, [
            UI.createElement("input", {
              id: "post-form-title",
              class: "post-form-title input-field w-100",
              type: "text",
              placeholder: "Title...",
            }),
            UI.createElement("input", {
              id: "post-form-name",
              class: "post-form-name input-field w-100",
              type: "text",
              placeholder: "Author Name...",
            }),
            UI.createElement("input", {
              id: "file-upload",
              class: "file-upload input-field w-100",
              type: "file",
            }),
            UI.createElement("textarea", {
              id: "post-form-story",
              class: "post-form-story input-field w-100",
              name: "post-form-story",
              rows: "6",
              placeholder: "Story...",
            }),
          ]),
          UI.createElement(
            "div",
            { class: "btn-content post-btn t-center" },
            UI.createElement(
              "button",
              {
                id: "post-button",
                class: "post-button btn f-w-500",
                type: "submit",
              },
              "Create Post"
            )
          ),
        ]
      )
    )
  );
}

function createPostLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createPostHeader(),
    createPostForm(),
  ]);
  UI.render(page, document.body);
}
createPostLayout();

document
  .querySelector("#post-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    createNewPost();
  });

async function createNewPost() {
  try {
    const title = document.querySelector("#post-form-title").value.trim();
    const story = document.querySelector("#post-form-story").value.trim();
    const authorName = document.querySelector("#post-form-name").value.trim();
    const fileUpload = document.querySelector("#file-upload");

    const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);

    const post = {
      title,
      story,
      authorName,
      img: uploadedFile.url,
    };
    const isValid = validateForm(post);
    if (isValid) {
      await addNewPost(post);
      UI.clearErrorMessage();
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

function validateForm(post) {
  if (!post.title) {
    throw new ValidationError("Invalid title");
  }
  if (!post.authorName) {
    throw new ValidationError("Invalid name");
  }
  if (!post.img) {
    console.log(post.img);

    throw new ValidationError("File not selected");
  }
  if (!post.story) {
    throw new ValidationError("Invalid story");
  }
  return true;
}

async function addNewPost(post) {
  try {
    const newPost = {
      id: UI.getUniqueId(),
      ...post,
    };
    if (postId) {
      const response = await api.post.update(postId, newPost);
      console.log("Post added successfully");
      window.location.assign("home.html");
    } else {
      const response = await api.post.create(newPost);
      console.log("Post added successfully");
      window.location.assign("home.html");
    }
  } catch (error) {
    console.log(error);
    window.location.assign("home.html");
  }
}

async function getPost() {
  try {
    if (postId) {
      document.querySelector("#post-button").textContent = "Update Post";
      const post = await api.post.getPostById(postId);
      document.querySelector("#post-form-title").value = post.title;
      document.querySelector("#post-form-name").value = post.authorName;
      document.querySelector("#post-form-story").value = post.story;
      document.querySelector("#file-upload").value = post.img;
    }
  } catch (error) {
    console.error("Error post:", error);
    // window.location.assign("home.html");
  }
}
getPost();
