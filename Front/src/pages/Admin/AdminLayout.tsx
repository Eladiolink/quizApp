import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Drawer, List, ListItem, ListItemText, Button, Typography, IconButton, Switch } from "@mui/material";
import { Dashboard, Assignment, People, Brightness4, Brightness7, Menu, ExitToApp } from "@mui/icons-material";
import { useState } from "react";

export default function AdminLayout() {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false); // Para controlar o tema
  const [compactSidebar, setCompactSidebar] = useState(false); // Para controlar a largura da sidebar

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setCompactSidebar(!compactSidebar);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Sidebar */}
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
            height: "100%", // Garantir que a sidebar ocupe toda a altura da tela
            overflowY: compactSidebar ? "hidden" : "auto", // Remover a rolagem quando compacta
            overflowX: "hidden", // Evitar a barra de rolagem no eixo X
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

        <Button
          onClick={logout}
          variant="contained"
          color="error"
          sx={{
            width: "100%",
            marginTop: "auto", // Posiciona o botão no final da sidebar
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {compactSidebar ? (
            <ExitToApp sx={{ color: "white" }} />
          ) : (
            "Sair"
          )}
        </Button>

        {/* Dark Mode Switch */}
        <div className="mt-4">
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>

        {/* Sidebar Toggle Button */}
        <div className="mt-4">
          <IconButton onClick={toggleSidebar} color="inherit">
            <Menu />
          </IconButton>
        </div>
      </Drawer>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
