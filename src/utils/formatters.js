export const formatCurrency = (value) => {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const removeSpecialChars = (value) => {
  return value.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};
