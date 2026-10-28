import { useState } from "react";
import { removeSpecialChars } from "../utils/formatters";

export function useTaskForm(setTasks) {
  const [formData, setFormData] = useState({
    madeira: "",
    date: "",
    localizacao: "",
    quantidade: "",
    preco: "",
    peso: "",
    description: "",
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      madeira: "",
      date: "",
      localizacao: "",
      quantidade: "",
      preco: "",
      peso: "",
      description: "",
    });
    setCurrentTask(null);
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "quantidade" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.madeira.trim()) {
      alert("Please provide a title");
      return;
    }

    const taskObj = {
      id: currentTask?.id || `${removeSpecialChars(formData.madeira).toLowerCase().split(" ").join("-")}-${Date.now()}`,
      madeira: removeSpecialChars(formData.madeira),
      date: formData.date,
      localizacao: formData.localizacao,
      quantidade: formData.quantidade,
      preco: formData.preco,
      peso: formData.peso,
      description: removeSpecialChars(formData.description),
    };

    if (currentTask) {
      setTasks((prev) => prev.map((task) => (task.id === currentTask.id ? taskObj : task)));
    } else {
      setTasks((prev) => [taskObj, ...prev]);
    }
    resetForm();
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setFormData({
      madeira: task.madeira,
      date: task.date,
      localizacao: task.localizacao,
      quantidade: task.quantidade,
      preco: task.preco,
      peso: task.peso,
      description: task.description,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    const formHasValues =
      formData.madeira ||
      formData.date ||
      formData.localizacao ||
      formData.quantidade ||
      formData.preco ||
      formData.peso ||
      formData.description;
    const formWasUpdated =
      formData.madeira !== (currentTask?.madeira || "") ||
      formData.date !== (currentTask?.date || "") ||
      formData.localizacao !== (currentTask?.localizacao || "") ||
      formData.quantidade !== (currentTask?.quantidade || "") ||
      formData.preco !== (currentTask?.preco || "") ||
      formData.peso !== (currentTask?.peso || "") ||
      formData.description !== (currentTask?.description || "");

    if (formHasValues && formWasUpdated) {
      setIsDialogOpen(true);
    } else {
      resetForm();
    }
  };

  const handleDiscard = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return {
    formData,
    currentTask,
    isFormOpen,
    setIsFormOpen,
    isDialogOpen,
    setIsDialogOpen,
    handleChange,
    handleSubmit,
    handleEditTask,
    handleCloseForm,
    handleDiscard,
    resetForm,
  };
}
