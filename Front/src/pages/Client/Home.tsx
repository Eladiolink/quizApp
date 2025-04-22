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
} from "@mui/material";

export default function ClientHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const atividadesRecentes = [
    { id: 1, titulo: "Quiz de Lógica", status: "Concluído", pontuacao: "80%" },
    { id: 2, titulo: "Matemática Básica", status: "Pendente", pontuacao: "-" },
    { id: 3, titulo: "Interpretação de Texto", status: "Concluído", pontuacao: "95%" },
  ];

  const handleIniciarAtividade = () => {
    navigate(`/cliente/atividades`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Olá, {user?.name}! 👋
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
            <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
              <TableRow>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Pontuação</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atividadesRecentes.map((atividade) => (
                <TableRow key={atividade.id}>
                  <TableCell>{atividade.titulo}</TableCell>
                  <TableCell>
                    <Chip
                      label={atividade.status}
                      color={atividade.status === "Concluído" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{atividade.pontuacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
