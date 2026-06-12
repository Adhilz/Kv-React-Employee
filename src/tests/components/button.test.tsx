import { describe, expect, it, vi } from "vitest";
import Input from "../../components/Input/Input";
import { render,screen } from "@testing-library/react";
import Button from "@/components/Button/Button";


describe("Input Component",()=>{
it("match snapshot",()=>{
    const {container} =render(<Button type="button" className="" onClick={vi.fn()} disabled={true} >Hi</Button>) 
    expect(container).toMatchSnapshot()
});
it("should render an input with the provided id and placeholder",()=>{
    render(
        <Button
        type="button"
        className="" 
        onClick={vi.fn()} 
        disabled={true}
        >Wow
            </Button>
    );
    
  const button = screen.getByRole("button", { name: "Wow" });

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("type", "button");
  expect(button).toBeDisabled();

})
});