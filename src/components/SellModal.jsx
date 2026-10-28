import React from "react";
import { formatCurrency } from "../utils/formatters";

export default function SellModal({
  isSellOpen,
  sellTask,
  sellComprimento,
  setSellComprimento,
  sellLargura,
  setSellLargura,
  metragemVendida,
  precoMetroQuadrado,
  sellTotal,
  sellClient,
  setSellClient,
  sellPhone,
  setSellPhone,
  sellPayment,
  setSellPayment,
  darBaixa,
  setDarBaixa,
  sellQuantity,
  setSellQuantity,
  darBaixaPeso,
  setDarBaixaPeso,
  sellPeso,
  setSellPeso,
  handleSell,
  closeSellModal,
}) {
  if (!isSellOpen && !sellTask) return null;

  return (
    <div className="modal-venda-overlay">
      <form className="form-venda" onSubmit={handleSell}>
        <div className="container-body">
          <div className="form-grupo">
            <label>Produto</label>
            <div className="produto-a-serVendido">{sellTask.madeira}</div>
          </div>

          <div className="venda-row">
            <div className="form-grupo">
              <label>Estoque disponivel</label>
              <div className="venda-estoque">{sellTask.quantidade || 0}</div>
            </div>

            {sellTask.peso && Number(sellTask.peso) > 0 && (
              <div className="form-grupo">
                <label>Peso total</label>
                <div className="venda-estoque">{Number(sellTask.peso).toFixed(2)} kg</div>
              </div>
            )}

            <div className="form-grupo">
              <label>Comprimento (m)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 1.50"
                value={sellComprimento}
                onChange={(e) => setSellComprimento(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Largura (m)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex.: 0.90"
                value={sellLargura}
                onChange={(e) => setSellLargura(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <div className="venda-valores">
                <span>Metragem vendida: </span>
                <strong>{metragemVendida.toFixed(2)} m²</strong>

                <span>Valor do m² </span>
                <strong>{formatCurrency(precoMetroQuadrado)}</strong>

                <span>Total da venda </span>
                <strong>{formatCurrency(sellTotal)}</strong>
              </div>
            </div>

            <div className="form-grupo">
              <label>Cliente</label>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={sellClient}
                onChange={(e) => setSellClient(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Telefone do cliente</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={sellPhone}
                onChange={(e) => setSellPhone(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Status do pagamento</label>
              <select
                className={sellPayment === "pago" ? "pagamento-pago" : "pagamento-pendente"}
                value={sellPayment}
                onChange={(e) => setSellPayment(e.target.value)}
              >
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>

            <div className="form-grupo">
              <label className="baixa">Baixa de chapas</label>

              <select
                className="baixaSelect"
                value={darBaixa ? "sim" : "nao"}
                onChange={(e) => setDarBaixa(e.target.value === "sim")}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>

              {darBaixa && (
                <>
                  <h3 className="subTitulo">Unidade:</h3>

                  <input
                    className="classEscolha"
                    type="number"
                    min="1"
                    max={Number(sellTask.quantidade) || 0}
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(e.target.value)}
                  />
                </>
              )}
            </div>
            {sellTask.peso && Number(sellTask.peso) > 0 && (
              <div className="form-grupo">
                <label>Baixa de peso</label>
                <select
                  className="baixaSelect"
                  value={darBaixaPeso ? "sim" : "nao"}
                  onChange={(e) => setDarBaixaPeso(e.target.value === "sim")}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>

                {darBaixaPeso && (
                  <>
                    <h3 className="subTitulo">Peso (Kg): </h3>
                    <input
                      type="number"
                      className="classEscolha"
                      min="0.01"
                      max={Number(sellTask.peso) || 0}
                      step="0.01"
                      placeholder="Ex.: 10.50"
                      value={sellPeso}
                      onChange={(e) => setSellPeso(e.target.value)}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="container-footer">
          <button type="button" className="cancelar-botao" onClick={closeSellModal}>
            Cancelar
          </button>
          <button type="submit" className="vender-botao">
            Vender
          </button>
        </div>
      </form>
    </div>
  );
}
