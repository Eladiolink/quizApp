import {
  Box,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientActivityQuestionResponseDTO } from "../../../interfaces/ActivityQuestion";
import { getQuestionsByActivity } from "../../../services/activityQuestionService";

export default function ActivityQuestionPage() {
  const { id } = useParams();
  const [questoes, setQuestoes] = useState<ClientActivityQuestionResponseDTO[]>([]);
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (id) {
      getQuestionsByActivity(parseInt(id)).then((res) => {
        setQuestoes(res);
      });
    }
  }, [id]);

  const handleChange = (questionId: number, value: string) => {
    setRespostas((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Respostas enviadas:", respostas);
    // Aqui você pode chamar um serviço ou fazer o POST para a API
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Responder Atividade
      </Typography>

      {questoes.map((questao, index) => (
        <Box key={questao.id} mb={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {questao.question}
            </Typography>

            <RadioGroup
              value={respostas[questao.id] || ""}
              onChange={(e) => handleChange(questao.id, e.target.value)}
            >
              {["A", "B", "C", "D", "E"].map((letra) => (
                <FormControlLabel
                  key={letra}
                  value={letra}
                  control={<Radio />}
                  label={`${letra}) ${questao[`option${letra}` as keyof typeof questao]}`}
                />
              ))}
            </RadioGroup>
          </Paper>

          {index < questoes.length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}
        </Box>
      ))}

      <Box textAlign="center" mt={6}>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          Enviar Respostas
        </Button>
      </Box>
    </Container>
  );
}
