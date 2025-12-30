import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
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
            <Link
              to="/login"
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              Login
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
