import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Brightness4, Brightness7, ExitToApp } from "@mui/icons-material";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ClientLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 1. Inicializar com valor do localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });

  // 2. Salvar no localStorage ao mudar
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/cliente")}
            sx={{ cursor: "pointer" }}
          >
            Bem-vindo, {localStorage.getItem("name")?.split(" ")[0] || "Usuário"}
          </Typography>

          <div>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              sx={{ ml: 2 }}
            >
              Sair
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
