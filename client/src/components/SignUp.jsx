import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: 'intern@dacoid.com',
    password: 'Test123'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    await axios.post(`http://localhost:8000/auth/user/signup`, { email, password })
      .then((res) => {
        console.table(res.data);
        alert("signup successfully, Thank you!")
        navigate("/login"); 
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.msg);

        const ans = confirm("This user already registered, you want to navigate login 🤔");
        if(ans){
          navigate('/login');
        }

      })

  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6  shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 ">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2  outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2  outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4  font-medium hover:bg-black transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
