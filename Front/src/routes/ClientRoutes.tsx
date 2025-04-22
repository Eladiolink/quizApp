import { Route } from "react-router-dom";
import ClientHome from "../pages/Client/Home";
import ClientActivities from "../pages/Client/Activities/Activities";
import { PrivateRoute } from "./PrivateRoute";

export const ClientRoutes = (
  <>
    <Route
      path="/cliente"
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ClientHome />
        </PrivateRoute>
      }
    />
    <Route
      path="/cliente/atividades"
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ClientActivities />
        </PrivateRoute>
      }
    />
  </>
);
