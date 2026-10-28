import React from "react";
//Isso mesmo. import React from "react"; serve para trazer o objeto React — a "caixa de ferramentas" — para dentro do arquivo, para que você possa acessar as ferramentas do React escrevendo React.alguma_coisa.
import { formatCurrency } from "../utils/formatters";

export default function TaskCard({ task, handleOpenSell, handleEditTask, handleDeleteTask }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-main-info">
          <h3 className="card-title">{task.madeira}</h3>
          <p className="card-description">{task.description}</p>
        </div>
        <div className="card-quantity">
          <span className="qty-number">{task.quantidade || 0}</span>
          <span className="qty-label">QTD.</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-meta">
          {task.localizacao && <span>📍 {task.localizacao}</span>}
          {task.date && <span>📅 {task.date}</span>}
          {task.preco && <span>💰 {formatCurrency(task.preco)}</span>}
          {task.peso && <span>⚖️ {task.peso} kg</span>}
        </div>
        <div className="card-actions">
          <button className="btn-action sell" onClick={() => handleOpenSell(task)}>
            💰 Vender
          </button>
          <button className="btn-action edit" onClick={() => handleEditTask(task)}>
            ✏️ Editar
          </button>
          <button className="btn-action delete" onClick={() => handleDeleteTask(task.id)}>
            🗑️ Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
