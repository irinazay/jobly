"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with email, password.
   *
   * Returns { email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(email, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT id,
      password,
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  /** Register user with data.
   *
   * Returns { email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ password, email, isAdmin }) {
    const duplicateCheck = await db.query(
      `SELECT email
           FROM users
           WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(
        `The email address entered is already being used. Please select another.`
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users
           (password,
            email,
            is_admin)
           VALUES ($1, $2, $3)
           RETURNING  id, email, is_admin AS "isAdmin"`,
      [hashedPassword, email, isAdmin]
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT email,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY email`
    );

    return result.rows;
  }

  /** Given a email, return data about user.
   *
   * Returns { email, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(id) {
    const userRes = await db.query(
      `SELECT 
                  id,
                  is_admin AS "isAdmin"
           FROM users
           WHERE id = $1`,
      [id]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No such user`);

    const user_id = id;
    const userApplicationsRes = await db.query(
      `SELECT a.job_id
           FROM applications AS a
           WHERE a.user_id = $1`,
      [user_id]
    );

    user.applications = userApplicationsRes.rows.map((a) => a.job_id);
    return user;
  }

  static async applyToJob(userId, jobId) {
    const preCheck = await db.query(
      `SELECT id
           FROM jobs
           WHERE id = $1`,
      [jobId]
    );
    const job = preCheck.rows[0];

    if (!job) throw new NotFoundError(`No job: ${jobId}`);

    const id = userId;
    const preCheck2 = await db.query(
      `SELECT id
           FROM users
           WHERE id = $1`,
      [id]
    );

    const user = preCheck2.rows[0];

    if (!user) throw new NotFoundError(`No such user`);

    await db.query(
      `INSERT INTO applications (job_id, user_id)
           VALUES ($1, $2)`,
      [jobId, userId]
    );
  }
}

module.exports = User;
