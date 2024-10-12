import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import RecipeDetail from './components/RecipeDetail';
import RecipeList from './components/RecipeList'; // Импортируем RecipeList
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <div>
          {data.map(item => (
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}

        </div>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
