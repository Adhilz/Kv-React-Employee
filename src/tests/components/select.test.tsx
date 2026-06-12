import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select,SelectOption  } from "@components/Select/Select";

describe("Select Component", () => {
  it("renders uncontrolled select", () => {
    render(
      <Select
        id="department"
        label="Department"
        name="department"
        isRequired={false}
        containerClassName=""
        className=""
        defaultValue=""
        onChange={vi.fn()}
      >
        Hi
      </Select>
    );

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", "department");
    expect(select).toHaveAttribute("name", "department");
  });

  it("renders controlled select", () => {
    render(
      <Select
        id="department"
        label="Department"
        name="department"
        isRequired={false}
        containerClassName=""
        className=""
        value=""
        onChange={vi.fn()}
      >
        Hi
      </Select>
    );

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", "department");
    expect(select).toHaveAttribute("name", "department");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Select
        id="department"
        label="Department"
        name="department"
        isRequired={false}
        containerClassName=""
        className=""
        defaultValue=""
        onChange={vi.fn()}
      >
        Hi
      </Select>
    );

    expect(container).toMatchSnapshot();
  });
  it("renders select option", () => {
  render(
    <Select
      id="department"
      name="department"
      defaultValue="hr"
    >
      <SelectOption value="hr">HR</SelectOption>
    </Select>
  );

  const option = screen.getByRole("option", { name: "HR" });

  expect(option).toBeInTheDocument();
  expect(option).toHaveValue("hr");
});
});