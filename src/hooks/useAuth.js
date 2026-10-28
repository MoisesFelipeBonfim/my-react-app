import { useContext } from "react"; /*O useContext é uma ferramenta do React que permite pegar essas informações que estão dentro do Contexto.*/
import { AuthContext } from "../context/AuthContext"; //Foi criado

export function useAuth() {
  const context = useContext(AuthContext); //"React, me dê o conteúdo que está dentro do AuthContext."
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  } //"Você está tentando usar autenticação em um lugar onde o AuthProvider não existe."
  return context;
}
/* 
Esse é o custom hook useAuth. Ele funciona como um "atalho inteligente" para você não precisar repetir código em todas as páginas da aplicação.
*/
