import {
  Box,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { answeredQuestionSummaryDTO } from "../../../services/answeredQuestion";
import { AnsweredQuestionSummaryDTO } from "../../../interfaces/AnsweredQuestionSummaryDTO";
import { CorrectedQuestionDTO } from "../../../interfaces/CorrectedQuestion";
import { getCorrectedQuestion } from "../../../services/correctedQuestion";

export default function ActivityResultPage() {
  const { activityId, userId } = useParams<{ activityId: string; userId: string }>();
  const [questoes, setQuestoes] = useState<AnsweredQuestionSummaryDTO[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const theme = useTheme();
  const [correctedQuestion, setCorrectedQuestion] = useState<CorrectedQuestionDTO[]>([]);

  useEffect(() => {
    answeredQuestionSummaryDTO(parseInt(activityId ?? '0'), parseInt(userId ?? '0')).then(
      res => { setQuestoes(res); }
    );

    getCorrectedQuestion(parseInt(activityId ?? '0'), parseInt(userId ?? '0')).then(
      res => { setCorrectedQuestion(res); }
    );
  }, [userId]);

  const currentQuestion = questoes[currentQuestionIndex];
  const acertou = currentQuestion?.selectedOption === currentQuestion?.correctOption;

  const borderColor = acertou
    ? (theme.palette.mode === 'dark' ? "#5cdb95" : "#d4edda")
    : (theme.palette.mode === 'dark' ? "#f56c6c" : "#f8d7da");

  const backgroundColor = acertou
    ? (theme.palette.mode === 'dark' ? "#1e3d34" : "#f6fffa")
    : (theme.palette.mode === 'dark' ? "#3c2a2a" : "#fff6f6");

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Resultado da Atividade
      </Typography>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mb={4}>
        {questoes.map((_, index) => (
          <Chip
            key={index}
            label={index + 1}
            color={index === currentQuestionIndex ? "primary" : "default"}
            variant={index === currentQuestionIndex ? "filled" : "outlined"}
            onClick={() => setCurrentQuestionIndex(index)}
            clickable
            sx={{
              borderRadius: 8,
              height: 40,
              fontSize: "1rem",
              px: 2,
            }}
          />
        ))}
      </Box>

      {currentQuestion && (
        <Box mb={8}>
          {/* Card da questão */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor,
              backgroundColor,
              borderRadius: 2,
            }}
          >
            <Box width="100%" mb={2} textAlign="center">
              <Chip
                label={acertou ? "Acertou" : "Errou"}
                color={acertou ? "success" : "error"}
                sx={{ width: "100%", fontSize: "1rem", py: 1, borderRadius: 2 }}
              />
            </Box>

            <Typography variant="h6" sx={{ textAlign: "justify" }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </pre>
            </Typography>

            {currentQuestion.image && (
              <Box mt={2} mb={2}>
                <img
                  src={currentQuestion.image}
                  alt="Imagem da pergunta"
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </Box>
            )}

            <Box mt={3}>
              <RadioGroup value={currentQuestion.selectedOption}>
                {["A", "B", "C", "D", "E"].map((letra) => {
                  const valor = currentQuestion[`option${letra}` as keyof AnsweredQuestionSummaryDTO];
                  const isCorrect = letra === currentQuestion.correctOption;
                  const isSelected = letra === currentQuestion.selectedOption;

                  return (
                    <FormControlLabel
                      key={letra}
                      value={letra}
                      control={
                        <Radio
                          checked={isSelected}
                          disabled
                          sx={{
                            color: isCorrect
                              ? "green"
                              : isSelected && !isCorrect
                                ? "red"
                                : undefined,
                          }}
                        />
                      }
                      label={`${letra}) ${valor}`}
                      sx={{
                        fontWeight: isCorrect ? "bold" : "normal",
                        color: isCorrect
                          ? "green"
                          : isSelected && !isCorrect
                            ? "red"
                            : undefined,
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              mt: 3,
              p: 2,
              borderLeft: "6px solid",
              borderColor: "green",
              backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f0fff0",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Alternativa correta: {currentQuestion.correctOption}
            </Typography>

             <Typography variant="subtitle1" fontWeight="bold">
               Área de Conhecimento: {currentQuestion.knowledgeArea}
            </Typography>
          </Paper>

          {/* Card de correção/explicação com espaçamento abaixo */}
          {/* {correctedQuestion.length > 0 && (
            <Paper
              elevation={2}
              sx={{
                mt: 3,
                p: 3,
                borderLeft: "6px solid",
                borderColor: acertou ? "green" : "red",
                backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#fafafa",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {acertou ? `Explicação:${
                  correctedQuestion.find(
                    (c) => c.questionId === currentQuestion.questionId
                  )?.model
                }` : `Correção: ${
                  correctedQuestion.find(
                    (c) => c.questionId === currentQuestion.questionId
                  )?.model
                }`}
              </Typography>
              <Typography sx={{ textAlign: "justify", whiteSpace: "pre-line" }}>
                {
                  correctedQuestion.find(
                    (c) => c.questionId === currentQuestion.questionId
                  )?.correction ?? (acertou ? "Explicação não disponível." : "Correção não disponível.")
                }
              </Typography>
            </Paper>
          )}
 */}

          {correctedQuestion.map((c) =>
  c.questionId === currentQuestion.questionId && (
    <Paper
      key={c.id}
      elevation={2}
      sx={{
        mt: 3,
        p: 3,
        borderLeft: "6px solid",
        borderColor: acertou ? "green" : "red",
        backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#fafafa",
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {acertou ? `Explicação: ${c.model}` : `Correção: ${c.model}`}
      </Typography>
      <Typography sx={{ textAlign: "justify", whiteSpace: "pre-line" }}>
        {c.correction ?? (acertou ? "Explicação não disponível." : "Correção não disponível.")}
      </Typography>
    </Paper>
  )
)}

        </Box>
      )}
    </Container>
  );
}
