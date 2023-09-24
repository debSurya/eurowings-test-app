import { ref } from "vue";

export const useFetchAirports = () => {
    const airports = ref([]),
        error = ref<Error | null>(null);

    fetch("http://localhost:1011/get-airports")
    .then((res) => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error();
        }
    })
    .then(data => airports.value = data)
    .catch((err: Error) => {
        error.value = err;
    });

    return { data: airports, error };
}

export const useFetchFlightListing = () => {
    const flightListings = ref([]),
    error = ref<Error | null>(null);

    fetch("http://localhost:1011/get-flights")
    .then((res) => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error();
        }
    })
    .then(data => flightListings.value = data)
    .catch((err: Error) => {
        error.value = err;
    });

    return { data: flightListings, error };
}