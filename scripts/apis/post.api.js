import { BaseApi } from "./base.js";
import { Storage } from "../utils/storage.js";

export class PostApi extends BaseApi {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }
  async getPosts() {
    try {
      const response = await fetch(`${this.getFullUrl("/posts")}`);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error(error);
    }
  }
  async getPostById(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required");
      }
      const token = Storage.getItem("token");

      if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
      }
      console.log(token);

      const response = await fetch(this.getFullUrl(`/posts/${id}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      this.validateResponse(response);

      if (!response.ok) {
        throw new Error(`Failed to fetch post`);
      }

      const post = await response.json();
      console.log(post);
      return post;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async create(post) {
    try {
      const token = Storage.getItem("token");
      const response = await fetch(this.getFullUrl("/posts"), {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      this.validateResponse(response);

      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async update(id, post) {
    try {
      const token = Storage.getItem("token");
      const response = await fetch(this.getFullUrl(`/posts/${id}`), {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      this.validateResponse(response);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async delete(id) {
    try {
      const token = Storage.getItem("token");
      const response = await fetch(this.getFullUrl(`/posts/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.validateResponse(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  getFullUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }
}
