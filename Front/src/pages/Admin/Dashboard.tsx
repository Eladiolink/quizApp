import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bem-vindo, {user?.name}</h1>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total de Atividades</h3>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Usuários Registrados</h3>
          <p className="text-3xl font-bold">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Atividades Pendentes</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* Área de gerenciamento */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Atividades</h2>
        <Link to="/admin/activities/create" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Adicionar Nova Atividade
        </Link>
      </div>
    </div>
  );
}
