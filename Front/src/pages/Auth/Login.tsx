import { useState, useEffect } from "react";
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
import { AuthLogin } from "../../interfaces/Auth";
import { authLogin } from "../../services/authService";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Estado inicial com localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // 2. Atualiza o localStorage sempre que darkMode mudar
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleLogin = () => {
    const activityRequest: AuthLogin = {
      email: email,
      password: password,
    };

    authLogin(activityRequest).then(res => {
      const storedRole = localStorage.getItem("role");
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        let role: "ADMIN" | "CLIENTE" =
          storedRole === "ADMIN" || storedRole === "CLIENTE"
            ? storedRole
            : "CLIENTE";

        let token: string | null = storedToken;

        login({ token: token, role: role });
        navigate(role === "ADMIN" ? "/admin" : "/cliente");
      }
    });
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
              onClick={() => handleLogin()}
              fullWidth
            >
              Entrar
            </Button>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
