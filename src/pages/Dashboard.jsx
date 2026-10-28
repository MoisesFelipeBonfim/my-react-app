import { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import { formatCurrency } from "../utils/formatters";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import SellModal from "../components/SellModal";

import { useSellModal } from "../hooks/useSellModal";
import { useTaskForm } from "../hooks/useTaskForm";
import { useAuth } from "../hooks/useAuth";

import "../styles/App.css";
import "../styles/index.css";

export default function Dashboard() {
  const { logout, user } = useAuth(); // Pegamos o usuário logado e a função de sair
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("data")) || [];
  });
  const [search, setSearch] = useState("");

  // Instanciação dos Custom Hooks
  const sell = useSellModal();
  const taskForm = useTaskForm(setTasks);

  // Filtro e Paginação
  const filteredTasks = tasks.filter(
    (task) =>
      task.madeira.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      task.localizacao.toLowerCase().includes(search.toLowerCase()),
  );

  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTasks.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + cardsPerPage);

  const handleOpenSell = (task) => {
    taskForm.setIsFormOpen(false);
    taskForm.setIsDialogOpen(false);
    sell.handleOpenSell(task);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Cálculos de Venda
  const comprimento = Number(sell.sellComprimento) || 0;
  const largura = Number(sell.sellLargura) || 0;
  const metragemVendida = comprimento * largura;
  const precoMetroQuadrado = Number(sell.sellTask?.preco) || 0;
  const sellTotal = metragemVendida * precoMetroQuadrado;

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  /* Venda do produto */
  const handleSell = (e) => {
    e.preventDefault();
    if (!sell.sellTask) return;

    if (comprimento <= 0 || largura <= 0) {
      alert("Informe o comprimento e a largura da madeira.");
      return;
    }

    if (!sell.sellClient.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }

    /*if (!sell.sellPhone.trim()) {
      alert("Informe o telefone do cliente");
      return;
    }*/

    const quantidadeBaixa = sell.darBaixa ? Number(sell.sellQuantity) : 0;
    const estoqueAtual = Number(sell.sellTask.quantidade) || 0;
    const pesoAtual = Number(sell.sellTask.peso) || 0;
    const pesoBaixa = sell.darBaixaPeso ? Number(sell.sellPeso) : 0;

    if (sell.darBaixa) {
      if (quantidadeBaixa <= 0) {
        alert("Informe uma quantidade valida para a baixa.");
        return;
      }

      if (quantidadeBaixa > estoqueAtual) {
        alert(`Não é possivel dar baixa em ${quantidadeBaixa} chapas. O estoque possui apenas ${estoqueAtual}`);
        return;
      }
    }

    if (sell.darBaixaPeso) {
      if (!sell.sellTask.peso) {
        alert("Este estoque não possui peso cadastrado.");
        return;
      }

      if (pesoBaixa <= 0) {
        alert("Informe um peso valido para a baixa");
        return;
      }

      if (pesoBaixa > pesoAtual) {
        alert(
          `Não é possível dar baixa em ${pesoBaixa.toFixed(2)} kg. O estoque possui apenas ${pesoAtual.toFixed(2)} kg.`,
        );
        return;
      }
    }

    if (sell.darBaixa || sell.darBaixaPeso) {
      setTasks((prev) =>
        prev
          .map((task) => {
            if (task.id !== sell.sellTask.id) return task;

            const novaQuantidade = sell.darBaixa ? estoqueAtual - quantidadeBaixa : estoqueAtual;
            const novoPeso = sell.darBaixaPeso ? pesoAtual - pesoBaixa : task.peso;

            return {
              ...task,
              quantidade: novaQuantidade,
              peso: novoPeso,
            };
          })
          .filter((task) => Number(task.quantidade) > 0),
      );
    }

    console.log("VENDA REALIZADA", {
      produto: sell.sellTask.madeira,
      comprimento,
      largura,
      metragemVendida,
      valorMetroQuadrado: precoMetroQuadrado,
      total: sellTotal,
      cliente: sell.sellClient,
      telefone: sell.sellPhone,
      pagamento: sell.sellPayment,
      darBaixa: sell.darBaixa,
      quantidadeBaixa,
      darBaixaPeso: sell.darBaixaPeso,
      pesoBaixa,
    });

    alert(`Venda realizada!\n\nTotal: ${formatCurrency(sellTotal)}`);
    sell.closeSellModal();
  };

  return (
    <main>
      <div className="dashboard-header">
        <h1>Estoque</h1>

        <div className="user-info">
          <span>
            Vendedor: <strong>{(user?.name || user?.email || "Usuário").toUpperCase()}</strong>
          </span>

          <button className="btn logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
      <div className="todo-app">
        <button className="btn large-btn" onClick={() => taskForm.setIsFormOpen(true)}>
          Adicionar madeira
        </button>

        <TaskForm
          isFormOpen={taskForm.isFormOpen}
          currentTask={taskForm.currentTask}
          formData={taskForm.formData}
          handleSubmit={taskForm.handleSubmit}
          handleChange={taskForm.handleChange}
          handleCloseForm={taskForm.handleCloseForm}
        />

        {taskForm.isDialogOpen && (
          <dialog open>
            <p>Discard unseved changes?</p>
            <button onClick={() => taskForm.setIsDialogOpen(false)}>Cancel</button>
            <button onClick={taskForm.handleDiscard}>Discard</button>
          </dialog>
        )}
      </div>

      <SellModal
        isSellOpen={sell.isSellOpen}
        sellTask={sell.sellTask}
        sellComprimento={sell.sellComprimento}
        setSellComprimento={sell.setSellComprimento}
        sellLargura={sell.sellLargura}
        setSellLargura={sell.setSellLargura}
        metragemVendida={metragemVendida}
        precoMetroQuadrado={precoMetroQuadrado}
        sellTotal={sellTotal}
        sellClient={sell.sellClient}
        setSellClient={sell.setSellClient}
        sellPhone={sell.sellPhone}
        setSellPhone={sell.setSellPhone}
        sellPayment={sell.sellPayment}
        setSellPayment={sell.setSellPayment}
        darBaixa={sell.darBaixa}
        setDarBaixa={sell.setDarBaixa}
        sellQuantity={sell.sellQuantity}
        setSellQuantity={sell.setSellQuantity}
        darBaixaPeso={sell.darBaixaPeso}
        setDarBaixaPeso={sell.setDarBaixaPeso}
        sellPeso={sell.sellPeso}
        setSellPeso={sell.setSellPeso}
        handleSell={handleSell}
        closeSellModal={sell.closeSellModal}
      />

      <div className="afterTheFooter">
        <div className="records-header">
          <h2>
            Registros <span>({filteredTasks.length})</span>
          </h2>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="tasks-container cards-grid">
          {paginatedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleOpenSell={handleOpenSell}
              handleEditTask={taskForm.handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </main>
  );
}
