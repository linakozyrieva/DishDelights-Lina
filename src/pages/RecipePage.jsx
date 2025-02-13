import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Recipe from "../components/Recipe";

export default function RecipePage() {
  const defaultRecipes = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      category: "Pasta",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
      prepTime: 10,
      cookTime: 15,
      totalTime: 25,
      servings: 2,
      ingredients: [
        "200g spaghetti",
        "100g pancetta",
        "2 large eggs",
        "50g pecorino cheese",
        "50g parmesan cheese",
        "Black pepper",
        "Salt"
      ],
      instructions: [
        "Boil pasta in salted water until al dente.",
        "Fry pancetta until crispy.",
        "Whisk eggs with cheese and black pepper.",
        "Mix pasta with pancetta and remove from heat.",
        "Quickly stir in egg mixture to create a creamy sauce.",
        "Serve immediately with extra cheese and black pepper."
      ],
      nutrition: {
        Calories: "550 kcal",
        Protein: "30g",
        Carbs: "65g",
        Fat: "20g"
      }
    },
    {
      id: "2",
      name: "Chicken Curry",
      category: "Indian",
      description: "A spicy and flavorful chicken curry with aromatic spices.",
      image: "https://hips.hearstapps.com/hmg-prod/images/190509-coconut-chicken-curry-157-1558039780.jpg?crop=0.8891228070175439xw:1xh;center,top&resize=1200:*",
      prepTime: 15,
      cookTime: 45,
      totalTime: 60,
      servings: 4,
      ingredients: [
        "500g chicken breast",
        "2 onions, chopped",
        "3 cloves garlic, minced",
        "1 tbsp ginger, grated",
        "2 tomatoes, pureed",
        "2 tbsp curry powder",
        "400ml coconut milk",
        "Salt & pepper",
        "Fresh cilantro"
      ],
      instructions: [
        "Heat oil in a pan and sauté onions until golden.",
        "Add garlic and ginger, cook for 1 min.",
        "Add chicken and brown on all sides.",
        "Stir in curry powder and tomatoes, cook for 5 min.",
        "Pour in coconut milk and simmer for 30 min.",
        "Garnish with cilantro and serve with rice."
      ],
      nutrition: {
        Calories: "480 kcal",
        Protein: "40g",
        Carbs: "20g",
        Fat: "25g"
      }
    },
    {
      id: "3",
      name: "Chocolate Cake",
      category: "Dessert",
      description: "A rich and moist chocolate cake topped with ganache.",
      image: "https://www.bakedambrosia.com/wp-content/uploads/2023/10/Moist-Chocolate-Cake-20.jpg",
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
      servings: 8,
      ingredients: [
        "200g flour",
        "100g cocoa powder",
        "200g sugar",
        "3 eggs",
        "100ml milk",
        "100ml vegetable oil",
        "1 tsp baking powder",
        "1 tsp vanilla extract"
      ],
      instructions: [
        "Preheat oven to 180°C.",
        "Mix flour, cocoa powder, sugar, and baking powder.",
        "Whisk eggs, milk, oil, and vanilla extract together.",
        "Combine wet and dry ingredients until smooth.",
        "Pour into a greased cake tin and bake for 30 min.",
        "Let cool and top with chocolate ganache."
      ],
      nutrition: {
        Calories: "320 kcal",
        Protein: "5g",
        Carbs: "50g",
        Fat: "12g"
      }
    },
    {
      id: "4",
      name: "Caesar Salad",
      category: "Salad",
      description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese.",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
      prepTime: 10,
      cookTime: 5,
      totalTime: 15,
      servings: 2,
      ingredients: [
        "1 head romaine lettuce, chopped",
        "1/2 cup Caesar dressing",
        "1/2 cup croutons",
        "1/4 cup grated Parmesan cheese",
        "1/2 tsp black pepper"
      ],
      instructions: [
        "Chop romaine lettuce and place in a bowl.",
        "Add Caesar dressing and toss well.",
        "Top with croutons and Parmesan cheese.",
        "Season with black pepper.",
        "Serve immediately."
      ],
      nutrition: {
        Calories: "320 kcal",
        Protein: "8g",
        Carbs: "20g",
        Fat: "24g"
      }
    },
    {
      id: "5",
      name: "Ramen",
      category: "Japanese",
      description: "A warm and flavorful Japanese noodle soup with rich broth and toppings.",
      image: "https://myriadrecipes.com/wp-content/uploads/2024/01/Marry-Me-Chicken-Ramen-8.png",
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      servings: 2,
      ingredients: [
        "2 packs fresh ramen noodles",
        "4 cups chicken broth",
        "1 tbsp soy sauce",
        "1 tbsp miso paste",
        "2 cloves garlic, minced",
        "1 tsp ginger, grated",
        "1/2 cup sliced mushrooms",
        "1 boiled egg, halved",
        "2 slices chashu pork (optional)",
        "1/4 cup green onions, chopped",
        "Nori seaweed, for garnish"
      ],
      instructions: [
        "Heat broth in a pot and add soy sauce, miso paste, garlic, and ginger.",
        "Simmer for 15 minutes.",
        "Cook ramen noodles according to package instructions.",
        "Add sliced mushrooms to broth and cook for 5 minutes.",
        "Divide cooked noodles into bowls.",
        "Pour hot broth over noodles.",
        "Top with boiled egg, chashu pork, green onions, and nori.",
        "Serve hot."
      ],
      nutrition: {
        Calories: "450 kcal",
        Protein: "20g",
        Carbs: "60g",
        Fat: "15g"
      }
    },
    {
      id: "6",
      name: "Cheesecake",
      category: "Dessert",
      description: "A rich and creamy cheesecake with a buttery graham cracker crust.",
      image: "https://www.recipetineats.com/tachyon/2024/09/No-bake-cheesecake_8.jpg",
      prepTime: 20,
      cookTime: 60,
      totalTime: 80,
      servings: 8,
      ingredients: [
        "200g graham crackers, crushed",
        "100g butter, melted",
        "500g cream cheese",
        "200g sugar",
        "3 eggs",
        "1 tsp vanilla extract",
        "1/2 cup sour cream"
      ],
      instructions: [
        "Preheat oven to 160°C (320°F).",
        "Mix crushed graham crackers with melted butter and press into a baking pan.",
        "In a bowl, beat cream cheese, sugar, eggs, and vanilla until smooth.",
        "Pour filling over crust and bake for 60 minutes.",
        "Let cool, then refrigerate for at least 4 hours before serving."
      ],
      nutrition: {
        Calories: "420 kcal",
        Protein: "8g",
        Carbs: "35g",
        Fat: "28g"
      }
    }
    
    

  ];
  
  

  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
    // 🔥 If stored recipes are missing or incomplete, overwrite with default recipes
    if (storedRecipes.length < defaultRecipes.length) {
      console.log("Updating localStorage with full default recipes...");
      localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
      setRecipes(defaultRecipes);
    } else {
      console.log("Loading recipes from localStorage.");
      setRecipes(storedRecipes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

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
      <h1>Discover our Delicious Recipes!</h1>

      {/* 🔍 FILTER & SORT FORM */}
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

      {/* DISPLAY RECIPES */}
      <section className="grid">
        {filteredRecipes.map(recipe => (
          <Recipe key={recipe.id} recipe={recipe} onClick={() => navigate(`/recipes/${recipe.id}`)} />
        ))}
      </section>
    </section>
  );
}
