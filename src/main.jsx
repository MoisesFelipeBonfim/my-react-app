import { StrictMode } from "react"; //ferramenta que ajuda a identificar possíveis problemas durante o desenvolvimento. principalmente com o uso do useEfect, ou seja a cada refresh ele busca possiveis erros
import { createRoot } from "react-dom/client"; //É a função que permite ao React controlar uma parte da página HTML. //ex:A função createRoot prepara a div com id="root" para que o React possa exibir e controlar os componentes da aplicação.
import { AuthProvider } from "./context/AuthContext"; //Você está importando o AuthProvider, que é responsável por disponibilizar as informações e funções de autenticação aos componentes que estiverem dentro dele.
//Pense no AuthProvider como uma estrutura que disponibiliza essas informações para os componentes descendentes, sem que você precise passar cada informação manualmente de componente em componente.
import App from "./App.jsx"; //Você importa o componente principal da aplicação (App.jsx), responsável por organizar as páginas, verificar a rota atual e definir o que será exibido na tela.
import "./styles/index.css"; //Essa linha importa o arquivo de estilos globais do projeto.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
//main.jsx: é o ponto de entrada que conecta a aplicação React ao HTML e inicia a renderização dos componentes na página.
//Renderização é o processo de transformar os componentes React em elementos visíveis na tela do navegador.
