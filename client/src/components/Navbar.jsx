import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsList, BsX } from 'react-icons/bs'; // Bootstrap icons
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const isAuthRoute = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user?.email);

  useEffect(() => {
    if (isAuthRoute) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [isAuthRoute]);
  

  const logout = () => {
    alert('Logout successfully');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <div className="w-full fixed md:top-1 top-1 md:p-5 z-50  ">
      <div className="max-w-7xl mx-auto px-6 py-3 bg-black text-white flex items-center justify-between shadow-md md:rounded-full md:border border-blue-200">
        <Link to="/" className="text-2xl font-bold">
          URLShorty
        </Link>

        
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <BsX size={28} /> : <BsList size={28} />}
        </button>

        {/* Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center text-white">
          {isAuthRoute ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/url-page" className="hover:text-gray-300">
                Create Domain
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <button
                onClick={logout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black font-medium py-1 px-4 rounded-full hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col justify-start items-center bg-black  text-white px-4 pb-4 space-y-3">
          {isAuthRoute ? (
            <>
              <Link to="/dashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/url-page" onClick={toggleMenu}>
                Create Domain
              </Link>
              <Link to="/profile" onClick={toggleMenu}>
                Profile
              </Link>
              <button onClick={() => { logout(); toggleMenu(); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black font-medium py-1 px-4 rounded-full"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  {isAuthRoute && showText && 
  <span className=' animate-bounce fixed z-50 bottom-2 left-2 px-4 py-2 bg-black text-white rounded-full  border border-blue-200'>{`Hello ${user}, welcome to mini Bitly website `}  
  <button className=' bg-slate-900 px-4 ml-2 rounded-full border'
   onClick={()=>setShowText(false)}
  >close</button>
  </span>
  }
</>
  );
};

export default Navbar;
