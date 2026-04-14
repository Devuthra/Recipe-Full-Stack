import { useEffect, useState } from "react";
import "./App.css";
import API from "./Api/Api";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [form, setForm] = useState({
    name: "",
    chef: "",
    ingredients: "",
    instructions: "",
  });

  const API = "http://localhost:8081";

  // FETCH
  const fetchRecipes = () => {
    fetch(`${API}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  };

  useEffect(() => {
    if (token) fetchRecipes();
  }, [token]);

  // ADD
  const addRecipe = () => {
    fetch(`${API}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }).then(() => {
      fetchRecipes();
      setForm({ name: "", chef: "", ingredients: "", instructions: "" });
    });
  };

  // DELETE
  const deleteRecipe = (id) => {
    fetch(`${API}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => fetchRecipes());
  };

  // EDIT
  const editRecipe = (r) => {
    const newName = prompt("Enter new name", r.name);
    if (!newName) return;

    fetch(`${API}/recipes/${r.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...r, name: newName }),
    }).then(() => fetchRecipes());
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // SHOW LOGIN IF NO TOKEN
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container">
      <h1 className="title">🍲 RecipeHub</h1>

      <button onClick={logout}>Logout</button>

      {/* FORM */}
      <div className="form">
        <input
          placeholder="Recipe Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Chef"
          value={form.chef}
          onChange={(e) => setForm({ ...form, chef: e.target.value })}
        />
        <input
          placeholder="Ingredients"
          value={form.ingredients}
          onChange={(e) =>
            setForm({ ...form, ingredients: e.target.value })
          }
        />
        <input
          placeholder="Instructions"
          value={form.instructions}
          onChange={(e) =>
            setForm({ ...form, instructions: e.target.value })
          }
        />

        <button onClick={addRecipe}>Add Recipe</button>
      </div>

      {/* LIST */}
      <div className="list">
        {recipes.map((r) => (
          <div key={r.id} className="card">
            <h3>{r.name}</h3>
            <p>{r.chef}</p>
            <p>{r.ingredients}</p>
            <p>{r.instructions}</p>

            <button onClick={() => editRecipe(r)}>Edit</button>
            <button onClick={() => deleteRecipe(r.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;