import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname); //essa linha guarda o caminho atual da URL do navegador e permite atualizá-lo para controlar qual página será exibida no React.
  const { signed } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      //A função handlePopState serve para atualizar o currentPath quando o usuário usa as setas de voltar ou avançar do navegador.
      setCurrentPath(window.location.pathname); //window.location.pathname Ele é responsável por consultar qual caminho está no endereço do navegador naquele momento,ex: Login, Cadastro ou Dashboard
    };
    //O window é o objeto global que representa a janela ou aba atual do navegador.(abas, o histórico, os botões, o documento HTML e a URL)

    //O window.location armazena todas as informações da URL atual, como protocolo, domínio, porta e caminho.

    //O pathname é uma propriedade do location que retorna especificamente o caminho da URL (como /login).

    window.addEventListener("popstate", handlePopState);
    //O popstate é o evento disparado ao navegar pelo histórico (botões "Voltar" ou "Avançar"). Ele não é acionado por simples mudanças na URL, como o uso de history.pushState().

    /*Sim, se você quer escutar especificamente esse evento do navegador, precisa usar o nome "popstate".

O navegador já conhece esse evento. Ele é disparado quando o usuário navega pelo histórico, por exemplo, usando as setas Voltar e Avançar.*/

    //handlePopState Essa função consulta o caminho atual do navegador e atualiza o estado currentPath do React.

    //"Navegador, quando ocorrer um evento popstate, execute a função handlePopState."
    return () => {
      window.removeEventListener("popstate", handlePopState);
    }; //A principal ideia é: remover o evento que foi registrado anteriormente, para que ele não continue sendo escutado quando não for mais necessário.
  }, []); //O array vazio [] indica que o efeito não possui dependências, executando apenas na montagem e limpando na desmontagem do componente.

  const navigate = (path) => {
    //O path é um parâmetro que receberá o caminho para onde você deseja navegar.
    /*O objetivo dessa função é permitir que você navegue entre as páginas do aplicativo sem recarregar a página inteira.
    
    ex:
    Tradicional: Cada página é um arquivo HTML separado; mudar de link recarrega a página inteira do servidor (com aquela "piscada" na tela).
    ex atual:
    SPA (React): Carrega um único HTML no início. Ao mudar de rota, o JavaScript troca os componentes instantaneamente, sem recarregar a página ou buscar novos arquivos no servidor.*/
    window.history.pushState({}, "", path);
    //O window.history gerencia o histórico de navegação da aba, controlando a lista de páginas visitadas e as setas "Voltar" e "Avançar".

    //O pushState é um método do history que adiciona um novo registro ao histórico de navegação e atualiza a URL na barra de endereços sem recarregar a página.

    /*
    O pushState(state, title, path) recebe três argumentos:

{} (State): Objeto para guardar dados extras associados ao histórico (geralmente passado vazio).

"" (Title): Título da página (hoje em dia ignorado pela maioria dos navegadores).

path: O novo endereço (ex: "/login") que atualiza a URL na barra de endereços sem recarregar a página.
*/
    //“Adiciona uma nova entrada ao histórico de navegação do navegador, alterando a URL para o caminho indicado em path, sem recarregar a página.”
    setCurrentPath(path);
    //“Atualiza o estado currentPath com o novo caminho indicado em path, fazendo o React atualizar a tela conforme a rota atual.”
  };

  useEffect(() => {
    //useEffect -> No seu projeto, ele está sendo usado para verificar se o usuário está logado e em qual página ele está.
    if (signed && (currentPath === "/login" || currentPath === "/register")) {
      navigate("/"); //Isso direciona o usuário para a página inicial do aplicativo, que no seu projeto exibe o Dashboard.
    }
    /*
    signed: indica se o usuário está autenticado.
&&: significa E. As duas condições precisam ser verdadeiras.
currentPath === "/login": verifica se o usuário está na página de login.
||: significa OU.
currentPath === "/register": verifica se o usuário está na página de cadastro.
*/
  }, [signed, currentPath]); //Esse array é chamado de array de dependências.
  /*
  Ele informa ao React que o efeito precisa ser executado novamente quando signed ou currentPath mudar.

Por exemplo:
1. O usuário está na página /login.
2. Ele faz login com sucesso e signed passa a ser true.
3. O efeito verifica novamente a condição.
4. Como o usuário está autenticado e ainda está em /login, executa navigate("/").
Em uma frase: esse useEffect impede que um usuário já autenticado permaneça nas páginas de login ou cadastro.
*/

  const renderPage = () => {
    //A função serve para decidir qual componente deve ser exibido de acordo com o valor de currentPath.
    switch (
      currentPath //O switch verifica o valor de uma variável e permite escolher entre diferentes possibilidades.
    ) {
      case "/login":
        return <Login navigate={navigate} />;

      case "/register":
        return <Register navigate={navigate} />;

      default:
        return (
          <PrivateRoute navigate={navigate}>
            <Dashboard navigate={navigate} />
          </PrivateRoute>
        );
      /*
        O default é a opção usada quando nenhum dos case anteriores corresponde ao valor de currentPath.

No seu código, isso significa que, para qualquer caminho diferente de /login e /register, o aplicativo tenta exibir o Dashboard, protegido pelo componente PrivateRoute.

O PrivateRoute verifica a autenticação antes de permitir o acesso ao Dashboard.

Em uma frase: renderPage escolhe qual página exibir com base no caminho atual da aplicação.
*/
    }
  };

  return <div className="app-container">{renderPage()}</div>;

  /*
  return: define o que o componente App devolve para o React exibir.



<div className="app-container">: cria um elemento HTML que funciona como contêiner da aplicação.



{renderPage()}: chama a função renderPage e coloca o componente retornado por ela dentro desse contêiner.



className="app-container": associa uma classe CSS ao elemento.

Observe os parênteses em renderPage().

Eles indicam que a função está sendo executada, e não apenas mencionada.

Por exemplo, se currentPath for /login, o resultado será equivalente a:
return (
  <div className="app-container">
    <Login navigate={navigate} />
  </div>
);


Se currentPath for /register, será exibido o componente Register. Nos demais caminhos, será usado o PrivateRoute envolvendo o Dashboard.
*/
}

/*============================================================================================= */
/*
assets: Guarda arquivos estáticos e de mídia, como imagens, ícones e SVGs.                        

components: Armazena os pedaços reutilizáveis de interface visual (botões, cards, modais e formulários).

hooks: Isola a lógica, os estados e as regras de negócio em funções customizadas do React.        
                                                                                                  
styles: Centraliza os arquivos de estilização (CSS) de cada tela e da aplicação.                  
                                                                                                  
utils: Guarda funções utilitárias e auxiliares puras, como formatadores de dados e validadores.   
                                                                                                  
                                                                                                  
/*============================================================================================== */

/*
“A página App controla a navegação do aplicativo, identifica a rota atual, exibe o componente correspondente, atualiza a navegação quando o usuário usa os botões Voltar e Avançar do navegador e redireciona usuários já autenticados para o Dashboard quando tentam acessar o login ou o cadastro.”

Em termos mais simples: o App.jsx funciona como o controlador principal da navegação do seu aplicativo, decidindo qual página mostrar e quando redirecionar o usuário.
*/
