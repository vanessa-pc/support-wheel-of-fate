const Pool = require("pg").Pool;
import Express from "express";

const pool = new Pool({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  database: process.env.PSQL_DB,
});

//specify functions for each endpoint

// DEVELOPERS
//get all developers at the GET endpoint at /developers
const getAllDevelopers = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  if (developer_id) {
    getDeveloperById(request, response);
  } else {
    pool.query(
      "SELECT * FROM developers ORDER BY developer_id ASC",
      (error: Error, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
};

//get developer by id at the GET endpoint at /developers/:id
const getDeveloperById = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  pool.query(
    "SELECT * FROM developers WHERE developer_id = $1",
    [developer_id],
    (error: Error, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//add developer at the POST endpoint at /developers
const addDeveloper = (request: Express.Request, response: Express.Response) => {
  const { first_name, last_name } = request.body;

  pool.query(
    "INSERT INTO developers ( first_name, last_name) VALUES ($1, $2) RETURNING *",
    [first_name, last_name],
    (error: Error, results: { rows: { developer_id: any }[] }) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(
          `Developer added with developer_id: ${results.rows[0].developer_id}`
        );
    }
  );
};

//update developer information at the PUT endpoint at /developers/:id
const updateDeveloper = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id, first_name, last_name } = request.body;

  pool.query(
    "UPDATE developers SET first_name = $1, last_name = $2 WHERE developer_id = $3",
    [first_name, last_name, developer_id],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Developer modified with developer_id: ${developer_id}`);
    }
  );
};

//delete a developer at the DELETE endpoint at /developers/:id
const deleteDeveloperById = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  pool.query(
    "DELETE FROM developers WHERE developer_id = $1",
    [developer_id],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Developer deleted with developer_id: ${developer_id}`);
    }
  );
};

//delete all developers at the DELETE endpoint at /developers
const deleteAllDevelopers = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  if (developer_id) {
    deleteDeveloperById(request, response);
  } else {
    pool.query(
      "DELETE FROM developers",
      (error: Error, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
};

// ROSTERS
// function to get all shifts using GET at endpoint /rosters

//get all developers at the GET endpoint at /developers
const getAllRosters = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  console.log(developer_id);
  if (developer_id) {
    getRosterByDeveloperId(request, response);
  } else {
    pool.query(
      "SELECT * FROM rosters ORDER BY developer_id ASC",
      (error: Error, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
};

//get roster for developer by developer_id at the GET endpoint at /rosters
const getRosterByDeveloperId = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  pool.query(
    "SELECT * FROM rosters WHERE developer_id = $1",
    [developer_id],
    (error: Error, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//add roster at the POST endpoint at /rosters
const addRoster = (request: Express.Request, response: Express.Response) => {
  const { shifts, developer_id } = request.body;

  pool.query(
    "INSERT INTO rosters (shifts, developer_id) VALUES ($1, $2) RETURNING *",
    [shifts, developer_id],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response.status(201);
    }
  );
};

//update roster for developer at the PUT endpoint at /rosters
const updateRoster = (request: Express.Request, response: Express.Response) => {
  const { shifts, developer_id } = request.body;

  pool.query(
    "UPDATE rosters SET shifts = $1 WHERE developer_id = $2",
    [shifts, developer_id],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Developer roster modified with developer_id: ${developer_id}`);
    }
  );
};

//delete a developer roster at the DELETE endpoint at /rosters
const deleteDeveloperRosterById = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  pool.query(
    "DELETE FROM rosters WHERE developer_id = $1",
    [developer_id],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Developer roster deleted with developer_id: ${developer_id}`);
    }
  );
};

//delete all developers at the DELETE endpoint at /rosters
const deleteAllRosters = (
  request: Express.Request,
  response: Express.Response
) => {
  const { developer_id } = request.body;

  if (developer_id) {
    deleteDeveloperRosterById(request, response);
  } else {
    pool.query(
      "DELETE FROM rosters",
      (error: Error, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
};

// ROSTER CRITERIA
// function to get all roster criteria selected using GET at endpoint /rosters-criteria

const getRosterCriteria = (
  request: Express.Request,
  response: Express.Response
) => {
  pool.query(
    "SELECT * FROM roster_criteria",
    (error: Error, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//add roster criteria at the POST endpoint at /rosters-criteria
const addRosterCriteria = (
  request: Express.Request,
  response: Express.Response
) => {
  const {
    one_shift_per_day,
    two_shifts_in_two_weeks,
    no_two_shifts_on_consecutive_days,
    no_two_shifts_on_same_day,
  } = request.body;

  pool.query(
    "INSERT INTO roster_criteria (one_shift_per_day, two_shifts_in_two_weeks, no_two_shifts_on_consecutive_days, no_two_shifts_on_same_day) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      one_shift_per_day,
      two_shifts_in_two_weeks,
      no_two_shifts_on_consecutive_days,
      no_two_shifts_on_same_day,
    ],
    (error: Error, _results: any) => {
      if (error) {
        throw error;
      }
      response.status(201);
    }
  );
};

//delete roster criteria at the DELETE endpoint at /rosters-criteria
const deleteRosterCriteria = (
  request: Express.Request,
  response: Express.Response
) => {
  pool.query(
    "DELETE FROM roster_criteria",
    (error: Error, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAllDevelopers,
  getDeveloperById,
  addDeveloper,
  updateDeveloper,
  deleteAllDevelopers,
  deleteDeveloperById,
  getAllRosters,
  getRosterByDeveloperId,
  addRoster,
  updateRoster,
  deleteDeveloperRosterById,
  deleteAllRosters,
  getRosterCriteria,
  addRosterCriteria,
  deleteRosterCriteria,
};
