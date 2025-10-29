import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full sticky top-0">
      <div className="flex justify-between items-center py-4 px-6 w-full">
        <Link to="#" className="text-2xl font-bold cursor-pointer text-blue-950">
          HealthIQ.AI
        </Link>

        <div className="flex space-x-6">
          <div className="relative group">
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>

          <div className="relative group">
            <Link to="#" className="text-blue-950 font-medium cursor-pointer">
              About
            </Link>
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>

          <div className="relative group">
            <Link to="https://omgadgeportfolio.vercel.app/" className="text-blue-950 font-medium cursor-pointer">
              Connect Us
            </Link>
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>

          <Link to="/features" className="text-blue-950 font-medium cursor-pointer">
            Features
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link to="/login" className="text-white cursor-pointer">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#1b2738] text-white font-medium px-4 py-2 rounded hover:bg-yellow-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;