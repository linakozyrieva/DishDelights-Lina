import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/"><b>Home</b></NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
