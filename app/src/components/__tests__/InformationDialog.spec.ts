import { VueWrapper, shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import InformationDialogVue from "../InformationDialog/InformationDialog.vue";
import type { ComponentPublicInstance } from "vue";

type TestWrapper<T> = VueWrapper<ComponentPublicInstance & T>
let wrapper: TestWrapper<any>;

describe("Information DIalog component", () => {
  it("renders dialog component", () => {
    wrapper = shallowMount(InformationDialogVue, {
        props: {
            showDialog: true,
            flightAdditionStatusMessage: "dummy message"
        }
    });
    expect(wrapper.find(".v-dialog")).toBeDefined();
  });

  it("checks the event emit", async () => {
     wrapper = shallowMount(InformationDialogVue, {
        props: {
            showDialog: true,
            flightAdditionStatusMessage: "dummy message"
        }
    });

    wrapper.vm.dismissModal();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().emitModalDismissEvent[0]).toEqual([]);
  })
});
