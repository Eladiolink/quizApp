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
import SqlUploader from "../../../../components/common/SqlUploader";

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
        console.error("Erro ao buscar atividades:", err);
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

  const handleExportSql = async () => {
    try {
      const response = await fetch("http://localhost:3000/export/activities-sql"); // Ajuste se usar proxy/backend em outra porta
      const sqlText = await response.text();

      const blob = new Blob([sqlText], { type: "text/sql" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "atividades_export.sql";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar SQL:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        Gerenciar Atividades
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Título</strong>
              </TableCell>
              <TableCell>
                <strong>Descrição</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Ações</strong>
              </TableCell>
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
                  <IconButton color="error" onClick={() => handleDelete(activity.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4} display="flex" gap={2}>
        <Button
          component={Link}
          to="/admin/activities/create"
          variant="contained"
          color="primary"
        >
          Adicionar Nova Atividade
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleExportSql}>
          Exportar .SQL
        </Button>
      </Box>

      <SqlUploader />
    </Box>
  );
}
