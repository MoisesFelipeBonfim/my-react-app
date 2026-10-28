import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/Login.css";

export default function Login({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    //Essa linha limpa a mensagem de erro anterior, deixando o estado error como uma string vazia, para a proxima possivel mensagem de erro.

    try {
      //tente executar o código dentro deste bloco.
      login(email, password); //tente fazer o login com o e-mail e a senha informados.
      navigate("/"); //se o login terminar sem lançar um erro, execute a navegação para a página inicial.
    } catch (err) {
      //se alguma instrução dentro do try lançar um erro, o fluxo vai para o catch.
      setError(err.message); //coloca a mensagem do erro no estado para que ela possa aparecer na tela.
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Gilton Marcenaria</h1>
        <p>Login</p>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p>
          Não possui uma conta?{" "}
          <a
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
