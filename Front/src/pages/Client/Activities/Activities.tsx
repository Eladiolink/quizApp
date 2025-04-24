import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { ActivityResponseDTO } from "../../../interfaces/Activity";
import { getFindAllActivitiesNotAnsweredByClient } from "../../../services/activityService";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationClient} from "../../../components/common/Notification";
import getId from "../../../utils/GetForLocalStorage";


export default function ClientActivities() {
  const [activityResponseDTO, setActivityResponseDTO] = useState<ActivityResponseDTO[]>([]);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [type, setType] = useState(location.state?.type || "");


  useEffect(() => {
    async function fetchUsers() {
      try {
        const id = getId()??0;
        const data = await getFindAllActivitiesNotAnsweredByClient(id);
        setActivityResponseDTO(data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    }

    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const handleIniciar = (atividadeId: number) => {
    navigate(`/cliente/atividade/${atividadeId}`);
    setMessage(null);
    setType(null);
  };

  const handleCloseNotification = () => {
    setMessage(null);
    setType(null);
    console.log("OKKKKK")
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleIniciar(atividade.id)} // 👈 Ação ao clicar
              >
                Iniciar
              </Button>
            </CardActions>
          </Card>
        ))}
        {message && <NotificationClient message={message} type={type} onClose={handleCloseNotification}/>}
      </Box>
    </Container>
  );
}