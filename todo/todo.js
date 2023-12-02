import "flatpickr/dist/themes/dark.css";

import { renderTasks, router } from "../script";

import Cookies from "js-cookie";
import flatpickr from "flatpickr";

flatpickr("#date-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i"
});
const noTaskElement = document.getElementById("no-tasks");

//! Get current user
const token = Cookies.get("user_access_token") || null;
if (!token) {
  router("login/login.html");
}
const userWelcome = document.getElementById("user-welcome");
function getCurrentUser(token) {
  console.log("The access token is : ", token);
  fetch("https://todo-fastapi-338k.onrender.com/api/usersme", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(async (response) => {
      if (response.ok) {
        const userData = await response.json();
        console.log("API response for getting user:", userData);
        userWelcome.innerHTML = `Hi, ${userData.first_name} ${userData.last_name}`;
        return userData;
      } else {
        router("login/login.html");
      }
    })

    .catch((error) => {
      console.error("Error during API request:", error);
      return null;
    });
}
function getCurrentUserTodoList(token) {
  // const token = Cookies.get("user_access_token") || null;
  if (!token) {
    router("login/login.html");
  }
  console.log("The access token is : ", token);
  fetch("https://todo-fastapi-338k.onrender.com/api/todos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(async (response) => {
      console.log(response, "get all todo response");
      const userTodoListData = await response.json();

      console.log("API response for user todos:", userTodoListData);
      if (userTodoListData.length <= 0) {
        noTaskElement.classList.remove("hidden");
      } else {
        noTaskElement.classList.add("hidden");

        const completedTasks = [...userTodoListData].filter((task) => {
          return task.is_completed;
          // return task.is_completed === true;
        });
        const unCompletedTasks = [...userTodoListData].filter((task) => {
          return !task.is_completed;
          // return task.is_completed === false;
        });
        console.log(unCompletedTasks, completedTasks);
        renderTasks({ tasks: userTodoListData, id: "all-tab-tasks" });
        renderTasks({ tasks: unCompletedTasks, id: "in-progress-tab-tasks" });
        renderTasks({ tasks: completedTasks, id: "completed-tab-tasks" });
        createTaskForm.reset();
        createTaskForm.classList.add("hidden");
      }
    })

    .catch((error) => {
      console.error("Error during API request:", error);
      return null;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getCurrentUser(token);
  getCurrentUserTodoList(token);
});
//! ADD Task
const addTaskBtn = document.getElementById("open-add-task-modal");
const closeTaskModalBtn = document.getElementById("close-add-task-modal");
const createTaskForm = document.getElementById("create-task");
addTaskBtn.addEventListener("click", () => {
  createTaskForm.classList.toggle("hidden");
});
closeTaskModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createTaskForm.reset();
  createTaskForm.classList.add("hidden");
});
console.log(createTaskForm, "is the task form");
// parsley.init(form);
async function createTask({ createTaskData, token }) {
  createTaskData.is_completed = false;
  console.log(createTaskData, "is the createTask data");
  const createdTask = await fetch(
    `https://todo-fastapi-338k.onrender.com/api/todos`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createTaskData)
    }
  );
  return createdTask.json();
}

createTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form data
  const createTaskFormData = new FormData(createTaskForm);

  // Convert FormData to a plain object

  const createTaskFormObject = Object.fromEntries(createTaskFormData.entries());
  console.log(createTaskFormObject);

  createTask({ createTaskData: createTaskFormObject, token })
    .then((task) => {
      console.log(task);
      if (task?.length <= 0) {
        noTaskElement.classList.remove("hidden");
      } else {
        noTaskElement.classList.add("hidden");
        const userTodoListData = [...task];
        const completedTasks = [...userTodoListData].filter(
          (task) => task.is_completed === true
        );
        const unCompletedTasks = [...userTodoListData].filter(
          (task) => task.is_completed === false
        );
        // console.log(unCompletedTasks, completedTasks);

        renderTasks({ tasks: userTodoListData, id: "all-tab-tasks" });
        renderTasks({ tasks: completedTasks, id: "completed-tab-tasks" });
        renderTasks({ tasks: unCompletedTasks, id: "in-progress-tab-tasks" });
        createTaskForm.classList.add("hidden");
      }
    })
    .catch((err) => {
      console.log(err);
      // return null;
    });
});

// ! Tab component controls
const tabControls = document.querySelectorAll(".app__tasks-control");
tabControls.forEach((control) => {
  control.addEventListener("click", (event) => {
    // Remove "active" class from all tab controls
    tabControls.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Add "active" class only to the clicked tab control
    control.classList.add("active");
    const tabId = event.target?.id ?? "all-tab";

    showTab(`${tabId}-tasks`);
  });
});

function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".app-tab-window");
  tabContents.forEach((tabContent) => {
    tabContent.classList.add("hidden");
    tabContent.style.zIndex = "";
  });

  // Show the selected tab content
  const selectedTabContent = document.getElementById(tabId);

  if (selectedTabContent) {
    selectedTabContent.classList.remove("hidden");
    selectedTabContent.style.zIndex = 5;
  }
}

//! Logout user
const logoutBtn = document.getElementById("user-logout");
function logoutCurrentUser(token) {
  console.log("The access token is : ", token);
  fetch("https://todo-fastapi-338k.onrender.com/api/users/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(async (response) => {
      console.log(response);
      if (response.ok) {
        Cookies.remove("user_access_token");
        router("/");
        // return userData;
      } else {
        return;
      }
    })

    .catch((error) => {
      console.error("Error during API request:", error);
      return null;
    });
}
logoutBtn.addEventListener("click", () => {
  logoutCurrentUser(token);
});

const tabWindows = document.querySelectorAll(".app-tab-window");
tabWindows.forEach((window) => {
  window.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target.classList.value);
    if (
      target.classList.value !== "edit-task" &&
      target.classList.value !== "task-status" &&
      target.classList.value !== "delete-task"
    )
      return;
    if (target.classList.value === "delete-task") {
      deleteTask(Number(target.dataset.id));
      console.log("deleting task : ", Number(target.dataset.id) === 1);
    }
    if (target.classList.value === "edit-task") {
      generateEditForm(target.dataset.id);
      console.log("editing task : ", target.dataset.id);
    }
    if (target.classList.value === "task-status") {
      console.log("setting task status : ", target.dataset.id);
      const isChecked = event.target.checked;
      const targetId = event.target.dataset.id;
      // fetch all the  dat
      updateTask({
        id: Number(targetId),
        is_completed: isChecked,
        title,
        description
      });
      console.log(`Checkbox value is ${isChecked} for task ${targetId}`);
    }
    console.log(event.target.classList.value, " : is the current event");
  });
});
//! Deleting task
function deleteTask(taskId) {
  fetch(`https://todo-fastapi-338k.onrender.com/api/todos/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      // Add any additional headers as needed (e.g., authorization headers)
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Optionally handle the success response
      getCurrentUserTodoList(token);
      // console.log("Item deleted successfully");
    })
    .catch((error) => {
      // Handle errors during the fetch request
      console.error("Error deleting item:", error.message);
    });
}
// ! Edit task
const updateTask = async (taskData) => {
  console.log(taskData);
  try {
    const response = await fetch(
      `https://todo-fastapi-338k.onrender.com/api/todos`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const updatedTask = await response.json();
    console.log("Task updated successfully:", updatedTask);
    if (updatedTask?.length <= 0) {
      noTaskElement.classList.remove("hidden");
    } else {
      noTaskElement.classList.add("hidden");
      const userTodoListData = [...updatedTask];
      const completedTasks = [...userTodoListData].filter(
        (task) => task.is_completed === true
      );
      const unCompletedTasks = [...userTodoListData].filter(
        (task) => task.is_completed === false
      );
      // console.log(unCompletedTasks, completedTasks);

      renderTasks({ tasks: userTodoListData, id: "all-tab-tasks" });
      renderTasks({ tasks: completedTasks, id: "completed-tab-tasks" });
      renderTasks({ tasks: unCompletedTasks, id: "in-progress-tab-tasks" });
      createTaskForm.classList.add("hidden");
    }
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw error;
  }
};
// updating just checkbox
const checkboxes = document.querySelectorAll("task-status");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {});
});
// updating the whole task
function generateEditForm(taskId) {
  // generate task data with id
  // use the data as default values of the form being generated
  //
  ` <form class="app__tasks-modal hidden" id="edit-task">
          <button
            type="button"
            class="btn-close-modal"
            id="close-add-task-modal"
          >
            x
          </button>
          <div class="app__tasks-modal--content">
            <h1>To do</h1>
            <p class="p">Add a new task</p>
            <input type="text" placeholder="Title" name="title" />
            <input type="text" placeholder="Description" name="description" />
            <input
              type="text"
              id="date-picker"
              name="due_date"
              placeholder="Select Date and Time"
            />
            <div class="task-checkbox">
              <input type="checkbox" name="is_completed"/>
            </div>
            <button class="i" type="submit">
              <i class="fa-solid fa-plus"></i>
              <span>Add new</span>
            </button>
          </div>
        </form>`;
  // put the modal inside th app
}
