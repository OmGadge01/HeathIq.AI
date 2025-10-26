import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full sticky top-0">
      <div className="flex justify-between items-center py-4 px-6 w-full">
        <h1 className="text-2xl font-bold cursor-pointer text-blue-950">HeathIQ.AI</h1>
        <div className="flex space-x-6">
          <div className="relative group">
            {/* <button className="text-gray-700">Browse</button> */}
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>
          <div className="relative group">
            <button className=" text-blue-950 font-medium cursor-pointer">About</button>
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>
          <div className="relative group">
            <button className=" text-blue-950 font-medium cdcursor-pointer">Connect Us</button>
            <div className="absolute left-0 hidden mt-2 w-40 text-blue-950 rounded-md shadow-lg group-hover:block">
              {/* Dropdown content can be added here */}
            </div>
          </div>
          <button className=" text-blue-950 font-medium cursor-pointer">Features</button>
          {/* <button className="text-gray-700">Blog</button> */}
        </div>
        <div className="flex space-x-4">
          <button className="text-white cursor-pointer">Login</button>
          <button className="bg-[#1b2738] text-white font-medium px-4 py-2 rounded hover:bg-yellow-600">
            Sign up
          </button>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;