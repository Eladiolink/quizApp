import { Route } from "react-router-dom";
import ClientActivities from "../pages/Client/Activities/Activities";
import { PrivateRoute } from "./PrivateRoute";
import ClientLayout from "../pages/Client/ClientLayout";
import ClientHome from "../pages/Client/Home";
import ActivityQuestionPage from "../pages/Client/Activities/ActivityQuestionPage";
import ActivityResultPage from "../pages/Client/Activities/ActivityResultPage";

export const ClientRoutes = (
  <Route
    path="/cliente"
    element={
      <PrivateRoute roles={["CLIENTE"]}>
        <ClientLayout />
      </PrivateRoute>
    }
  >
    <Route
      index
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ClientHome />
        </PrivateRoute>
      }
    />
    <Route
      path="atividades"
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ClientActivities />
        </PrivateRoute>
      }
    />

    <Route
      path="/cliente/atividade/:id"
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ActivityQuestionPage />
        </PrivateRoute>
      }
    />

<Route
      path="/cliente/result/:activityId/user/:userId"
      element={
        <PrivateRoute roles={["CLIENTE"]}>
          <ActivityResultPage />
        </PrivateRoute>
      }
    />
  </Route>
);