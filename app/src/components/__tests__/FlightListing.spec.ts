import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FlightListingVue from "../FlightListings/FlightListing.vue";

describe("Flight Listing component", () => {
  it("renders component", () => {
    const wrapper = shallowMount(FlightListingVue, {
      props: {
        allAirports: [
          {
            code: "KOL",
            name: "ABCD",
          },
          {
            code: "DUS",
            name: "WXYZ",
          },
        ],
        flightListing: [
          {
            flightNumber: "EW5255",
            destination: "KOL",
            origin: "DUS",
          },
        ],
      }
    });
    expect(wrapper.find(".table-container")).toBeDefined();
    expect(wrapper.find(".v-table")).toBeDefined();
  });
});
