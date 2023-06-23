"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1@email.com", "password1");
    expect(user).toEqual({
      id: expect.any(Number),
      email: "u1@email.com",
      isAdmin: false,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    email: "test@test.com",
    isAdmin: false,
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual({
      ...newUser,
      id: expect.any(Number),
    });
    const found = await db.query(
      "SELECT * FROM users WHERE email = 'test@test.com'"
    );
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("works: adds admin", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
      isAdmin: true,
    });
    expect(user).toEqual({ ...newUser, isAdmin: true, id: expect.any(Number) });
    const found = await db.query(
      "SELECT * FROM users WHERE email = 'test@test.com'"
    );
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(true);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        email: "u1@email.com",
        isAdmin: false,
      },
      {
        email: "u2@email.com",
        isAdmin: false,
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const newUser = {
      email: "test@test.com",
      isAdmin: false,
    };

    let user = await User.register({
      ...newUser,
      password: "password",
    });

    await db.query(
      `
          INSERT INTO applications(user_id, job_id)
          VALUES ($1, $2)`,
      [user.id, testJobIds[0]]
    );

    let findUser = await User.get(user.id);

    expect(findUser).toEqual({
      id: expect.any(Number),
      isAdmin: false,
      applications: [testJobIds[0]],
    });
  });
});

/************************************** applyToJob */

describe("applyToJob", function () {
  test("works", async function () {
    const newUser = {
      email: "test5@test.com",
      isAdmin: false,
    };

    let user = await User.register({
      ...newUser,
      password: "password",
    });

    await User.applyToJob(user.id, testJobIds[1]);

    const res = await db.query("SELECT * FROM applications WHERE job_id=$1", [
      testJobIds[1],
    ]);
    expect(res.rows).toEqual([
      {
        job_id: testJobIds[1],
        user_id: user.id,
      },
    ]);
  });

  test("not found if no such job", async function () {
    try {
      await User.applyToJob(1, 0, "applied");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("not found if no such user", async function () {
    try {
      await User.applyToJob(10, testJobIds[0], "applied");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
