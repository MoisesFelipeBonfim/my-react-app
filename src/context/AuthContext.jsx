import { createContext, useState, useEffect } from "react";
/*createContext({}): O React por padrão passa dados de cima para baixo (de pai para filho via props). O Contexto cria uma "nuvem" de dados acessível por qualquer componente da aplicação sem precisar passar props manualmente. */

export const AuthContext = createContext({});
/* export const AuthContext: Exportamos essa marcação para que os outros arquivos saibam de onde solicitar os dados de autenticação.*/

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("@App:user");
    return storedUser ? JSON.parse(storedUser) : null;
    //Se storedUser existir, transforme-o de texto para objeto. Se não existir, coloque null.
  });
  /*useState(() => { ... }): Passar uma função dentro do useState garante que a leitura do localStorage aconteça apenas uma vez, quando a aplicação carrega (evitando lentidão ao re-renderizar).

localStorage.getItem("@App:user"): O prefixo @App: é uma boa prática para evitar conflitos de nomes no navegador com outros sites.

JSON.parse(...): O localStorage grava apenas texto (strings). O JSON.parse converte o texto salvo de volta para um objeto JavaScript. Se não houver usuário salvo, o estado inicial será null. */
  //// Registo de novo utilizador
  const registerUser = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("@App:registered_users")) || []; //"Pegue os usuários cadastrados no localStorage, transforme o texto em um array JavaScript e, se ainda não houver usuários cadastrados, comece com um array vazio."

    const userExists = users.some((u) => u.email === email); //"Existe algum usuário no array cujo e-mail seja igual ao e-mail que estou tentando cadastrar?"

    if (userExists) {
      throw new Error("E-mail já cadastrado!");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser); //O .push() simplesmente adiciona um elemento ao final do array.

    localStorage.setItem("@App:registered_users", JSON.stringify(users)); //"Salve essa string no localStorage usando @App:registered_users como nome da chave."
  };
  /*------------------------------------------------------------------------------*/
  // Autenticação / Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("@App:registered_users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
    setUser(userData);
    localStorage.setItem("@App:user", JSON.stringify(userData));
  };
  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("@App:user");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
  /*
  O Provider está dizendo:
"Tudo que estiver dentro de mim poderá acessar estas informações."*/

  /*E quais informações?
value={{
  user,
  signed: !!user,
  login,
  registerUser,
  logout
}}*/

  /*Então você pode pensar em !! como:
"Transforme isso em verdadeiro ou falso."*/
}

/*Componente Provedor: É um componente React comum que vai embrulhar toda a sua aplicação.

children: Representa todos os componentes filhos que ficarem dentro do <AuthProvider>...</AuthProvider> no seu main.jsx ou App.jsx.*/
