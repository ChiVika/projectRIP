import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeDetail;
