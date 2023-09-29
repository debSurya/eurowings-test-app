import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ExpansionPanelVue from "../ExpansionPanel/ExpansionPanel.vue";

describe("Expansion Panel Component", () => {

    it("renders the component", () => {
        const wrapper = shallowMount(ExpansionPanelVue);
        expect(wrapper.find(".v-expansion-panel")).toBeDefined();
    });
});
