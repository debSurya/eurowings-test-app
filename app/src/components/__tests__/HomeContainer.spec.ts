import { describe, it, expect, vi } from "vitest";

import { flushPromises, shallowMount } from "@vue/test-utils";
import HomeContainerVue from "@/containers/HomeContainer/HomeContainer.vue";
import * as services from "@/services";

vi.mock("../../services/index.ts", () => ({
  useFetchAirports: () => ({ data: [], loading: false }),
  useFetchFlightListing: () => [],
}));

vi.mock("../../utils/common.ts", () => ({
  checkMobileDevices: () => true,
}));

describe("HomeContainer", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(HomeContainerVue);
    expect(wrapper.find(".v-layout")).toBeDefined();
  });

  it("renders expansion panel for mobile view", () => {
    const wrapper = shallowMount(HomeContainerVue);
    expect(wrapper.find(".v-expansion-panel")).toBeDefined();
  });

  it("detect fetch airport api call", async () => {
    await flushPromises();
    const fetchAirportsSpy = vi.spyOn(services, "useFetchAirports");
    shallowMount(HomeContainerVue);
    expect(fetchAirportsSpy).toHaveBeenCalled();
  });

  it("detect fetch flights api call", async () => {
    await flushPromises();
    const fetchFlightsSpy = vi.spyOn(services, "useFetchFlightListing");
    shallowMount(HomeContainerVue);
    expect(fetchFlightsSpy).toHaveBeenCalled();
  });
});
