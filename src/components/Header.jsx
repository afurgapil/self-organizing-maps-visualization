import { NavLink } from "react-router-dom";
function Header(params) {
  const publicRoutes = params.params;
  return (
    <header className="flex flex-row justify-center items-center w-full text-center bg-blue-500 py-4 text-white gap-x-1 h-[5vh]">
      {publicRoutes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          style={{ margin: "0 10px" }}
          className="text-center underline"
          activeclassname="active"
        >
          {route.name}
        </NavLink>
      ))}
    </header>
  );
}

export default Header;
