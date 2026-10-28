import React from "react";

export default function TaskForm({ isFormOpen, currentTask, formData, handleSubmit, handleCloseForm, handleChange }) {
  if (!isFormOpen) return null;

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-header">
        <button type="button" className="close-task-form-btn" onClick={handleCloseForm}>
          ✕
        </button>
      </div>
      <div className="task-form-body">
        <h2>Novo registro</h2>
        <div className="form-group">
          <label>Tipo de madeira</label>
          <input name="madeira" value={formData.madeira} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Localização</label>
          <input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} placeholder="A1" />
        </div>

        <div className="form-group">
          <label>Quantidade de chapas</label>
          <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Valor do m² R$:</label>
          <input type="number" name="preco" step="0.01" value={formData.preco} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Peso total (kg) </label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="peso"
            placeholder="125.50"
            value={formData.peso}
            onChange={handleChange}
          />
        </div>

        <div className="form-group description">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
      </div>
      <div className="task-form-footer">
        <button className="btn large-btn" type="submit">
          {currentTask ? "Editar" : "Adicionar madeira"}
        </button>
      </div>
    </form>
  );
}
