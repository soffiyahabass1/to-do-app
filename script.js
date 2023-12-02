//! UPDATE UI ON DATA Change
export function renderTasks({ tasks, id }) {
  // console.log(tasks, id, "is the tab data");
  if (!id) return;
  const tasksContainer = document.getElementById(id);

  // console.log(tasksContainer, "is the task container");
  tasksContainer.innerHTML = ""; // Clear existing content

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
}
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-item");
  taskElement.setAttribute("id", task.id);

  taskElement.innerHTML = `
  <div class="task-checkbox">
  <input type="checkbox" ${task.is_completed ? "checked" : ""}  data-id=${
    task.id
  } class="task-status" />
  </div>
  <div class="task-item-details">
    <p>${task.title}</p>
    <p>${task.description}</p>
  </div>
  <p class="task-item-date">${task.due_date}</p>
  <div class="task-item-btns">
    <button  class="edit-task"  data-id=${
      task.id
    } ><i class="btn-icon fas fa-edit"></i></button>
    <button class="delete-task" data-id=${
      task.id
    }><i class=" btn-icon fa-solid fa-trash-can"></i></button>
  </div>
            
                    `;
  return taskElement;
}
//! Routing
export function router(path) {
  console.log(path, "This is the next path");
  if (!path) return;

  const base_path =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000/";
  // Specify the URL of the success page
  // const successPageURL = "/success";
  const new_path = `${base_path}${path}`;
  // const new_path = `http://localhost:3000/${path}`;
  // console.log(new_path);

  // Redirect to the success page
  // window.location.replace(new_path);
  window.location.href = new_path;
}

//! Showing password
export function togglePasswordVisibility({ passwordInput, toggleButton }) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = `<i class="fa-solid fa-eye"></i>`;
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = `<i class="fa-solid fa-eye-slash"></i>`;
  }
}
