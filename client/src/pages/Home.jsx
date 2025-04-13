import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bgimg">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Simplify Your Links
      </h1>
      <p className="text-lg md:text-md font-semibold text-center text-white mb-8 max-w-xl">
        URL Shortener that’s fast, simple, and free. Paste your long link and get a short one instantly.
      </p>
      <button
        onClick={handleTryNow}
        className="bg-black hover:bg-black/50 text-white font-semibold py-3 px-6 border border-white shadow-lg transition duration-300"
      >
        Try it now 🌐
      </button>
    </div>
  );
};

export default Home;
