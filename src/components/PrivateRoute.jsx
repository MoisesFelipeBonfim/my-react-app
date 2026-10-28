import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children, navigate }) {
  const { signed } = useAuth();

  if (!signed) {
    // Redireciona para o login se não estiver autenticado
    navigate("/login");
    return null;
  }

  return children;
}
