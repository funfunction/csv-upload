import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes_csv from "./routes/routes_csv";

/**
@file
initialize and run the express server

@security
allow any origin

*/

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




//////////////////////////////////////////////////////////////////////
// register all routes

app.use(routes_csv);




//////////////////////////////////////////////////////////////////////
// finally, run server

const port_express = 3333;
const PORT = process.env.PORT || port_express; //CON: process.env.PORT required by heroku
module.exports = app.listen(PORT, () => {
  console.log("Server running on port %d", PORT);
});
