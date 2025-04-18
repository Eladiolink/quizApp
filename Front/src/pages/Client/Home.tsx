import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ClientHome() {
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook para redirecionar

  const atividadesRecentes = [
    { id: 1, titulo: "Quiz de Lógica", status: "Concluído", pontuacao: "80%" },
    { id: 2, titulo: "Matemática Básica", status: "Pendente", pontuacao: "-" },
    { id: 3, titulo: "Interpretação de Texto", status: "Concluído", pontuacao: "95%" },
  ];

  const handleIniciarAtividade = () => {
    // Redireciona para a página fixa de atividades
    console.log("Hello World")
    navigate(`/cliente/atividades`);
  };


  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Bem-vindo à sua área de atividades. Aqui você pode acompanhar seu progresso e continuar seus desafios.</p>
        </div>

        {/* CTA */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 mb-10 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Nova atividade disponível!</h2>
          <p className="text-blue-700 mb-4">Participe do novo desafio de raciocínio lógico e veja como você se sai!</p>
          <button  onClick={handleIniciarAtividade}  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Iniciar Atividade
          </button>
        </div>

        {/* Atividades Recentes */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Suas últimas atividades</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Título</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {atividadesRecentes.map((atividade, index) => (
                  <tr key={atividade.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-gray-800">{atividade.titulo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        atividade.status === "Concluído" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {atividade.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{atividade.pontuacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
