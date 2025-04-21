import { Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/Dashboard";
import ManageUser from "../pages/Admin/Manage/Users/User";
import ManageActivities from "../pages/Admin/Manage/Activities/Activities";
import AddActivity from "../pages/Admin/Manage/Activities/AddActivity";
import { PrivateRoute } from "./PrivateRoute";

export const AdminRoutes = (
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
);
