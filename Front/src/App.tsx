import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminRoutes } from "./routes/AdminRoutes";
import { ClientRoutes } from "./routes/ClientRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          {/* Admin and Client Routes */}
          {AdminRoutes}
          {ClientRoutes}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
