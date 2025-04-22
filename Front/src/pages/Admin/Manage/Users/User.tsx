import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../../../services/userService";
import { UserResponseDTO } from "../../../../interfaces/User";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "client";
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
   const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO[]>([]);
    
      useEffect(() => {
        async function fetchActivities() {
          try {
            const data = await getUsers();
            setUserResponseDTO(data);
          } catch (err) {
            console.error('Erro ao buscar usuarios:', err);
          }
        }
    
        fetchActivities();
      }, []);

  const handleDelete = (id: number) => {
    // Lógica para excluir usuário
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Usuários</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Papel</th>
            <th className="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userResponseDTO.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.type}</td>
              <td className="py-3 px-4">
                <Link to={`/admin/users/edit/${user.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Link to="/admin/users/create" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Adicionar Novo Usuário
        </Link>
      </div>
    </div>
  );
}
