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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ClientActivityQuestionResponseDTO } from "../../../interfaces/ActivityQuestion";
import { getQuestionsByActivity } from "../../../services/activityQuestionService";
import { answeredQuestion } from "../../../services/answeredQuestion";
import { AnsweredQuestionRequestDTO } from "../../../interfaces/AnsweredQuestion";
import getId from "../../../utils/GetForLocalStorage";
import { NotificationClient } from "../../../components/common/Notification";

export default function ActivityQuestionPage() {
  const { id } = useParams();
  const [questoes, setQuestoes] = useState<ClientActivityQuestionResponseDTO[]>([]);
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      getQuestionsByActivity(parseInt(id)).then((res) => {
        setQuestoes(res);
      });

      if (location.state != null) {
        location.state.message = null;
        location.state.type = null;
      }
    }
  }, [id]);

  const handleChange = (questionId: number, value: string) => {
    setRespostas((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const clientId: number = getId() ?? 0;
    const qtdQuestoes = questoes.length
    const qtdRespostas = Object.keys(respostas).length

    if (qtdQuestoes != qtdRespostas) {
      setNotificationMessage("Para finalizar, faça todas as questões!");
      setNotificationType("error");
      return
    }

    for (const key in respostas) {
      if (respostas.hasOwnProperty(key)) {
        const value = respostas[key];
        const question: AnsweredQuestionRequestDTO = {
          clientId,
          questionId: parseInt(key),
          selectedOption: value
        };

        answeredQuestion(question)
      }
    }

    navigate("/cliente/atividades", {
      state: { message: "Atividade finalizada com sucesso!", type: "success" },
    });
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

      {/* Exibição da notificação */}
      {notificationMessage && (
        <NotificationClient
          message={notificationMessage}
          type={notificationType}
          onClose={() => setNotificationMessage("")}
        />
      )}
    </Container>
  );
}
