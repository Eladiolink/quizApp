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

interface Activity {
  id: number;
  titulo: string;
  descricao: string;
  tempo: string;
}

export default function ClientActivities() {
  const [atividades, setAtividades] = useState<Activity[]>([]);
  const [descricao, setDescricao] = useState<string>("");

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
        {atividades.map((atividade) => (
          <Card key={atividade.id} sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {atividade.titulo}
              </Typography>
              <Typography color="text.secondary">{atividade.descricao}</Typography>
              <Typography variant="body2" color="text.secondary">
                Tempo estimado: {atividade.tempo}
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
