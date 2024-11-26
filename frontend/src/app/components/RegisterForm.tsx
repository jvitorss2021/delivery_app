import { useState } from "react";
import { api } from "../../lib/axios";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("Registro bem-sucedido!");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
