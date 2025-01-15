import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./app";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
