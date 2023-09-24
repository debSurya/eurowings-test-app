import fs from "fs";

export const appRouter = (app) => {
    const flightListingData = "./data/flightListing.json";
    const airportDataPath = "./data/airportListing.json";

    app.get('/get-airports', (_, res) => {
        const data = fs.readFileSync(airportDataPath, 'utf-8');
        res.send(JSON.parse(data));
    });

    app.get('/get-flights', (_, res) => {
        const data = fs.readFileSync(flightListingData, 'utf8');
        res.send(JSON.parse(data));
    })
}