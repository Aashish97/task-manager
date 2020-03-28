const request = require("supertest");
const app = require("./../src/app");
const User = require("./../src/models/user");

const {userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Aashish",
      email: "aashish@gmail.com",
      password: "Aashish123!"
    })
    .expect(201);

  // Asserts that the datababse was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Aashish",
      email: "aashish@gmail.com"
    },
    token: user.tokens[0].token
  });

  // Assertion that password is not stored in plaintext
  expect(user.password).not.toBe("Aashish123!");
});

test("Should login a existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  //Assertion that the new token is saved
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Shouldn"t login a unauthorized user', async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "dorna1234"
    })
    .expect(400);
});

test("Should get a profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get a profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should delete a profile for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assertion that validated user is removed
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not get a profile for unauthenticated", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "./tests/fixtures/profile-pic.jpg")
    .expect(200);

    // Assertion that  image buffer has changed
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Dorna"
    })
    .expect(200);

    //Assertion that the value has changed
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Dorna");
});

test("Should not update invalid user fields", async () => {
    await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      other: "Lalitpur"
    })
    .expect(400);
});
