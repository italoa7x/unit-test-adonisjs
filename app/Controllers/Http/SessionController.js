"use strict";

class SessionController {
  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      return token;
    } catch (error) {
      return response.status(error.status).send({
        message: "Erro ao realizar login",
      });
    }
  }
}

module.exports = SessionController;
