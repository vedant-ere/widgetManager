import React from "react";
// import logo from "../src/assets/images/logo.png";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full flex justify-center items-center py-6 ">
      <nav className="flex items-center justify-between w-full max-w-3xl">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            
          </p>
        </div>

       
        

        {/* Search */}
        <Search />
      </nav>
    </header>
  );
};

export default Navbar;
