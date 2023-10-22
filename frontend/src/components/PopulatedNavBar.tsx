import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";
import axios from 'axios';

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
        <NavItem route="/articles/">View articles</NavItem>
        <NavItem route="/articles/new">Add new Article</NavItem>

      <NavItem dropdown route="/articles">
        Login <IoMdArrowDropdown />
        <NavDropdown>
        <NavItem route="/moderator">Moderator</NavItem>
       <NavItem route="/analyst">Analyst</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
