const { test, trait, afterEach, beforeEach } = use("Test/Suite")(
  "Session registration"
);
const User = use("App/Models/User");

trait("Test/ApiClient");
/**
 * executa depois de cada teste
 */
afterEach(async () => {
  /**
   * deleta as informacoe dos usuarios
   */
  await User.query().delete();
});
/**
 * cria um usuario antes do teste
 */
beforeEach(async () => {
  await User.create({
    username: "admin",
    email: "admin@gmail.com",
    password: "123",
  });
});

test("should be authenticated", async ({ client }) => {
  const user = await User.findBy("email", "admin@gmail.com");

  const response = await client
    .post("/session")
    .send({
      email: "admin@gmail.com",
      password: "123",
    })
    .end();

  response.assertStatus(200);
});
