export class AuthApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async register(user) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //Response {type: 'cors', url: 'https://simple-blog-api-red.vercel.app/api/auth/register', redirected: false, status: 201, ok: true, …}
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message);
      }
      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
