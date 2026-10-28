import { useState } from "react";

export function useSellModal() {
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [sellTask, setSellTask] = useState(null);
  const [sellComprimento, setSellComprimento] = useState("");
  const [sellLargura, setSellLargura] = useState("");
  const [sellClient, setSellClient] = useState("");
  const [sellPhone, setSellPhone] = useState("");
  const [sellPayment, setSellPayment] = useState("pago");
  const [darBaixa, setDarBaixa] = useState(false);
  const [darBaixaPeso, setDarBaixaPeso] = useState(false);
  const [sellPeso, setSellPeso] = useState("");
  const [sellQuantity, setSellQuantity] = useState("1");

  const handleOpenSell = (task) => {
    setSellTask(task);

    setSellComprimento("");
    setSellLargura("");

    setSellClient("");
    setSellPhone("");

    setSellPayment("pago");

    setDarBaixa(false);

    setDarBaixaPeso(false);
    setSellPeso("");

    setSellQuantity("1");

    setIsSellOpen(true);
  };

  const closeSellModal = () => {
    setIsSellOpen(false);

    setSellTask(null);

    setSellComprimento("");
    setSellLargura("");

    setSellClient("");
    setSellPhone("");

    setSellPayment("pago");

    setDarBaixa(false);

    setDarBaixaPeso(false);
    setSellPeso("");

    setSellQuantity("1");
  };

  return {
    isSellOpen,
    setIsSellOpen,
    sellTask,
    setSellTask,
    sellComprimento,
    setSellComprimento,
    sellLargura,
    setSellLargura,
    sellClient,
    setSellClient,
    sellPhone,
    setSellPhone,
    sellPayment,
    setSellPayment,
    darBaixa,
    setDarBaixa,
    darBaixaPeso,
    setDarBaixaPeso,
    sellPeso,
    setSellPeso,
    sellQuantity,
    setSellQuantity,
    handleOpenSell,
    closeSellModal,
  };
}
