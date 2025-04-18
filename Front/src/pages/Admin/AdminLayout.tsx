import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-3xl font-bold mb-8">Admin</h2>
        <ul className="space-y-4">
          <li><Link to="/admin" className="hover:text-blue-400">Dashboard</Link></li>
          <li><Link to="/admin/manage/activities" className="hover:text-blue-400">Atividades</Link></li>
          <li><Link to="/admin/manage/users" className="hover:text-blue-400">Usuários</Link></li>
        </ul>
        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-6"
        >
          Sair
        </button>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
