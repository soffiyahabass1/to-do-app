//! UPDATE UI ON DATA Change
export function renderTasks(tasks, id) {
  if (!id) return;
  const tasksContainer = document.getElementById(id);

  tasksContainer.innerHTML = ""; // Clear existing content

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
}
function createTaskElement(task) {
  const taskElement = document.createElement("li");
  // const taskElement = document.createElement("div");
  // taskElement.classList.add("task");
  taskElement.setAttribute("id", task.id);

  taskElement.innerHTML = `
 
                    ${task.title}
                    <button class="edit" id={${task.id}}><i class="fas fa-edit"></i></button>
                    <button id={${task.id}}><i class="fa-solid fa-xmark"></i></button>
            
                    `;
  // <p>${task.date}</p>
  // <p>${task.title}</p>
  // <p>${task.description}</p>
  // <div class="task-buttons">
  //   <button><i class="fa-thin fa-pen"></i></button>
  //   <button><i class="fa-solid fa-xmark"></i></button>
  // </div>

  return taskElement;
}
//! Routing
export function router(path) {
  if (!path) return;
  // const base_path =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.BASE_URL
  //     : "http://localhost:3000/";
  // Specify the URL of the success page
  // const successPageURL = "/success";
  // const new_path = `${base_path}${path}`;
  const new_path = `http://localhost:3000/${path}`;
  console.log(new_path);

  // Redirect to the success page
  // window.location.replace(new_path);
  window.location.href = new_path;
}

const BASE_API_URL = `https://todo-fastapi-338k.onrender.com/api`;
//! Dummy data pending the fetching time
export const dummyTasks = [
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: true
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: false
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: true
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: false
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: true
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: false
  },
  {
    title: "Test Task",
    description: "This is just a test task",
    date: "",
    isCompleted: false
  }
];

// });
//! Getting all to do tasks
async function getAllTodo() {
  const todos = await fetch(`${BASE_API_URL}/todos`, {});
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
