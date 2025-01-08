import UI from "./utils/script.js";
import blogPostData from "./blogInfo.js";
import { api } from "./apis/api.js";
import { isUserLogin } from "./utils/is-user-login.js";

function createHomeHeader() {
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

function createBloggerCard(blogger) {
  return UI.createElement(
    "li",
    {
      class: "blogger-item d-flex justify-content-between align-items-center",
      id: blogger.id,
    },
    [
      UI.createElement("img", {
        class: "avatar",
        src: blogger.avatar,
        alt: `${blogger.firstName} ${blogger.lastName}`,
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
      { class: "blogger-list" },
      api.user.getUser().then((bloggers) => {
        bloggers.forEach((blogger) => createBloggerCard(blogger));
      })
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