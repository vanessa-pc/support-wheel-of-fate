-- PSQL SCRIPTS TO CREATE OUR DATABASE AND TABLES

CREATE DATABASE support-wheel-of-fate;

CREATE TABLE IF NOT EXISTS developers(
    developer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rosters(
    id SERIAL PRIMARY KEY,
    developer_id INT NOT NULL,
    shifts TIMESTAMPTZ [], 
    FOREIGN KEY (developer_id)
      REFERENCES developers (developer_id)
); 

CREATE TABLE IF NOT EXISTS roster_criteria(
    id SERIAL PRIMARY KEY,
    one_shift_per_day BOOLEAN,
    two_shifts_in_two_weeks BOOLEAN,
    no_two_shifts_on_consecutive_days BOOLEAN,
    no_two_shifts_on_same_day BOOLEAN
); 