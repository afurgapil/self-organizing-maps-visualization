import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ params }) {
  const publicRoutes = params;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between  w-full text-center bg-blue-500 py-4 text-white  px-4">
      <div className="flex justify-between items-center w-auto px-4 sm:px-0 border-b border-white mb-2 md:border-none">
        <h1 className="text-lg font-bold">Api SOM</h1>
        <button className="sm:hidden text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <nav
        className={`flex flex-col sm:flex-row items-center w-auto sm:w-auto transition-all duration-300 ease-in-out gap-y-2 md:gap-y-0 md:gap-x-2 ${
          isMenuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        {publicRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className="py-2 px-2 border border-white rounded-md w-full md:w-auto "
            activeclassname="active"
            onClick={closeMenu}
          >
            {route.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
