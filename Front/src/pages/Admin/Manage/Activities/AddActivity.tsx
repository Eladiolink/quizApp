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
import {Notification} from '../../../../components/common/Notification';
import Editor from '../../../../components/common/Editor'; // ou TextAreaEditor
import { ActivityRequestDTO } from '../../../../interfaces/Activity';
import { createActivity } from '../../../../services/activityService';
import { ActivityQuestionRequestDTO, CorrectOption } from '../../../../interfaces/ActivityQuestion';
import { createQuestion } from '../../../../services/activityQuestionService';

export default function AddActivity() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [idQuestion, setIdQuestion] = useState(-1);
  const [description, setDescription] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [alternatives, setAlternatives] = useState(["", "", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState< number| null>(null);
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

    const questionId = ['A','B','C','D','E']
    const newQuestion: ActivityQuestionRequestDTO = {
      question: questionText,
      optionA: alternatives[0],
      optionB: alternatives[1],
      optionC: alternatives[2],
      optionD: alternatives[3],
      optionE: alternatives[4],
      correctOption: questionId[correctIndex],
      activityId: idQuestion
    };

    createQuestion(newQuestion)
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

    const activityRequest: ActivityRequestDTO = {
      title: title,
      description: description,
      createdById: 1,
    };

    createActivity(activityRequest)
      .then((result) => {
        setIdQuestion(result.id)
      })


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
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 6, p: 4 }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {!showForm ? (
        <>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Nova Atividade
          </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleStart}>
              Prosseguir para adicionar questões
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Adicionar Questão
          </Typography>
          <Box component="form" onSubmit={handleSaveQuestion} display="flex" flexDirection="column" gap={3}>
            <Box>
              <Typography fontWeight="medium" mb={1}>
                Texto da questão:
              </Typography>
              <Editor value={questionText} onChange={(value: string) => setQuestionText(value)} />
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

            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="success">
                Salvar Questão
              </Button>
              <Button variant="contained" color="error" onClick={handleFinishActivity}>
                Finalizar Atividade
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
