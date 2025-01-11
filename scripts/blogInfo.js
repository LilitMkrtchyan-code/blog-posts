import UI from "./utils/script.js";

const posts = [
  {
    id: UI.getUniqueId(),
    title: "The Old Man and the Sea",
    story:
      "The Old Man and the Sea is a 1952 novella by the American author Ernest Hemingway. Written between December 1950 and February 1951, it was the last major fictional work Hemingway published during his lifetime. It tells the story of Santiago, an aging fisherman, and his long struggle to catch a giant marlin.",
    authorName: "Ernest Hemingway",
    img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1611776081i/30767735._SX540_.jpg",
  },
  {
    id: UI.getUniqueId(),
    title: "The Lord of the Rings: The Fellowship of the Ring",
    story:
      "One ring to rule them all, one ring to find them, one ring to bring them all and in the darkness bind them, in the Land of Mordor where the Shadows lie.",
    authorName: "J.R.R. Tolkien",
    img: "https://img.hulu.com/user/v3/artwork/3c4e0a9f-c6f2-44f4-a703-a18c6be2a937?base_image_bucket_name=image_manager&base_image=243fcf14-8e45-4441-96a8-be510660958a&size=600x338&format=webp",
  },
  {
    id: UI.getUniqueId(),
    title: "Pride and Prejudice",
    story:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.",
    authorName: "Jane Austen",
    img: "https://wellsvillesun.com/wp-content/uploads/2024/01/pride-and-prejudice-book-summary.jpg.webp",
  },
];

const blogPostData = {
  posts
};

export default blogPostData;
