// https://simple-blog-api-red.vercel.app/

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPosts(path, id = "") {
    try {
      const url = `${this.baseUrl}${path}${id}`;
      console.log(url); 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server error`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async postPosts(path, post) {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Error sending data");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async updatePost(path, id, updatedPost) {
    try {
      const response = await fetch(`${this.baseUrl}${path}${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (!response.ok) {
        throw new Error("Error updating post");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  
  async deletePost(id) {
    try {
      const response = await fetch(`${this.baseUrl}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting post");
      }
    } catch (error) {
      throw error;
    }
  }
}