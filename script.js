const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

/* Verificação se o input está vazio */
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    alert("Preencha o campo com uma tarefa");
    inputElement.placeholder = "Digite aqui a tarefa";
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  /* Adiciona evento de completar tarefa */
  taskContent.addEventListener("click", () => handleClick(taskContent));

  /* Ícone de exclusão */
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far", "fa-trash-alt");
  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage(); // Salvar no LocalStorage após adicionar
};

const handleClick = (taskContent) => {
  taskContent.classList.toggle("completed");
  updateLocalStorage(); // Atualiza o LocalStorage ao marcar/desmarcar tarefa
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  taskItemContainer.remove();
  updateLocalStorage(); // Atualiza o LocalStorage após remover tarefa
};

/* Função para salvar as tarefas no LocalStorage */
const updateLocalStorage = () => {
  const tasks = [...tasksContainer.children].map((task) => {
    return {
      description: task.querySelector("p").innerText,
      isCompleted: task.querySelector("p").classList.contains("completed"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/* Carregar tarefas do LocalStorage */
const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

  tasksFromLocalStorage.forEach((task) => {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt");
    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  });
};

/* Função para remover erro do input ao digitar */
const handleInputChange = () => {
  inputElement.classList.remove("error");
  inputElement.placeholder = "";
};

refreshTasksUsingLocalStorage();

/* Eventos */
addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("input", handleInputChange);
