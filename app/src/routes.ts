import {createRouter, createWebHashHistory} from "vue-router";

import FlightListings from "./components/FlightListings/FlightListing.vue";
import AddNewFlight from "./components/AddNewFlight/AddNewFlight.vue";

const routes = [
    {
        path: "/",
        component: FlightListings,
        
    },
    {
        path: "/add-new-flight",
        component: AddNewFlight
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;