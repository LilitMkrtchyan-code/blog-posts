import UI from "../utils/script.js";
import ValidationError from "../utils/errors/validationError.js";
import Api from "../utils/api.js";

const api = new Api("https://simple-blog-api-red.vercel.app");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

function createUpdatePostHeader() {
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
          UI.createElement("h1", { class: "title" }, "Update Post"),
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

function createUpdatePostForm() {
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
        { id: "update-post-form", class: "post-form d-flex", action: "#" },
        [
          UI.createElement(
            "div",
            {
              id: "update-error-message",
              class: "error-message t-center d-none",
            },
            ""
          ),
          UI.createElement("div", { class: "input-group" }, [
            UI.createElement("input", {
              id: "update-post-title",
              class: "post-form-title input-field w-100",
              type: "text",
              placeholder: "Title...",
            }),
            UI.createElement("input", {
              id: "update-post-name",
              class: "post-form-name input-field w-100",
              type: "text",
              placeholder: "Author Name...",
            }),
            UI.createElement("input", {
              id: "update-post-image",
              class: "post-form-image input-field w-100",
              type: "url",
              placeholder: "Image Link...",
            }),
            UI.createElement("textarea", {
              id: "update-post-story",
              class: "post-form-story input-field w-100",
              name: "update-post-story",
              rows: "6",
              placeholder: "Story...",
            }),
          ]),
          UI.createElement(
            "div",
            { class: "btn-content post-btn t-center" },
            UI.createElement(
              "button",
              { class: "btn f-w-500", type: "submit" },
              "Update"
            )
          ),
        ]
      )
    )
  );
}

function createPostLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createUpdatePostHeader(),
    createUpdatePostForm(),
  ]);
  UI.render(page, document.body);
}
createPostLayout();

function fillPostForm(post) {
  updatePostTitle.value = post.title;
  updatePostName.value = post.authorName;
  updatePostImage.value = post.img;
  updatePostStory.value = post.story;
}

async function getUpdatePost() {
  try {
    const post = await api.getPosts("/api/posts/", postId);
    fillPostForm(post);
  } catch (error) {
    console.error("Error while retrieving data: ", error);
  }
}
getUpdatePost();


function validateForm(post) {
  if (!post.title) {
    throw new ValidationError("Invalid title");
  }
  if (!post.authorName) {
    throw new ValidationError("Invalid name");
  }
  if (!UI.isValidUrl(post.img)) {
    throw new ValidationError("Invalid URL");
  }
  if (!post.story) {
    throw new ValidationError("Invalid story");
  }
  return true;
}

document
  .querySelector("#update-post-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const updatedPost = {
        title: updatePostTitle.value.trim(),
        authorName: updatePostName.value.trim(),
        img: updatePostImage.value.trim(),
        story: updatePostStory.value.trim(),
      };
      if (validateForm(updatedPost)) {
        await api.updatePost("/api/posts/", postId, updatedPost);
        console.log("Post updated successfully");
      }
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);
    } catch (error) {
      console.error("Error while updating data", error);
      const updateErrorMessage = document.querySelector(
        "#update-error-message"
      );
      updateErrorMessage.textContent = "Error while updating data";
      updateErrorMessage.classList.remove("d-none");
    }
  });

  const updatePostTitle = document.querySelector("#update-post-title");
  const updatePostName = document.querySelector("#update-post-name");
  const updatePostImage = document.querySelector("#update-post-image");
  const updatePostStory = document.querySelector("#update-post-story");
  
  