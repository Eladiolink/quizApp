import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ children, roles }: any) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};