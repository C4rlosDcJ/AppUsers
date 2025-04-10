import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      alert("No se pudo eliminar el usuario.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-slate-900 to-black text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-green-400 shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-green-400 tracking-wider">
            ⚡ AppUsers • Admin
          </h1>
          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded-md transition"
            >
              + Crear
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md border border-slate-500 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400">Usuarios Registrados</h2>
          <span className="text-sm text-gray-400">Total: {users.length}</span>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20 animate-pulse">
            No hay usuarios por ahora 💤
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-md hover:shadow-green-500/20 hover:scale-[1.015] transition-all duration-200"
              >
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-1">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-400 italic">{user.email}</p>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Link
                    to={`/edit/${user.id}`}
                    className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
