import App from "./App";
import React from "react";
import { shallow } from "enzyme";

describe("App", () => {
  // hoisted to scope of all assertions
  let wrapper;
  // shallow render the App component
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('should have the `th` "Items', () => {
    // traverse the virtual DOM, picking out the first th element
    expect(
      // assert that the element encloses a text value of "Items"
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });
  it("should have a `button` element", () => {
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(
      true
    );
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });
  it("`button` should be disabled", () => {
    const button = wrapper.find("button").first();
    expect(button.props().disabled).toBe(true);
  });

  describe("the user populates the input", () => {
    const item = "Vancouver";
    beforeEach(() => {
      const input = wrapper.find("input").first();
      input.simulate("change", {
        // event object
        target: { value: item },
      });
    });
    it("should update the state property `item`", () => {
      expect(wrapper.state().item).toEqual(item);
    });
    it("should enable `button`", () => {
      const button = wrapper.find("button").first();
      expect(button.props().disabled).toBe(false);
    });

    describe("and then clears the input", () => {
      beforeEach(() => {
        const input = wrapper.find("input").first();
        input.simulate("change", {
          target: { value: "" },
        });
      });
      it("should disable `button`", () => {
        const button = wrapper.find("button").first();
        expect(button.props().disabled).toBe(true);
      });
    });

    describe("and then submits the form", () => {
      beforeEach(() => {
        const form = wrapper.find("form").first();
        form.simulate("submit", {
          preventDefault: () => {},
        });
      });
      it("should add item to the state", () => {
        expect(wrapper.state().items).toContain(item);
      });
      it("should render the item in the table", () => {
        expect(wrapper.containsMatchingElement(<td>{item}</td>)).toBe(true);
      });
      it("should clear the input field", () => {
        const input = wrapper.find("input").first();
        expect(input.props().value).toEqual("");
      });
      it("should disable `button`", () => {
        const button = wrapper.find("button").first();
        expect(button.props().disabled).toBe(true);
      });
    });
  });
});
