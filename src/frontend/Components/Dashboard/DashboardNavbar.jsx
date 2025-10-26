// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from 'lucide-react';
 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold t text-blue-950">Health Dashboard</div>
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
            <Link to="/dashboard/Exercise" className="text-gray-700 hover:text-blue-500">Exercise Plan</Link>
            <Link to="/dashboard/Diet" className="text-gray-700 hover:text-blue-500">Diet Plan</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-500">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-500">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
