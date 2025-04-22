import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = { token: string|null; role: "ADMIN" | "CLIENTE" };
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role && (role === "ADMIN" || role === "CLIENTE")) {
      setUser({
        token: token || null,
        role: role as "ADMIN" | "CLIENTE",
      });
    }

    setLoading(false); 
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if(userData.token != null)
    {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userData.role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
