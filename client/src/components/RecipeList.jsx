import React from 'react';

const RecipeList = ({ recipes }) => {
  // Ensure recipes is an array
  const recipeArray = recipes || [];

  return (
    <div>
      {recipeArray.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          {/* Add more recipe details as needed */}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
