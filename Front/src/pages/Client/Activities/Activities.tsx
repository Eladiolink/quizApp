import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { ActivityResponseDTO } from "../../../interfaces/Activity";
import { getActivities } from "../../../services/activityService";

interface Activity {
  id: number;
  titulo: string;
  descricao: string;
  tempo: string;
}

export default function ClientActivities() {
  const [atividades, setAtividades] = useState<Activity[]>([]);
  const [descricao, setDescricao] = useState<string>("");
  const [activityResponseDTO, setActivityResponseDTO] = useState<ActivityResponseDTO[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getActivities();
        setActivityResponseDTO(data);
        console.log(data)
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    // Simula o carregamento das atividades disponíveis
    setAtividades([
      { id: 101, titulo: "Raciocínio Lógico", descricao: "10 questões desafiadoras.", tempo: "15 min" },
      { id: 102, titulo: "Ortografia", descricao: "Corrija palavras e frases.", tempo: "10 min" },
      { id: 103, titulo: "Matemática Aplicada", descricao: "Problemas e porcentagem.", tempo: "20 min" },
    ]);
  }, []);

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Atividades Disponíveis
      </Typography>

      <Box sx={{ display: "grid", gap: 3 }}>
        {activityResponseDTO.map((atividade) => (
          <Card key={atividade.id} sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {atividade.title}
              </Typography>
              <Typography color="text.secondary">{atividade.description}</Typography>
              <Typography variant="body2" color="text.secondary">
                Tempo estimado: {"10 min"}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained" color="primary">
                Iniciar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
