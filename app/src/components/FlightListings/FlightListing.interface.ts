export interface IFlightListingResponse {
    flightNumber: string;
    origin: string;
    destination: string;
}

export interface IFlightListingViewData {
    flightNumber : string;
    origin: {
        code: string;
        name: string;
        country: string;
    };
    destination: {
        code: string;
        name: string;
        country: string;
    };
}