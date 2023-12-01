//! Get current user

import { dummyTasks, router } from "../script";

import Cookies from "js-cookie";

// const testGetUser = document.getElementById("get-user");
// testGetUser.addEventListener("click", () => {
//   getCurrentUser();
// });
// Function to make an API request with a token
const userWelcome = document.getElementById("user-welcome");
function getCurrentUser() {
  console.log("getting user info");
  // Replace 'YOUR_TOKEN' with the actual token
  const token = Cookies.get("user_access_token") || null;
  if (!token) {
    router("/login/login.html");
  }
  console.log("The access token is : ", token);
  fetch("https://todo-fastapi-338k.onrender.com/api/usersme", {
    method: "GET", // or 'POST', 'PUT', etc.
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json" // Adjust content type as needed
    }
    // You can add other options like body for POST requests
  })
    .then(async (response) => {
      const userData = await response.json();
      console.log("API response:", userData);
      userWelcome.innerHTML = `Hi, ${userData.first_name} ${userData.last_name}`;
      return userData;
    })
    .catch((error) => {
      console.error("Error during API request:", error);
      return null;
    });
}
window.onload = getCurrentUser();
// document.addEventListener("load", () => {
//   console.log("getting user");
//   const currentUser = getCurrentUser();
//   console.log(currentUser, "This is the current user");
// });
// ! Tabs
const allTab = document.getElementById("all-tab");
const inProgressTab = document.getElementById("in-progress-tab");
const completedTab = document.getElementById("completed-tab");

// ! Tab component controls
const tabControls = document.querySelectorAll(".app__tasks-control");
tabControls.forEach((control) => {
  control.addEventListener("click", (event) => {
    const tabId = event.target?.id ?? "all";
    console.log(tabId, "is the current tabId");
    showTab(`${tabId}-tab`);
  });
});

// ! create tab components
const completedTasks = dummyTasks.filter((task) => task.isCompleted);
const unCompletedTasks = dummyTasks.filter((task) => !task.isCompleted);
const allTask = dummyTasks;
allTask.forEach((task) => {
  const taskElement = createTaskElement(task);
  allTab.appendChild(taskElement);
});
completedTasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  completedTab.appendChild(taskElement);
});
unCompletedTasks.forEach((task) => {
  const taskElement = createTaskElement(task);
  inProgressTab.appendChild(taskElement);
});
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  taskElement.innerHTML = `
    <p>${task.date}</p>
    <p>${task.title}</p>
    <p>${task.description}</p>
    <div class="task-buttons">
      <button><i class="fa-thin fa-pen"></i></button>
      <button><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  return taskElement;
}
function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".app__task-tab");
  tabContents.forEach((tabContent) => {
    tabContent.classList.add("hidden");
  });

  // Show the selected tab content
  const selectedTabContent = document.getElementById(tabId);
  if (selectedTabContent) {
    selectedTabContent.classList.remove("hidden");
  }
}
