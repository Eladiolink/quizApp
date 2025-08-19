import React, { useEffect, useState } from 'react';
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
import { Notification } from '../../../../components/common/Notification';
import Editor from '../../../../components/common/Editor';
import {
  getActivityById,
  updateActivity,
} from '../../../../services/activityService';
import {
  getQuestionsByActivityId,
  updateQuestion,
  createQuestion,
} from '../../../../services/activityQuestionService';
import { ActivityRequestDTO } from '../../../../interfaces/Activity';
import {
  ActivityQuestionRequestDTO,
  CorrectOption,
} from '../../../../interfaces/ActivityQuestion';

type Props = {
  activityId: number;
};

export default function EditActivity({ activityId }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityYear, setActivityYear] = useState<number>(new Date().getFullYear());
  const [questions, setQuestions] = useState<ActivityQuestionRequestDTO[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);

  const [questionText, setQuestionText] = useState('');
  const [alternatives, setAlternatives] = useState(['', '', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [knowledgeArea, setKnowledgeArea] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number | null>(null);
  const correctOptions: CorrectOption[] = ['A', 'B', 'C', 'D', 'E'];

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    getActivityById(activityId).then((activity) => {
      setTitle(activity.title);
      setDescription(activity.description);
      setActivityYear(activity.activityYear);
    });

    getQuestionsByActivityId(activityId).then((q) => {
      setQuestions(q);
    });
  }, [activityId]);

  const handleAlternativeChange = (index: number, value: string) => {
    const updated = [...alternatives];
    updated[index] = value;
    setAlternatives(updated);
  };

  const handleSelectQuestion = (index: number) => {
    const q = questions[index];
    setSelectedQuestionIndex(index);
    setQuestionText(q.question);
    setAlternatives([q.optionA, q.optionB, q.optionC, q.optionD, q.optionE]);
    setCorrectIndex(correctOptions.indexOf(q.correctOption));
    setKnowledgeArea(q.knowledgeArea ?? '');
    setQuestionNumber(q.questionNumber);
  };

  const handleUpdateActivity = () => {
    if (!title || !description) {
      showNotification('Preencha título e descrição.', 'error');
      return;
    }

    const updated: ActivityRequestDTO = {
      title,
      description,
      createdById: 1,
      activityYear,
    };

    updateActivity(activityId, updated).then(() => {
      showNotification('Atividade atualizada com sucesso!');
    });
  };

  const handleSaveQuestion = () => {
    if (!questionText || correctIndex === null || alternatives.some((alt) => !alt)) {
      showNotification('Preencha todos os campos da questão.', 'error');
      return;
    }

    const questionDTO: ActivityQuestionRequestDTO = {
      question: questionText,
      optionA: alternatives[0],
      optionB: alternatives[1],
      optionC: alternatives[2],
      optionD: alternatives[3],
      optionE: alternatives[4],
      correctOption: correctOptions[correctIndex],
      activityId,
      knowledgeArea,
      questionNumber: questionNumber ?? 0,
    };

    const promise = selectedQuestionIndex !== null && questions[selectedQuestionIndex].id
      ? updateQuestion(questions[selectedQuestionIndex].id!, questionDTO)
      : createQuestion(questionDTO);

    promise.then(() => {
      showNotification('Questão salva!');
      setSelectedQuestionIndex(null);
      setQuestionText('');
      setAlternatives(['', '', '', '', '']);
      setCorrectIndex(null);
      setKnowledgeArea('');
      setQuestionNumber(null);

      getQuestionsByActivityId(activityId).then(setQuestions);
    });
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
        Editar Atividade
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
        <TextField
          label="Ano da Atividade"
          type="number"
          value={activityYear}
          onChange={(e) => setActivityYear(Number(e.target.value))}
          fullWidth
        />
        <Button variant="contained" onClick={handleUpdateActivity}>
          Salvar Alterações da Atividade
        </Button>
      </Box>

      <Typography variant="h6" mt={4}>
        Questões
      </Typography>
      <Box mt={2}>
        {questions.map((q, index) => (
          <Button
            key={index}
            onClick={() => handleSelectQuestion(index)}
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          >
            Questão {q.questionNumber ?? index + 1}
          </Button>
        ))}
        <Button variant="contained" onClick={() => setSelectedQuestionIndex(null)} sx={{ mb: 2 }}>
          Nova Questão
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography fontWeight="medium">Texto da questão:</Typography>
        <Editor value={questionText} onChange={setQuestionText} />

        <Typography fontWeight="medium">Alternativas:</Typography>
        {alternatives.map((alt, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <Typography fontWeight="bold">{String.fromCharCode(65 + index)})</Typography>
            <TextField
              fullWidth
              value={alt}
              onChange={(e) => handleAlternativeChange(index, e.target.value)}
            />
          </Box>
        ))}

        <FormControl fullWidth>
          <InputLabel>Alternativa correta</InputLabel>
          <Select
            value={correctIndex ?? ''}
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
          value={questionNumber ?? ''}
          onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
        />
        <TextField
          label="Área do Conhecimento"
          fullWidth
          value={knowledgeArea ?? ''}
          onChange={(e) => setKnowledgeArea(e.target.value)}
        />

        <Button type="submit" variant="contained" onClick={handleSaveQuestion} color="success">
          Salvar Questão
        </Button>
      </Box>
    </Paper>
  );
}
