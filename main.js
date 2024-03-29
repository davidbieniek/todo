let newToDo = document.querySelector(".todo_name");
let searchToDo = document.querySelector(".search");
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

    let delete_todo = document.createElement("div");
    delete_todo.className = "delete";
    newToDo_list.appendChild(delete_todo);

    delete_todo.addEventListener("click", () => {
      todo_wrapper.removeChild(newToDo_list);
    });

    let done_todo = document.createElement("div");
    done_todo.className = "done";
    newToDo_list.appendChild(done_todo);

    done_todo.addEventListener("click", () => {
      let isLineThrough = newToDo_list.classList.contains("line-through");
      let doneItems = document.querySelector(".done");

      if (isLineThrough) {
        newToDo_list.classList.remove("line-through");
        doneItems.style.backgroundImage = 'url("./src/done.png")';
      } else {
        newToDo_list.classList.add("line-through");
        doneItems.style.backgroundImage = 'url("./src/done-check.png")';
      }
    });
  }
  newToDo.value = "";
});

searchToDo.addEventListener("input", filterToDo);

function filterToDo() {
  const searchText = searchToDo.value.toLowerCase();
  const todoItems = todo_wrapper.querySelectorAll(".item");

  todoItems.forEach((item) => {
    const itemText = item.innerText.toLowerCase();
    if (itemText.includes(searchText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

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

todo_wrapper.addEventListener("dblclick", function handleDoubleClick(event) {
  const clickedItem = event.target;

  if (clickedItem.classList.contains("item")) {
    const originalText = clickedItem.textContent;
    const deleteDiv = clickedItem.querySelector(".delete");
    const doneDiv = clickedItem.querySelector(".done");

    const editField = document.createElement("input");
    editField.type = "text";
    editField.value = originalText;

    clickedItem.textContent = "";
    clickedItem.appendChild(editField);
    clickedItem.appendChild(deleteDiv);
    clickedItem.appendChild(doneDiv);
    editField.focus();

    editField.addEventListener("blur", () => {
      const newText = editField.value;
      if (newText.trim() === "") {
        clickedItem.textContent = originalText;
      } else {
        clickedItem.textContent = newText;
      }
      clickedItem.appendChild(deleteDiv);
      clickedItem.appendChild(doneDiv);
    });
  }
});
