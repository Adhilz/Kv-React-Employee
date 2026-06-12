import { describe, expect, it, vi } from "vitest";
import Input from "../../components/Input/Input";
import { render,screen } from "@testing-library/react";


describe("Input Component",()=>{
it("match snapshot",()=>{
    const {container} =render(<Input type="text" placeholder="test" label="Test Input" id="test-input" value="example" onChange={vi.fn()} className="" containerClassName="" isRequired={true} />)
    expect(container).toMatchSnapshot()
});
it("should render an input with the provided id and placeholder",()=>{
    render(
        <Input
        type="text"
        id="username"
        placeholder="Enter Username"
        value=""
        onChange={vi.fn()}
        />
    );
    const input= screen.getByPlaceholderText("Enter Username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id","username");
    expect(input).toHaveAttribute("type","text")

})
});