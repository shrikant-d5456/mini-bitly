import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  if (!user) {
    return <div className="text-center mt-10 text-red-500">No user data available</div>;
  }

  return (
    <div className="max-w-md h-screen mx-auto mt-16 p-6 text-white flex justify-center items-center shadow-md">
     <div  className=' w-full bg-black p-8 border border-blue-200'>
     <h2 className="text-2xl font-semibold  mb-4">User Profile</h2>

<div className="mb-4">
  <label className="block  font-medium py-2">Email:</label>
   <input type="email" value={user.email} className="bg-gray-900 p-2  w-full" />
</div>

<div>
  <label className="block  font-medium py-2">Password:</label>
 <input type="password" value={user.password} className="bg-gray-900 p-2  w-full" />
</div>
     </div>
    </div>
  );
};

export default Profile;
