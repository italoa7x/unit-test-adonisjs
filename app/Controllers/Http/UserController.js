"use strict";
const User = use("App/Models/User");
const Mail = use("Mail");
class UserController {
  async index({ request, response }) {
    const users = await User.all();
    return users;
  }
  async store({ request, response }) {
    try {
      const { username, email, password } = request.all();

      const user = await User.create({
        username,
        email,
        password,
      });

      const mail = await Mail.send(
        "emails.welcome",
        user.toJSON(),
        (message) => {
          message
            .from(user.email)
            .to("contato.italo1020@gmail.com")
            .subject("Seja bem vindo (a)");
        }
      );

      if (user) {
        return response.status(201).send(user);
      }
    } catch (error) {
      return response.status(error.status).send({
        message: "Erro ao salvar usuário",
        error: {
          error: error,
          status: error.status,
          message: error.messages,
        },
      });
    }
  }
}

module.exports = UserController;
