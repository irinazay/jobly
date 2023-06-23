CREATE TABLE companies (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT UNIQUE NOT NULL,
  num_employees INTEGER CHECK (num_employees >= 0),
  description TEXT NOT NULL,
  logo_url TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary INTEGER CHECK (salary >= 0),
  equity NUMERIC CHECK (equity <= 1.0),
  company_handle VARCHAR(25) NOT NULL
    REFERENCES companies ON DELETE CASCADE
);

CREATE TABLE applications (
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  job_id INTEGER
    REFERENCES jobs ON DELETE CASCADE,
  PRIMARY KEY (user_id, job_id)
);
