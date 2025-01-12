import React from 'react';
import RecipeList from '../components/RecipeList';

function Home({ data }) {
  return (
    <div style={{width: "1400px"}}>
      <h1>Главная страница</h1>
      <RecipeList recipes={data} />
    </div>
  );
}

export default Home;
