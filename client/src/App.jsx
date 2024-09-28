import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Home data={data} />} />
        <Route path="/about" component={About} />
        <Route path="/recipe/:id" component={RecipeDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
