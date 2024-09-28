import React from 'react';
import RecipeList from '../components/RecipeList';

function Home({ data }) {
  return (
    <div>
      <h1>Welcome to the Recipe Blog</h1>
      <RecipeList recipes={data} />
    </div>
  );
}

export default Home;
