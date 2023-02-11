import { expandSequenceSet } from "./SequenceSet";

describe("SequenceSet", () => {
  test("Positive only", () => {
    expect(expandSequenceSet({ from: 1, to: 5 }, 10)).toBe("1:5");
    expect(expandSequenceSet({ from: 1, to: 3 }, 10)).toBe("1:3");
  });

  test("Negative", () => {
    expect(expandSequenceSet({ from: -5, to: -1 }, 10)).toBe("5:9");
    expect(expandSequenceSet({ from: -5, to: -3 }, 10)).toBe("5:7");

    expect(expandSequenceSet({ from: 1, to: -1 }, 10)).toBe("1:9");
    expect(expandSequenceSet({ from: 1, to: -3 }, 10)).toBe("1:7");

    expect(expandSequenceSet({ from: -5, to: 5 }, 10)).toBe("5");
    expect(expandSequenceSet({ from: -5, to: 3 }, 10)).toBe("3:5");
  });

  test("The same value", () => {
    expect(expandSequenceSet({ from: "*", to: "*" }, 10)).toBe("10");
    expect(expandSequenceSet({ from: 1, to: 1 }, 10)).toBe("1");
    expect(expandSequenceSet({ from: -1, to: -1 }, 10)).toBe("9");
  });

  test("Asterix Positive", () => {
    expect(expandSequenceSet({ from: 1, to: "*" }, 10)).toBe("1:10");
    expect(expandSequenceSet({ from: 5, to: "*" }, 10)).toBe("5:10");

    expect(expandSequenceSet({ from: "*", to: 1 }, 10)).toBe("1:10");
    expect(expandSequenceSet({ from: "*", to: 3 }, 10)).toBe("3:10");
  });

  test("Asterix Negative", () => {
    expect(expandSequenceSet({ from: -1, to: "*" }, 10)).toBe("9:10");
    expect(expandSequenceSet({ from: -5, to: "*" }, 10)).toBe("5:10");

    expect(expandSequenceSet({ from: "*", to: -5 }, 10)).toBe("5:10");
    expect(expandSequenceSet({ from: "*", to: -1 }, 10)).toBe("9:10");
  });
});
