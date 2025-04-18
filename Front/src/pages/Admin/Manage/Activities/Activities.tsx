import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Activity {
  id: number;
  title: string;
  description: string;
  status: "ativo" | "inativo";
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulação de dados de atividades
    setActivities([
      { id: 1, title: "Atividade 1", description: "Descrição da atividade 1", status: "ativo" },
      { id: 2, title: "Atividade 2", description: "Descrição da atividade 2", status: "inativo" },
      { id: 3, title: "Atividade 3", description: "Descrição da atividade 3", status: "ativo" },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    // Lógica para excluir atividade
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Atividades</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left">Título</th>
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id} className="border-b">
              <td className="py-3 px-4">{activity.title}</td>
              <td className="py-3 px-4">{activity.description}</td>
              <td className="py-3 px-4">{activity.status}</td>
              <td className="py-3 px-4">
                <Link to={`/admin/activities/edit/${activity.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Link to="/admin/activities/create" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Adicionar Nova Atividade
        </Link>
      </div>
    </div>
  );
}
