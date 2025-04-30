import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Dashboard,
  Assignment,
  People,
  Brightness4,
  Brightness7,
  Menu,
  ExitToApp,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";

export default function AdminLayout() {
  const { logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });
  
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
          main: "#1976d2",
        },
      },
    }), [darkMode]
  );
  

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const [compactSidebar, setCompactSidebar] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setCompactSidebar((prev) => !prev);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Drawer
        variant="permanent"
        sx={{
          width: compactSidebar ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: compactSidebar ? 80 : 240,
            backgroundColor: darkMode ? "#333" : "#2c3e50",
            color: "white",
            padding: 2,
            transition: "width 0.3s ease",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: compactSidebar ? "hidden" : "auto",
            overflowX: "hidden",
          },
        }}
      >
        <Typography
          variant="h4"
          className="mb-8"
          sx={{
            fontWeight: "bold",
            display: compactSidebar ? "none" : "block",
          }}
        >
          Admin
        </Typography>

        <List>
          <ListItem button component={Link} to="/admin">
            <Dashboard sx={{ marginRight: 1 }} />
            <ListItemText primary={compactSidebar ? "" : "Dashboard"} sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage/activities">
            <Assignment sx={{ marginRight: 1 }} />
            <ListItemText primary={compactSidebar ? "" : "Atividades"} sx={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage/users">
            <People sx={{ marginRight: 1 }} />
            <ListItemText primary={compactSidebar ? "" : "Usuários"} sx={{ color: "white" }} />
          </ListItem>
        </List>

        {/* Sair (Somente Ícone) */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}>
          <Tooltip title="Sair">
            <IconButton onClick={logout} color="error">
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        {/* Sidebar Toggle Button */}
        <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={toggleSidebar} color="inherit">
            <Menu />
          </IconButton>
        </div>
      </Drawer>
      
      <ThemeProvider theme={theme}>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
      </ThemeProvider>
    </div>
  );
}
