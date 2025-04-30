import {
    Box,
    Container,
    Typography,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
    Chip,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
import { answeredQuestionSummaryDTO } from "../../../services/answeredQuestion";
import { AnsweredQuestionSummaryDTO } from "../../../interfaces/AnsweredQuestionSummaryDTO";
  
  
  export default function ActivityResultPage() {
    const { activityId, userId } = useParams<{ activityId: string; userId: string }>();
    const [questoes, setQuestoes] = useState<AnsweredQuestionSummaryDTO[]>([]);
  
    useEffect(() => {
      answeredQuestionSummaryDTO(parseInt(activityId??'0'),parseInt(userId??'0z')).then(
        res => { setQuestoes(res); console.log(res,activityId,userId)}
      )

    }, [userId]);
  
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Resultado da Atividade
        </Typography>
  
        {questoes.map((questao, index) => {
          const acertou = questao.selectedOption === questao.correctOption;
  
          return (
            <Box key={questao.questionId} mb={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    {index + 1}. {questao.question}
                  </Typography>
  
                  <Chip
                    label={acertou ? "Acertou" : "Errou"}
                    color={acertou ? "success" : "error"}
                  />
                </Box>
  
                {questao.image && (
                  <Box mt={2} mb={2}>
                    <img
                      src={questao.image}
                      alt="Imagem da pergunta"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  </Box>
                )}
  
                <RadioGroup value={questao.selectedOption}>
                  {["A", "B", "C", "D", "E"].map((letra) => {
                    const valor = questao[`option${letra}` as keyof AnsweredQuestionSummaryDTO];
                    const isCorrect = letra === questao.correctOption;
                    const isSelected = letra === questao.selectedOption;
  
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
              </Paper>
  
              {index < questoes.length - 1 && <Divider sx={{ my: 4 }} />}
            </Box>
          );
        })}
      </Container>
    );
  }
  