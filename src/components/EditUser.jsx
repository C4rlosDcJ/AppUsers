import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../services/api";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    axios.get("/users").then((res) => {
      const user = res.data.find((u) => u.id === parseInt(id));
      if (user) {
        setForm({ username: user.username, email: user.email, password: "" });
      }
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      username: form.username,
      email: form.email,
    };

    if (form.password) {
      dataToSend.password = form.password;
    }

    await axios.put(`/users/${id}`, dataToSend);
    navigate("/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
          Editar usuario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="(Opcional) Nueva contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-cyan-500 text-black font-semibold py-2 rounded hover:bg-cyan-600 transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
