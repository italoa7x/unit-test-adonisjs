const { test, trait, afterEach } = use("Test/Suite")("Post registration");
const User = use("App/Models/User");
const Post = use("App/Models/Post");
const Mail = use("Mail");

trait("Auth/Client");
trait("Test/ApiClient");

/**
 * remove os usuarios
 */
afterEach(async () => {
  await Post.query().delete();
  await User.query().delete();
});

test("should list none post", async ({ client }) => {
  const response = await client.get("/posts").end();

  response.assertStatus(200);
  response.assertJSON([]);
});

test("should list all posts", async ({ client }) => {
  const user = await User.create({
    username: "italo",
    email: "italo@gmail.com",
    password: "123",
  });

  await Post.create({
    title: "post test",
    content: "content post",
    user_id: user.id,
  });
  const response = await client.get("/posts").end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      title: "post test",
      content: "content post",
    },
  ]);
});

test("should create a new post", async ({ client }) => {
  const user = await User.create({
    username: "italo",
    email: "italo@gmail.com",
    password: "123",
  });
  const response = await client
    .post("/posts")
    .loginVia(user)
    .send({
      title: "post test",
      content: "content post",
      user_id: user.id,
    })
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    title: "post test",
    content: "content post",
  });
});

test("don't should create a new post", async ({ client }) => {
  const response = await client.post("/posts").end();

  response.assertStatus(401);
});
