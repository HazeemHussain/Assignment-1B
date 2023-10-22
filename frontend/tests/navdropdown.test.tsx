import React from "react";
import { render } from "@testing-library/react";
//Using imports library jest-dom 
import '@testing-library/jest-dom';
//importing the Navdropdown component that is being tested
import NavDropdown from "../src/components/nav/NavDropdown";

//testing if multiple child compoents is rendered correctly
describe('NavDropdown', () => {
  it('renders multiple child components correctly', () => {
    const { getByText } = render(
      <NavDropdown>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
        <div>Child Component 3</div>
      </NavDropdown>
    );
//assertions checking if the child components to exsist 
    expect(getByText('Child Component 1')).toBeInTheDocument();
    expect(getByText('Child Component 2')).toBeInTheDocument();
    expect(getByText('Child Component 3')).toBeInTheDocument();
  });
});
