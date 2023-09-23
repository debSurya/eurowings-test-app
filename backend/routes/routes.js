import fs from "fs";

export const appRouter = (app, fs) => {
    const dataPath = "./data/flightData.json";

    app.post('/add-flight', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) throw err;
            res.send(JSON.parse(data));
        })
    })
}