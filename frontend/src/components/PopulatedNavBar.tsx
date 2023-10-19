import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";
import axios from 'axios';

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>

     <NavItem route="/login/sign_up" end>
        Sign Up
      </NavItem>  
      <NavItem route="/moderator" end>
        Moderator
      </NavItem>
      <NavItem route="/analyst" end>
        Analyst 
      </NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Add new Article</NavItem>
          <NavItem route="/articles/new">Delete article</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
