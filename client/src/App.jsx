import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostForm from './components/PostForm';

import About from './pages/About';
import RecipeDetail from './components/RecipeDetail';
import RecipeList from './components/RecipeList'; // Импортируем RecipeList
import './App.css';
import Auth from './pages/Auth';
import Profile from './pages/profile';

function App() {

  const [user, setUser] = useState('');
  useEffect(() => {
    (
      async () => {
          const response = await fetch('http://127.0.0.1:8000/api/user/', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const content = await response.json();
          console.log(content)
          setUser(content);
          localStorage.setItem('userId', content.id)
      }
    )();
    
  }, []);

  return (
      <BrowserRouter>
      <Header user={user}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<About />} />
          <Route path="/posts" element={<RecipeList />} />
          <Route path="/create-post" element={<PostForm user={user}/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/profile' element={<Profile/>}/>;
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
