const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ id: 1234, email: "test", isAdmin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      userId: 1234,
      iat: expect.any(Number),
      email: "test",
      isAdmin: false,
    });
  });

  test("works: admin", function () {
    const token = createToken({ id: 1234, email: "test", isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      userId: 1234,
      iat: expect.any(Number),
      email: "test",
      isAdmin: true,
    });
  });
});
