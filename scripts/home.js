import UI from "./utils/script.js";
import { api } from "./apis/api.js";
import { isUserLogin } from "./utils/is-user-login.js";
import { Storage } from "./utils/storage.js";

function createHomeHeader() {
  const token = Storage.getItem("token");
  const isUserLogin = !!token;

  const loginButton = UI.createElement(
    "a",
    { href: "index.html", class: "navigation-link f-w-500 t-center" },
    isUserLogin ? "log Out" : "Log in"
  );

  loginButton.addEventListener('click', () => {
    if (isUserLogin) {
      Storage.clear();
    }
    window.location.assign("index.html");
  });

  return UI.createElement(
    "header",
    { class: "header w-100" },
    UI.createElement(
      "div",
      { class: "root-container w-100" },
      UI.createElement(
        "div",
        {
          class:
            "header-content d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement("h1", { class: "title tt" }, "Blog Post"),
          UI.createElement("div", { class: "navigation d-flex" }, [
            UI.createElement(
              "a",
              {
                href: "registration.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Sign Up"
            ),
            loginButton
          ]),
        ]
      )
    )
  );
}

function createBloggerCard(blogger) {
  return UI.createElement(
    "li",
    {
      class: "blogger-item d-flex justify-content-center align-items-center",
      id: blogger.id,
    },
    [
      UI.createElement("img", {
        class: "avatar",
        src: blogger.avatar ? blogger.avatar : "./images/user.png",
        alt: "user",
      }),
      UI.createElement(
        "div",
        { class: "blogger-name f-w-500 tt" },
        `${blogger.firstName} ${blogger.lastName}`
      ),
    ]
  );
}

function createHomeNavbar() {
  return UI.createElement(
    "nav",
    { class: "navbar h-100" },
    UI.createElement(
      "ul",
      { id: "blogger-list", class: "blogger-list" },
      showAllUsers()
    )
  );
}

function createPostCard(post) {
  return UI.createElement(
    "div",
    { class: "post", id: "post", "data-id": post.id },
    [
      UI.createElement(
        "div",
        {
          class:
            "post-header d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement(
            "div",
            { class: "author-name tt f-w-500" },
            post.authorName
          ),
          UI.createElement("div", { class: "post-title f-w-500" }, post.title),
        ]
      ),
      UI.createElement(
        "div",
        {
          class:
            "post-description d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement(
            "div",
            { class: "description-image" },
            UI.createElement("img", {
              src: post.img,
              alt: post.authorName,
              class: "img",
            })
          ),
          UI.createElement("div", { class: "description" }, post.story),
        ]
      ),
      UI.createElement(
        "div",
        { class: "post-controls d-flex justify-flex-end" },
        [
          UI.createElement(
            "img",
            {
              src: "images/edit.png",
              alt: "edit",
              class: "edit-icon",
              id: "edit-icon",
            },
            ""
          ),
          UI.createElement(
            "img",
            {
              src: "images/delete.png",
              alt: "delete",
              class: "delete-icon",
              id: "delete-icon",
            },
            ""
          ),
        ]
      ),
    ]
  );
}

function createHomeMain() {
  return UI.createElement(
    "div",
    { class: "main-container w-100" },
    UI.createElement(
      "main",
      { class: "main d-flex justify-content-between align-items-center h-100" },
      [
        createHomeNavbar(),
        UI.createElement(
          "div",
          { class: "main-content d-flex justify-content-between h-100" },
          [
            UI.createElement(
              "div",
              {
                class: "create-blog d-flex justify-flex-end align-items-center",
              },
              [
                UI.createElement(
                  "div",
                  { class: "btn-content t-center" },
                  UI.createElement(
                    "button",
                    {
                      class: "btn f-w-500",
                      onclick: "window.location.href='post.html';",
                    },
                    "Create blog"
                  )
                ),
              ]
            ),
            UI.createElement(
              "section",
              { class: "posts d-flex", id: "posts" },
              showPosts()
            ),
            createHomeFooter(),
          ]
        ),
      ]
    )
  );
}

function createHomeFooter() {
  return UI.createElement(
    "footer",
    { class: "footer t-center " },
    `© 2014 - ${new Date().getFullYear()} All rights reserved`
  );
}

function createHomeLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createHomeHeader(),
    createHomeMain(),
  ]);
  UI.render(page, document.body);
}

async function showPosts() {
  try {
    if (!isUserLogin()) {
      window.location.assign("index.html");
      return;
    }
    const posts = await api.post.getPosts();
    const postsContainer = document.querySelector("#posts");
    posts.forEach((post) => {
      postsContainer.prepend(createPostCard(post));
    });
    console.log("Posts successfully retrieved from server");
  } catch (error) {
    console.error("Error retrieving data", error);
  }
}

async function showAllUsers() {
  try {
    if (!isUserLogin()) {
      window.location.assign("index.html");
      return;
    }
    const users = await api.user.getUser();
    const bloggerList = document.querySelector("#blogger-list");
    users.forEach((user) => {
      const bloggerCard = createBloggerCard(user);
      bloggerList.appendChild(bloggerCard);
    });
    console.log("Users successfully retrieved from server");
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#posts")
    .addEventListener("click", async function (event) {
      let postId = null;
      if (event.target.classList.contains("delete-icon")) {
        postId = event.target.closest(".post").dataset.id;
        try {
          await api.post.delete(postId);
          console.log("Post deleted successfully");
          event.target.closest(".post").remove();
        } catch (error) {
          console.error("Error deleting post", error);
        }
      }
      if (event.target.classList.contains("edit-icon")) {
        postId = event.target.closest(".post").dataset.id;
        const postUrl = `post.html?postId=${postId}`;
        window.location.assign(postUrl);
      }
    });
});
createHomeLayout();
