import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">StudyHub</Link>
        </div>

        {/* Center Menu (Desktop) */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/assignments" className="hover:text-blue-600">
              Assignments
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative group flex items-center gap-3">
              {/* Profile Picture */}
              <div className="relative group cursor-pointer">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}

                {/* Tooltip with Name */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900 text-white text-sm font-medium rounded-lg py-1 px-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none shadow-lg top-10 z-50">
                  {user.displayName.split(" ")[0]}
                  {/* Arrow */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              <button
                onClick={logOut}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg p-4">
          <ul className="flex flex-col gap-4 text-center">
            <Link to="/">Home</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/about">About</Link>
            {user ? (
              <div className="flex justify-center gap-2 items-center">
                <FaUserCircle size={24} style={{ cursor: "pointer" }} />
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
