import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProfile from '../components/profile';
import AddNotes from '../components/Notes';
import './Profile.css';

function Profile({ user }) {
  const navigate = useNavigate();

  const ExitProfile = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/logout/", {}, {
        withCredentials: true
      });
      console.log(response.data);
      navigate('/auth');
    } catch (error) {
      console.error('Ошибка выхода:', error);
      if (error.response) {
        console.error('Ответ сервера:', error.response.data);
      }
    }
  };

  return (
    <>
      <MyProfile user={user} />
      <AddNotes />
      <button className="Profile__exit" onClick={ExitProfile}>Выход из аккаунта</button>
    </>
  );
}

export default Profile;
