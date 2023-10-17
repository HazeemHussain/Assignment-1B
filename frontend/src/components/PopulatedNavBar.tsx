import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";
import axios from 'axios';
import { useState } from "react";


const PopulatedNavBar = () => {
 
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      
      
      <NavItem route="/articles">Moderator</NavItem>
      <NavItem route="/articles">Analyst</NavItem>
      <NavItem route="/articles">Sign Up</NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles/">View articles</NavItem>
          <NavItem route="/articles/new">Add new Article</NavItem>
          <NavItem route="/articles/new">Delete article</NavItem>
        </NavDropdown>
      </NavItem>
      
    </NavBar>
    
  );
  
};

export default PopulatedNavBar;
