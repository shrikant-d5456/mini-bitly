import React, { useState } from 'react';
import axios from 'axios';
import QRGenerator from '../components/QRGenerator';
import { useSelector } from 'react-redux';

const UrlShortner = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const [formData, setFormData] = useState({
    originalUrl: '',
    shortUrl: '',
  });

  const [url, setUrl] = useState(''); // This holds the shortCode string
  const [qrUrl, setQrUrl] = useState('');
  const [btn, setBtn] = useState(true);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { originalUrl, shortUrl } = formData;

    if (originalUrl.startsWith("https://")) {
      try {
        const res = await axios.post(`http://localhost:8000/url/short-url`, {
          originalUrl,
          shortUrl,
          userId,
        });

        console.log(res.data);
        setUrl(res.data.newUrl.shortCode); // Save only shortCode
        setBtn(true); // Reset QR button visibility
        alert('Short URL created successfully!');
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || 'Something went wrong');
      }
    } else {
      alert("Please provide a URL starting with https://");
    }
  };

  const handleOnLink = async (shortCode) => {
    try {
      const res = await axios.post('http://localhost:8000/url/short-url/fetch', {
        shortUrl: shortCode,
      });

      window.open(res.data.originalUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleGenerateQR = async (shortCode) => {
    try {
      const res = await axios.post(`http://localhost:8000/url/short-url/fetch`, {
        shortUrl: shortCode,
      });
      setQrUrl(res.data.originalUrl);
      setBtn(false);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error generating QR code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-14">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Make Domain Name Easy</h2>

        <div className="mb-4">
          <label htmlFor="originalUrl" className="block mb-1 font-medium">
            Original URL
          </label>
          <input
            type="url"
            id="originalUrl"
            name="originalUrl"
            required
            value={formData.originalUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="shortUrl" className="block mb-1 font-medium">
            Short URL
          </label>
          <input
            type="text"
            id="shortUrl"
            name="shortUrl"
            required
            value={formData.shortUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 font-medium hover:bg-gray-800 transition duration-200"
        >
          Make short URL
        </button>

        {url && (
          <div className="mt-4 flex justify-center flex-col">
            <p>
              Short URL:{' '}
              <span
                onClick={() => handleOnLink(url)}
                className="text-blue-600 underline cursor-pointer"
                title="Click to open original URL"
              >
                {`https://localhost:8000/${url}`}
              </span>
            </p>

            {btn && (
              <button
                type="button"
                className="mt-4 text-sm bg-black text-white font-semibold px-3 py-1"
                onClick={() => handleGenerateQR(url)}
              >
                Generate QR Code
              </button>
            )}
          </div>
        )}

        {qrUrl && <QRGenerator shortUrl={qrUrl} />}
      </form>
    </div>
  );
};

export default UrlShortner;
