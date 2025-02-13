import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Recipe from "../components/Recipe";

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setRecipes(storedFavorites);
  }, []);

  function addRecipe(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const category = formData.get("category");
    const prepTime = formData.get("prepTime");
    const cookTime = formData.get("cookTime");
    const totalTime = formData.get("totalTime");
    const servings = formData.get("servings");
    const ingredients = formData.get("ingredients").split("\n");
    const instructions = formData.get("instructions").split("\n");
    const nutrition = Object.fromEntries(
      formData.get("nutrition")
        .split("\n")
        .map((line) => line.split(": ").map((item) => item.trim()))
    );
    const image = formData.get("image") || "https://placehold.co/600x400";

    if (!name || !category || !prepTime || !cookTime || !totalTime || !servings) {
      alert("Please fill out all required fields.");
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      name,
      category,
      prepTime,
      cookTime,
      totalTime,
      servings,
      ingredients,
      instructions,
      nutrition,
      image,
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("favorites", JSON.stringify(updatedRecipes));
    event.target.reset();
    setShowForm(false);
  }

  function deleteRecipe(id) {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("favorites", JSON.stringify(updatedRecipes));
  }

  function startEditing(recipe) {
    setEditingRecipe(recipe);
    setShowForm(true);
  }

  function saveEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedRecipe = {
      ...editingRecipe,
      name: formData.get("name"),
      category: formData.get("category"),
      prepTime: formData.get("prepTime"),
      cookTime: formData.get("cookTime"),
      totalTime: formData.get("totalTime"),
      servings: formData.get("servings"),
      ingredients: formData.get("ingredients").split("\n"),
      instructions: formData.get("instructions").split("\n"),
      nutrition: Object.fromEntries(
        formData.get("nutrition")
          .split("\n")
          .map((line) => line.split(": ").map((item) => item.trim()))
      ),
      image: formData.get("image") || editingRecipe.image,
    };

    const updatedRecipes = recipes.map(recipe => (recipe.id === editingRecipe.id ? updatedRecipe : recipe));
    setRecipes(updatedRecipes);
    localStorage.setItem("favorites", JSON.stringify(updatedRecipes));
    setEditingRecipe(null);
    setShowForm(false);
  }

  // 🔎 FILTER & SORT RECIPES
  let filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract unique categories for filtering dropdown
  const uniqueCategories = [...new Set(recipes.map(recipe => recipe.category))];

  // Apply category filter
  if (filterCategory !== "") {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.category === filterCategory);
  }

  // Apply sorting
  filteredRecipes.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <section className="page">
      <h1>Your Favorite Recipes</h1>
      <p>Here you can add, store, and edit your personal favorite recipes.</p>

      <button className="toggle-form-btn" onClick={() => {
        setEditingRecipe(null);
        setShowForm(!showForm);
      }}>
        {showForm ? "Close Form" : "Add Recipe"}
      </button>

      {/* 🔍 FILTER & SORT FORM (EXACTLY LIKE RECIPE PAGE) */}

      {showForm && (
        <div className="container">
          <h2 className="form-title">{editingRecipe ? "Edit Recipe" : "Add New Recipe"}</h2>
          <form onSubmit={editingRecipe ? saveEdit : addRecipe} className="recipe-form">
            <label>Name</label>
            <input name="name" type="text" defaultValue={editingRecipe?.name || ""} required />
            <label>Category</label>
            <input name="category" type="text" defaultValue={editingRecipe?.category || ""} required />
            <label>Preparation Time (minutes)</label>
            <input name="prepTime" type="number" defaultValue={editingRecipe?.prepTime || ""} required />
            <label>Cooking Time (minutes)</label>
            <input name="cookTime" type="number" defaultValue={editingRecipe?.cookTime || ""} required />
            <label>Total Time (minutes)</label>
            <input name="totalTime" type="number" defaultValue={editingRecipe?.totalTime || ""} required />
            <label>Servings</label>
            <input name="servings" type="number" defaultValue={editingRecipe?.servings || ""} required />
            <label>Ingredients (one per line)</label>
            <textarea name="ingredients" defaultValue={editingRecipe?.ingredients?.join("\n") || ""} required />
            <label>Instructions (one per line)</label>
            <textarea name="instructions" defaultValue={editingRecipe?.instructions?.join("\n") || ""} required />
            <label>Nutritional Information</label>
            <textarea name="nutrition" defaultValue={editingRecipe?.nutrition ? 
              Object.entries(editingRecipe.nutrition).map(([key, value]) => `${key}: ${value}`).join("\n") 
              : ""} />
            <label>Image URL</label>
            <input name="image" type="url" defaultValue={editingRecipe?.image || ""} />
            <div className="btns">
              <button type="submit">{editingRecipe ? "Save Changes" : "Add Recipe"}</button>
              <button type="button" className="btn-cancel" onClick={() => {
                setEditingRecipe(null);
                setShowForm(false);
              }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <form className="grid-filter" role="search">
        <label>
          Search by Name:
          <input
            type="search"
            placeholder="Type to search..."
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Filter by Category:
          <select onChange={e => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by:
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
        </label>
      </form>

      
      {/* DISPLAY SORTED & FILTERED FAVORITE RECIPES */}
      {/* DISPLAY SORTED & FILTERED FAVORITE RECIPES */}
        <section className="grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <Recipe recipe={recipe} onClick={() => navigate(`/recipes/${recipe.id}`)} />
              <div className="recipe-actions">
                <button onClick={() => startEditing(recipe)}>Edit</button>
                <button className="btn-cancel" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </div>
            </div>
          ))}
        </section>

    </section>
  );
}
