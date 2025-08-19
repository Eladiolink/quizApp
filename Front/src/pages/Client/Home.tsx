import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import { ActivityAnswered } from "../../interfaces/Activity";
import { useEffect, useState } from "react";
import { getActivityAnswered, getRequestcorrection } from "../../services/activityService";

export default function ClientHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [atividadesRecentes, setAtividadesRecentes] = useState<ActivityAnswered[]>([]);
  const [selectedModels, setSelectedModels] = useState<Record<number, string>>({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        getActivityAnswered(parsedId).then((res) => setAtividadesRecentes(res));
      } else {
        console.error("ID salvo no localStorage não é um número válido.");
      }
    } else {
      console.error("ID não encontrado no localStorage.");
    }
  }, []);

  const handleIniciarAtividade = () => {
    navigate(`/cliente/atividades`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Olá, {localStorage.getItem("name")?.split(" ")[0]}! 👋
        </Typography>
        <Typography color="text.secondary">
          Bem-vindo à sua área de atividades. Aqui você pode acompanhar seu progresso e continuar seus desafios.
        </Typography>
      </Box>

      {/* CTA */}
      <Paper
        sx={{
          backgroundColor: "blue.50",
          border: "1px solid",
          borderColor: "blue.200",
          p: 4,
          mb: 6,
        }}
        elevation={1}
      >
        <Typography variant="h6" color="primary.dark" fontWeight="bold" gutterBottom>
          Nova atividade disponível!
        </Typography>
        <Typography color="primary.main" mb={2}>
          Participe do novo desafio de raciocínio lógico e veja como você se sai!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleIniciarAtividade}>
          Iniciar Atividade
        </Button>
      </Paper>

      {/* Atividades Recentes */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Suas últimas atividades
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : "#f9f9f9",
              }}
            >
              <TableRow>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Pontuação</strong></TableCell>
                <TableCell><strong>Modelo</strong></TableCell>
                <TableCell><strong>Correção</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atividadesRecentes.map((atividade) => (
                <TableRow key={atividade.id} hover>
                  <TableCell>{atividade.title}</TableCell>

                  {/* Status com botão "Ver resultado" */}
                  <TableCell>
                    {atividade.status ? (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          const userId = localStorage.getItem("id");
                          navigate(`/cliente/result/${atividade.id}/user/${userId}`);
                        }}
                      >
                        Ver resultado
                      </Button>
                    ) : (
 <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          const userId = localStorage.getItem("id");
                          navigate(`/cliente/result/${atividade.id}/user/${userId}`);
                        }}
                      >
                        Ver resultado
                      </Button>                    )}
                  </TableCell>

                  <TableCell>{"80%"}</TableCell>

                  {/* Dropdown de modelos */}
                  <TableCell>
                    <Select
                      size="small"
                      value={selectedModels[atividade.id] || "gemini"}
                      onChange={(e) => {
                        setSelectedModels((prev) => ({
                          ...prev,
                          [atividade.id]: e.target.value,
                        }));
                      }}
                    >
                      <MenuItem value="gemini">Gemini</MenuItem>
                      <MenuItem value="gpt-4">GPT-4</MenuItem>
                      <MenuItem value="deepseek">Deepseek</MenuItem>
                    </Select>
                  </TableCell>

                  {/* Correção sempre visível */}
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        const userId = parseInt(localStorage.getItem("id") ?? "0");
                        const model = selectedModels[atividade.id] || "gemini";
                        getRequestcorrection(atividade.id, userId, model);
                      }}
                    >
                      Solicitar correção
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
