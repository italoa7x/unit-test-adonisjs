const { test, trait, afterEach } = use("Test/Suite")("User registration");
const Mail = use("Mail");
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

test("should be create a new user ", async ({ client, assert }) => {
  Mail.fake();
  const response = await client
    .post("/users")
    .send({
      username: "italo",
      email: "italo@gmail.com",
      password: "123",
    })
    .end();

  const user = await User.findBy("email", "italo@gmail.com");

  assert.equal(user.toJSON().email, "italo@gmail.com");

  response.assertStatus(201);
  response.assertJSONSubset({
    email: "italo@gmail.com",
  });
  Mail.restore();
});

// test('don"t should create a new user', async ({ client, assert }) => {
//   Mail.fake();
//   const response = await client.post("/users").end();

//   response.assertStatus(500);

//   const user = await User.findBy(1);

//   assert.isNull(user);
//   Mail.restore();
// });
