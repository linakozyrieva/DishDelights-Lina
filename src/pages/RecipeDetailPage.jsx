import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  

useEffect(() => {
  const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Look for the recipe in both "recipes" and "favorites"
  const selectedRecipe = [...storedRecipes, ...storedFavorites].find(recipe => recipe.id === id);

  if (selectedRecipe) {
    setRecipe(selectedRecipe);
  } else {
    console.warn("Recipe not found with ID:", id);
    navigate("/recipes"); // Redirect back if recipe not found
  }
}, [id, navigate]);


  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <section className="page recipe-detail-page">
      <div className="recipe-container">
        <h1>{recipe.name}</h1>
        <p className="recipe-description">{recipe.description || "No description available."}</p>
        <img src={recipe.image || "https://placehold.co/800x400?text=No+Image"} alt={recipe.name} className="recipe-image" />
        <h2><strong>Category:</strong> {recipe.category}</h2>
        
        <div className="recipe-meta">
          <p><strong>Preparation Time:</strong> {recipe.prepTime || "N/A"} minutes</p>
          <p><strong>Cooking Time:</strong> {recipe.cookTime || "N/A"} minutes</p>
          <p><strong>Total Time:</strong> {recipe.totalTime || "N/A"} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings || "N/A"}</p>
          

        </div>

        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) : <p>No ingredients listed.</p>}
          </ul>
        </div>

        <div className="recipe-section">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions ? recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            )) : <p>No instructions available.</p>}
          </ol>
        </div>

        <div className="recipe-section">
          <h3>Nutritional Information</h3>
          {recipe.nutrition ? (
            <ul>
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          ) : <p>No nutritional info available.</p>}
        </div>

        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </section>
  );
}
