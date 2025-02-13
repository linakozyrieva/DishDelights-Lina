import { useNavigate } from "react-router-dom";

export default function Recipe({ recipe }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <article className="card" onClick={handleClick}>
      <img src={recipe.image || "https://placehold.co/600x400?text=No+Image"} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      <p className="title">{recipe.category}</p>
    </article>
  );
}
