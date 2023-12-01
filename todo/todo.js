import "flatpickr/dist/themes/dark.css";

import { renderTasks, router } from "../script";

import Cookies from "js-cookie";
import flatpickr from "flatpickr";

flatpickr("#date-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i"
});
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

      const tasksCompleted = [...userTodoListData];
      const taksUnCompleted = [...userTodoListData];
      const completedTasks = tasksCompleted.filter((task) => task.is_completed);
      const unCompletedTasks = taksUnCompleted.filter(
        (task) => !task.is_completed
      );
      console.log(unCompletedTasks, completedTasks);

      renderTasks(userTodoListData, "all-tab-tasks");
      renderTasks(completedTasks, "completed-tab-tasks");
      renderTasks(unCompletedTasks, "in-progress-tab-tasks");
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
  createTaskForm.classList.add("hidden");
});
console.log(createTaskForm, "is the task form");
// parsley.init(form);
async function createTask({ createTaskData, token }) {
  createTaskData.is_completed = true;
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
  const noTaskElement = document.getElementById("no-tasks");
  createTask({ createTaskData: createTaskFormObject, token })
    .then((task) => {
      console.log(task);
      if (task?.length) {
        noTaskElement.classList.remove("hidden");
      } else {
        noTaskElement.classList.add("hidden");
        const userTodoListData = [...task];
        const completedTasks = [...userTodoListData].filter(
          (task) => task.is_completed
        );
        const unCompletedTasks = [...userTodoListData].filter(
          (task) => !task.is_completed
        );
        // console.log(unCompletedTasks, completedTasks);
        renderTasks(userTodoListData, "all-tab-tasks");
        renderTasks(completedTasks, "completed-tab-tasks");
        renderTasks(unCompletedTasks, "in-progress-tab-tasks");
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

//! Deleting task
const tasksContainer = document.querySelectorAll(".app-tab-window");
tasksContainer.forEach((container) => {
  container.addEventListener("click", (event) => {
    console.log(event.target, "the tadget");
  });
});
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
