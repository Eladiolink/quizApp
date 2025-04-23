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
import { deleteActivity, getActivities } from "../../../../services/activityService";
import { del } from "../../../../services/Api";

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
        } catch (err) {
          console.error('Erro ao buscar atividades:', err);
        }
      }
  
      fetchActivities();
    }, []);

    const handleDelete = async (id: number) => {
      try {
        await deleteActivity(id);
        setActivityResponseDTO((prev) => prev.filter((activity) => activity.id !== id));
      } catch (error) {
        console.error("Erro ao deletar atividade:", error);
      }
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
