import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/users", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Usuario"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 text-black font-semibold py-2 rounded hover:bg-emerald-600 transition"
          >
            Registrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-emerald-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
