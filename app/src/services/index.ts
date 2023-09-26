import type { IFlightListingResponse } from "@/components/FlightListings/FlightListing.interface";
import { ref } from "vue";

export const useFetchAirports = () => {
  const airports = ref(null),
    error = ref<Error | null>(null);

  fetch("http://localhost:1011/get-airports")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => (airports.value = data))
    .catch((err: Error) => {
      error.value = err;
    });

  return { data: airports, error };
};

export const useFetchFlightListing = async () => {
  try {
    const res = await fetch("http://localhost:1011/get-flights");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const postNewFlight = async (newFlightData: IFlightListingResponse) => {
  try {
    const res = await fetch("http://localhost:1011/add-new-flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightNumber: newFlightData.flightNumber,
        origin: newFlightData.origin,
        destination: newFlightData.destination,
      }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
