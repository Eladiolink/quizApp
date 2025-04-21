import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box p={4}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">
          Bem-vindo, {user?.name}
        </Typography>
      </Box>

      {/* Cards de estatísticas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total de Atividades
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              120
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Usuários Registrados
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              50
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Atividades Pendentes
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              5
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Área de gerenciamento */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Gerenciar Atividades
        </Typography>
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
