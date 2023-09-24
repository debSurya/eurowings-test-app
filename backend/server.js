import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { appRouter } from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

appRouter(app);

app.listen(1011, () => {
    console.log("Running");
});