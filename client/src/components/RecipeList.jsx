import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes }) {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
