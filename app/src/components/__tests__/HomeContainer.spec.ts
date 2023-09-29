import { describe, it, expect, vi } from "vitest";

import { shallowMount } from "@vue/test-utils";
import HomeContainerVue from "@/containers/HomeContainer/HomeContainer.vue";

vi.mock("../../services/index.ts", () => ({
  useFetchAirports: () => ({ data: [], loading: false }),
  useFetchFlightListing: () => [],
}));

describe("HomeContainer", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(HomeContainerVue);
    console.log(wrapper.vm);
    expect(wrapper.find(".v-layout")).toBeDefined();
  });
});
