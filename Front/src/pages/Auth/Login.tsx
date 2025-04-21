import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleLogin = (role: "admin" | "client") => {
    login({ name: "Usuário", role });
    navigate(role === "admin" ? "/admin" : "/cliente");
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="background.default"
        color="text.primary"
        padding={2}
      >
        <Box position="absolute" top={16} right={16}>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Paper elevation={3} sx={{ padding: 4, minWidth: 300 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Login
          </Typography>

          <Stack spacing={2} mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>

          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogin("admin")}
              fullWidth
            >
              Entrar como Admin
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleLogin("client")}
              fullWidth
            >
              Entrar como Cliente
            </Button>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
