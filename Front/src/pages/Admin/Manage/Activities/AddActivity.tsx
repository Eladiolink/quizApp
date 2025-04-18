import { useState } from "react";

export default function AddActivity() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alternatives, setAlternatives] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleAlternativeChange = (index: number, value: string) => {
    const updated = [...alternatives];
    updated[index] = value;
    setAlternatives(updated);
  };

  const addAlternative = () => {
    if (alternatives.length < 5) {
      setAlternatives([...alternatives, ""]);
    }
  };

  const removeAlternative = (index: number) => {
    const updated = alternatives.filter((_, i) => i !== index);
    setAlternatives(updated);
    if (correctIndex === index) setCorrectIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || correctIndex === null || alternatives.some((alt) => !alt)) {
      alert("Preencha todos os campos e selecione a alternativa correta.");
      return;
    }

    const newActivity = {
      title,
      description,
      alternatives,
      correctIndex,
    };

    console.log("Atividade criada:", newActivity);
    // Aqui você chamaria sua API, tipo: await api.post('/activities', newActivity)

    // Resetando
    setTitle("");
    setDescription("");
    setAlternatives(["", ""]);
    setCorrectIndex(null);
    alert("Atividade criada com sucesso!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Adicionar Nova Atividade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Descrição:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Alternativas:</label>
          {alternatives.map((alt, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={alt}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correct"
                checked={correctIndex === index}
                onChange={() => setCorrectIndex(index)}
                title="Marcar como correta"
              />
              {alternatives.length > 2 && (
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => removeAlternative(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          {alternatives.length < 5 && (
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline mt-1"
              onClick={addAlternative}
            >
              + Adicionar alternativa
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Atividade
        </button>
      </form>
    </div>
  );
}
