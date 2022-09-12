// require modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

//declare app variables

if (!process.env.SERVER_PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.SERVER_PORT as string, 10);

const app = express();
const database = require("./database");

// configure app middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

//endpoint for when landing on 'main' page
app.get("/", (_request, response) => {
  response.json("Welcome!");
});

// DEVELOPERS ENDPOINTS
app.get("/developers", database.getAllDevelopers);
app.post("/developers", database.addDeveloper);
app.put("/developers/", database.updateDeveloper);
app.delete("/developers", database.deleteAllDevelopers);

// ROSTERS ENDPOINTS
app.get("/rosters", database.getAllRosters);
app.post("/rosters", database.addRoster);
app.put("/rosters", database.updateRoster);
app.delete("/rosters", database.deleteAllRosters);

// ROSTER CRITERIA ENDPOINTS
app.get("/rosters-criteria", database.getRosterCriteria);
app.post("/rosters-criteria", database.addRosterCriteria);
app.delete("/rosters-criteria", database.deleteRosterCriteria);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
