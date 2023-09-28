import fs from "fs";

export const appRouter = (app) => {
    const flightListingDataPath = "./data/flightListing.json";
    const airportDataPath = "./data/airportListing.json";

    app.get("/get-airports", (_, res) => {
        const data = fs.readFileSync(airportDataPath, "utf-8");
        setTimeout(() => {
            res.send(JSON.parse(data));
        }, 1500);
    });

    app.get("/get-flights", (_, res) => {
        const data = fs.readFileSync(flightListingDataPath, "utf-8");
        setTimeout(() => {
            res.send(JSON.parse(data));
        }, 2000);
    });

    app.post("/add-new-flight", (req, res) => {
        console.log(req.body);
        const flightListingData = JSON.parse(
            fs.readFileSync(flightListingDataPath, "utf-8")
        );
        const isDuplicateFlightNumber = !!flightListingData.find(
            (flight) => flight.flightNumber === `EW${req.body.flightNumber}`
        );
        if (isDuplicateFlightNumber) {
            console.log("dup called")
            setTimeout(() => {
                res.status(400).send(["Duplicate flight number!"]);
            }, 1000);
        } else {
            console.log("not called")
            flightListingData.push({
                flightNumber: `EW${req.body.flightNumber}`,
                origin: req.body.origin,
                destination: req.body.destination,
            });
            fs.writeFileSync(
                flightListingDataPath,
                JSON.stringify(flightListingData),
                "utf-8"
            );
            setTimeout(() => {
                res.send(["OK"]);
            }, 2000);
        }
    });
};
