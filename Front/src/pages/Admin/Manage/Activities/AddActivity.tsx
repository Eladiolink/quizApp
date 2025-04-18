import React, { useState } from 'react';
import Notification from '../../../../components/common/Notification';
import Editor from '../../../../components/common/Editor';

export default function AddActivity() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [alternatives, setAlternatives] = useState(["", "", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
  };

  const handleAlternativeChange = (index: number, value: string) => {
    const updated = [...alternatives];
    updated[index] = value;
    setAlternatives(updated);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText || correctIndex === null || alternatives.some((alt) => !alt)) {
      showNotification("Preencha todos os campos e selecione a alternativa correta.", "error");
      return;
    }

    const newQuestion = {
      title,
      description,
      questionText,
      alternatives,
      correctIndex,
    };

    console.log("Questão criada:", newQuestion);
    showNotification("Questão salva com sucesso!");

    setQuestionText("");
    setAlternatives(["", "", "", "", ""]);
    setCorrectIndex(null);
  };

  const handleStart = () => {
    if (!title || !description) {
      showNotification("Preencha título e descrição.", "error");
      return;
    }
    setShowForm(true);
  };

  const handleFinishActivity = () => {
    showNotification("Atividade finalizada com sucesso!");
    setTitle("");
    setDescription("");
    setQuestionText("");
    setAlternatives(["", "", "", "", ""]);
    setCorrectIndex(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow relative">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {!showForm ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Nova Atividade</h2>
          <div className="space-y-4">
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
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              onClick={handleStart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Prosseguir para adicionar questões
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Adicionar Questão</h2>
          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div>
              <label className="block font-medium">Texto da questão:</label>
              <Editor />
            </div>

            <div>
              <label className="block font-medium mb-2">Alternativas:</label>
              {alternatives.map((alt, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="w-5 font-bold">{String.fromCharCode(65 + index)})</span>
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
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar Questão
              </button>

              <button
                type="button"
                onClick={handleFinishActivity}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Finalizar Atividade
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
