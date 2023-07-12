// We write the tests for the Modash library in
// this file in the Unit Testing chapter

import Modash from "./Modash.js";

describe("Modash", () => {
  describe("truncate()", () => {
    const string = "there was one catch, and that was CATCH-22";

    // assertions
    it("truncates a string", () => {
      expect(Modash.truncate(string, 19)).toEqual("there was one catch...");
    });
    it("no-ops if <= length", () => {
      expect(Modash.truncate(string, string.length)).toEqual(string);
    });
  });
  describe("capitalize()", () => {
    it("capitalizes first letter, lowercase rest", () => {
      const string = "there was one catch, and that was CATCH-22";
      expect(Modash.capitalize(string)).toEqual(
        "There was one catch, and that was catch-22"
      );
    });
  });
  describe("camelCase()", () => {
    it("camelizes the string with spaces", () => {
      const string = "customer responded at";
      expect(Modash.camelCase(string)).toEqual("customerRespondedAt");
    });
    it("camelizes the string with underscores", () => {
      const string = "customer_responded_at";
      expect(Modash.camelCase(string)).toEqual("customerRespondedAt");
    });
  });
});
