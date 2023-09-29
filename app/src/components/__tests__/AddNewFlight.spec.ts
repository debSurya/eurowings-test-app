import { VueWrapper, shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AddNewFlightVue from "../AddNewFlight/AddNewFlight.vue";
import type { ComponentPublicInstance } from "vue";

type TestWrapper<T> = VueWrapper<ComponentPublicInstance & T>
let wrapper: TestWrapper<any>;

describe("Add new flight component", () => {
  it("renders add new flight form", () => {
    wrapper = shallowMount(AddNewFlightVue, {
      props: {
        allAirports: [
          {
            code: "XX",
            name: "YyYy",
          },
        ],
        formSubmissionStatus: false,
      },
    });
    expect(wrapper.find(".add-flight-container")).toBeDefined();
    expect(wrapper.find(".v-form")).toBeDefined();
  });

  it("validate submit event emit with params", async () => {
    wrapper = shallowMount(AddNewFlightVue, {
      props: {
        allAirports: [
          {
            code: "XX",
            name: "YyYy",
          },
        ],
        formSubmissionStatus: false,
      },
    });
    wrapper.vm.form.flightNumber.value = 7477;
    wrapper.vm.form.origin.value = "AEH";
    wrapper.vm.form.destination.value = "ABZ";
    wrapper.vm.onSubmitData();
    await wrapper.vm.$nextTick();
    expect((wrapper.emitted().emitFormData[0] as any)[0].flightNumber).toBe(7477);
    expect((wrapper.emitted().emitFormData[0] as any)[0].origin).toBe("AEH");
    expect((wrapper.emitted().emitFormData[0] as any)[0].destination).toBe("ABZ");
  });
});
