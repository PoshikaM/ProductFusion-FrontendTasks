import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center mb-4">
      {/* Logo / Title */}
      <div className="text-xl font-bold text-gray-800">
        MyApp
      </div>

      {/* Navigation Buttons */}
      <div className="space-x-4">
        <Link to="/Dashboard">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-300">
            Dashboard
          </button>
        </Link>
        <Link to="/">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition duration-300">
            Product
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;