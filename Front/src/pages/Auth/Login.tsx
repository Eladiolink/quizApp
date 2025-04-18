import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "admin" | "client") => {
    login({ name: "Usuário", role });
    navigate(role === "admin" ? "/admin" : "/cliente");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="space-y-4">
        <button
          onClick={() => handleLogin("admin")}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Entrar como Admin
        </button>
        <button
          onClick={() => handleLogin("client")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Entrar como Cliente
        </button>
      </div>
    </div>
  );
}
