import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register"; // ✅ added

function App() {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login"); // ✅ added

  const [form, setForm] = useState({
    name: "",
    chef: "",
    ingredients: "",
    instructions: "",
  });

  const BASE_URL = "http://localhost:8081";

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchRecipes = () => {
    fetch(`${BASE_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          logout();
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setRecipes(data);
      });
  };

  useEffect(() => {
    if (token) fetchRecipes();
  }, [token]);

  const addRecipe = () => {
    fetch(`${BASE_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }).then(() => {
      fetchRecipes();
      setForm({
        name: "",
        chef: "",
        ingredients: "",
        instructions: "",
      });
    });
  };

  const deleteRecipe = (id) => {
    fetch(`${BASE_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => fetchRecipes());
  };

  const editRecipe = (r) => {
    const newName = prompt("Enter new name", r.name);
    if (!newName) return;

    fetch(`${BASE_URL}/recipes/${r.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...r, name: newName }),
    }).then(() => fetchRecipes());
  };

  // ✅ FIXED LOGIN/REGISTER SWITCH
  if (!token) {
    if (page === "login") {
      return <Login setToken={setToken} setPage={setPage} />;
    } else {
      return <Register setPage={setPage} />;
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">🍲 RecipeHub</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

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