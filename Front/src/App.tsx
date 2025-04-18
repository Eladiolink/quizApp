import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageUser from "./pages/Admin/Manage/Users/User";
import ManageActivities from "./pages/Admin/Manage/Activities/Activities";
import AddActivity from "./pages/Admin/Manage/Activities/AddActivity";
import ClientHome from "./pages/Client/Home";
// import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import ClientActivities from "./pages/Client/Activities/Activities";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="manage/users" element={<ManageUser />} />
            <Route path="manage/activities" element={<ManageActivities />} />
            <Route path="activities/create" element={<AddActivity />} />
          </Route>

          <Route
            path="/cliente"
            element={
              <PrivateRoute roles={["client"]}>
                <ClientHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/cliente/atividades"
            element={
              <PrivateRoute roles={["client"]}>
                <ClientActivities />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;