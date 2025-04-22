import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActivityResponseDTO } from "../../../../interfaces/Activity";
import { getActivities } from "../../../../services/activityService";

interface Activity {
  id: number;
  title: string;
  description: string;
  status: "ativo" | "inativo";
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityResponseDTO, setActivityResponseDTO] = useState<ActivityResponseDTO[]>([]);
  
    useEffect(() => {
      async function fetchActivities() {
        try {
          const data = await getActivities();
          setActivityResponseDTO(data);
          console.log(data)
        } catch (err) {
          console.error('Erro ao buscar atividades:', err);
        }
      }
  
      fetchActivities();
    }, []);

  useEffect(() => {
    setActivities([
      { id: 1, title: "Atividade 1", description: "Descrição da atividade 1", status: "ativo" },
      { id: 2, title: "Atividade 2", description: "Descrição da atividade 2", status: "inativo" },
      { id: 3, title: "Atividade 3", description: "Descrição da atividade 3", status: "ativo" },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gerenciar Atividades
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponseDTO.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>{"ativo"}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/admin/activities/edit/${activity.id}`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(activity.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Button
          component={Link}
          to="/admin/activities/create"
          variant="contained"
          color="primary"
        >
          Adicionar Nova Atividade
        </Button>
      </Box>
    </Box>
  );
}
