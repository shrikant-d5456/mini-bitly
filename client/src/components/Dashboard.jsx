import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  if (!userId) {
    return <p className="text-center mt-10 text-white">Loading dashboard...</p>;
  }

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .post('http://localhost:8000/url/short-url/my-urls', { userId })
        .then((res) => {
          setUrls(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  

  const chartData = urls.map((url) => ({
    name: new Date(url.createdAt).toLocaleDateString(),
    clicks: url.clicks,
  }));

  const chartDataLinks = urls.map((url) => ({
    name: new Date(url.createdAt).toLocaleDateString() + ' ' + new Date(url.createdAt).toLocaleTimeString(),
    clicks: url.clicks,
    originalUrl: url.originalUrl
  }));


  return (
    <div className="md:w-10/12 mx-auto p-6 overflow-x-auto ">
      <div className='flex justify-between gap-2 items-center mt-20'>
        <div className='bg-black/80 text-white p-5 w-full rounded-2xl border border-blue-200'>
          <p className='font-bold text-xl'>Total urls:</p>
          <span className='text-sm font-medium'>{urls.length}</span>
        </div>
        <div className='bg-black/80 text-white p-5 w-full rounded-2xl border border-blue-200'>
          <p className='font-bold text-xl'>Total Clicks:</p>
          <span className='text-sm font-medium'>{urls.reduce((acc, url) => acc + url.clicks, 0)}</span>
        </div>
        <div className='bg-black/80 text-white p-5 w-full rounded-2xl border border-blue-200'>
          <p className='font-bold text-xl'>Some Stat:</p>
          <span className='text-sm font-medium'>500</span>
        </div>
      </div>


      <div className=' md:flex gap-2 justify-between items-center mt-4'>
        <div className=" w-full border border-blue-200 bg-black rounded-xl p-4">
          <h2 className="text-2xl font-bold mt-2 mb-4 text-white">Clicks Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className=" w-full border border-blue-200 bg-black rounded-xl p-4 my-4" >
          <h2 className="text-2xl font-bold mt-2 mb-4 text-white">links Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartDataLinks} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-300 rounded shadow-md text-black">
                        <p><strong>Date & Time:</strong> {label}</p>
                        <p><strong>Original URL:</strong> <a href={payload[0].payload.originalUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">{payload[0].payload.originalUrl}</a></p>
                        <p><strong>Clicks:</strong> {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


      <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Your Shortened URLs</h2>
      <table className="min-w-full border border-blue-200 text-white overflow-hidden">
        <thead>
          <tr className='bg-black'>
            <th className="py-3 px-4 text-left">Short Code</th>
            <th className="py-3 px-4 text-left">Original URL</th>
            <th className="py-3 px-4 text-left">Clicks</th>
            <th className="py-3 px-4 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id} className="border-t border-blue-200 bg-black hover:bg-black/50">
              <td className="py-2 px-4">{url.shortCode}</td>
              <td className="py-2 px-4 max-w-xs truncate">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  title={url.originalUrl}
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="py-2 px-4">{url.clicks}</td>
              <td className="py-2 px-4">{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
