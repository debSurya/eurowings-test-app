import express from 'express';
import bodyParser from 'body-parser';
import fs from "fs";
import { appRouter } from "./routes/routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = appRouter(app, fs);

const server = app.listen(1011, () => {
    console.log("Running");
})