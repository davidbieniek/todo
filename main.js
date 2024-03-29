let newToDo = document.querySelector(".todo_name");
let addToDo = document.querySelector(".add_todo");
let todo_wrapper = document.querySelector(".wrapper");
let mode = document.querySelector(".mode");
let todo = [];
let draggedItem = null;

addToDo.addEventListener("click", () => {
  if (newToDo.value != "") {
    todo.push(newToDo.value);

    let newToDo_list = document.createElement("li");
    newToDo_list.className = "item drag-item";
    newToDo_list.draggable = "true";
    newToDo_list.innerText = newToDo.value;
    todo_wrapper.appendChild(newToDo_list);

    let delete_todo = document.createElement("li");
    delete_todo.className = "delete";
    delete_todo.innerText = "X";
    newToDo_list.appendChild(delete_todo);

    delete_todo.addEventListener("click", () => {
      todo_wrapper.removeChild(newToDo_list);
    });

    let done_todo = document.createElement("li");
    done_todo.className = "done";
    done_todo.innerText = "✓";
    newToDo_list.appendChild(done_todo);

    done_todo.addEventListener("click", () => {
      let isLineThrough = newToDo_list.classList.contains("line-through");

      if (isLineThrough) {
        newToDo_list.classList.remove("line-through");
      } else {
        newToDo_list.classList.add("line-through");
      }
    });
  }
  newToDo.value = "";
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

todo_wrapper.addEventListener("dragstart", function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  event.target.style.opacity = "0.5";
});

todo_wrapper.addEventListener("dragover", function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
});

todo_wrapper.addEventListener("drop", function handleDrop(event) {
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
