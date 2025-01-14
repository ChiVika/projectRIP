import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProfile from '../components/profile';
import AddNotes from '../components/Notes';
import './Profile.css';
// import './Notes.css';

function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/logout/", {}, {
        withCredentials: true
      });
      console.log("Logout successful:", response.data);
      navigate('/logout');
    } catch (error) {
      console.error('Error logging out:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <>
      {/* <button className="Profile__exit" onClick={handleLogout}>Выход</button> */}
      <MyProfile user={user} />
      <AddNotes />
    </>
  );
}

export default Profile;
