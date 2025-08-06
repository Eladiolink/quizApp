import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Notification } from '../../../../components/common/Notification';
import Editor from '../../../../components/common/Editor';
import { createQuestion } from '../../../../services/activityQuestionService';
import { ActivityQuestionRequestDTO } from '../../../../interfaces/ActivityQuestion';

export default function AddQuestion() {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);

  const [questionText, setQuestionText] = useState("");
  const [alternatives, setAlternatives] = useState(["", "", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [knowledgeArea, setKnowledgeArea] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
  };

  const handleAlternativeChange = (index: number, value: string) => {
    const updated = [...alternatives];
    updated[index] = value;
    setAlternatives(updated);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText || correctIndex === null || alternatives.some((alt) => !alt)) {
      showNotification("Preencha todos os campos e selecione a alternativa correta.", "error");
      return;
    }

    const questionId = ['A', 'B', 'C', 'D', 'E'];
    const newQuestion: ActivityQuestionRequestDTO = {
      question: questionText,
      optionA: alternatives[0],
      optionB: alternatives[1],
      optionC: alternatives[2],
      optionD: alternatives[3],
      optionE: alternatives[4],
      correctOption: questionId[correctIndex],
      activityId,
      knowledgeArea,
      questionNumber: questionNumber ?? 0,
    };

    try {
      await createQuestion(newQuestion);
      showNotification("Questão adicionada com sucesso!");

      // Limpa os campos
      setQuestionText("");
      setAlternatives(["", "", "", "", ""]);
      setCorrectIndex(null);
      setKnowledgeArea("");
      setQuestionNumber(null);
    } catch (error) {
      console.error(error);
      showNotification("Erro ao salvar questão.", "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 6, p: 4 }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Adicionar Questão à Atividade #{activityId}
      </Typography>

      <Box component="form" onSubmit={handleSaveQuestion} display="flex" flexDirection="column" gap={3}>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Texto da questão:
          </Typography>
          <Editor value={questionText} onChange={setQuestionText} />
        </Box>

        <Box>
          <Typography fontWeight="medium" mb={2}>
            Alternativas:
          </Typography>
          {alternatives.map((alt, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
              <Typography fontWeight="bold" width={20}>
                {String.fromCharCode(65 + index)})
              </Typography>
              <TextField
                fullWidth
                value={alt}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
              />
            </Box>
          ))}
        </Box>

        <FormControl fullWidth>
          <InputLabel>Alternativa correta</InputLabel>
          <Select
            value={correctIndex !== null ? correctIndex : ""}
            onChange={(e) => setCorrectIndex(Number(e.target.value))}
            label="Alternativa correta"
          >
            {alternatives.map((_, index) => (
              <MenuItem key={index} value={index}>
                {String.fromCharCode(65 + index)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Número da Questão"
          type="number"
          fullWidth
          value={questionNumber ?? ""}
          onChange={(e) => setQuestionNumber(e.target.value === "" ? null : parseInt(e.target.value))}
        />

        <TextField
          label="Área do Conhecimento"
          fullWidth
          value={knowledgeArea ?? ""}
          onChange={(e) => setKnowledgeArea(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            Salvar Questão
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
