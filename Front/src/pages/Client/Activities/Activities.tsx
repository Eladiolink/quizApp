import { useEffect, useState } from "react";

interface Activity {
  id: number;
  titulo: string;
  descricao: string;
  tempo: string;
}

export default function ClientActivities() {
  const [atividades, setAtividades] = useState<Activity[]>([]);
  const [descricao, setDescricao] = useState<string>("");

  useEffect(() => {
    // Simula o carregamento das atividades disponíveis
    setAtividades([
      { id: 101, titulo: "Raciocínio Lógico", descricao: "10 questões desafiadoras.", tempo: "15 min" },
      { id: 102, titulo: "Ortografia", descricao: "Corrija palavras e frases.", tempo: "10 min" },
      { id: 103, titulo: "Matemática Aplicada", descricao: "Problemas e porcentagem.", tempo: "20 min" },
    ]);
  }, []);

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Atividades Disponíveis</h1>
      <div className="space-y-6">
        {atividades.map((atividade) => (
          <div
            key={atividade.id}
            className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{atividade.titulo}</h2>
              <p className="text-gray-600">{atividade.descricao}</p>
              <span className="text-sm text-gray-500">Tempo estimado: {atividade.tempo}</span>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Iniciar
            </button>
          </div>
        ))}
      </div>
      
      {/* Aqui é onde o textarea é adicionado para edição de descrição */}
      <div className="mt-6">
        <label className="block font-medium text-gray-700">Editar Descrição</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          rows={4}
          value={descricao}
          onChange={handleDescricaoChange}
        />
      </div>
    </div>
  );
}
