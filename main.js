let newToDo = document.querySelector(".todo_name");
let addToDo = document.querySelector(".add_todo");
let todo_wrapper = document.querySelector(".wrapper");
let mode = document.querySelector(".mode");
let todo = [];

addToDo.addEventListener("click", () => {
  if (newToDo.value != "") {
    todo.push(newToDo.value);

    let newToDo_list = document.createElement("li");
    newToDo_list.className = "item drag-item";
    newToDo_list.draggable = "true";

    for (let i = 0; i < todo.length; i++) {
      newToDo_list.innerText = newToDo.value;
      todo_wrapper.appendChild(newToDo_list);
    }
    if (todo.length > 0) {
      let item = document.querySelectorAll(".item");
      for (let j = 0; j < item.length; j++) {
        let delete_todo = document.createElement("li");
        delete_todo.className = "delete";
        delete_todo.innerText = "X";
        item[j].appendChild(delete_todo);

        delete_todo.addEventListener("click", () => {
          todo_wrapper.removeChild(item[j]);
        });
      }
    }
    newToDo.value = "";
  }
});

mode.addEventListener("click", () => {
  let isBlackMode = document.body.classList.contains("black-bg");

  if (isBlackMode) {
    document.body.classList.remove("black-bg");
    mode.innerHTML = "☀️";
  } else {
    document.body.classList.add("black-bg");
    mode.innerHTML = "🌙";
  }
});

const dragList = document.getElementById("dragList");
let draggedItem = null;

dragList.addEventListener("dragstart", function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  event.target.style.opacity = "0.5";
});

dragList.addEventListener("dragover", function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  const targetItem = event.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("drag-item")
  ) {
    const boundingRect = targetItem.getBoundingClientRect();
  }
});

dragList.addEventListener("drop", function handleDrop(event) {
  event.preventDefault();
  const targetItem = event.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("drag-item")
  ) {
    if (
      event.clientY >
      targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
    ) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }
  targetItem.style.borderTop = "";
  targetItem.style.borderBottom = "";
  draggedItem.style.opacity = "";
  draggedItem = null;
});
