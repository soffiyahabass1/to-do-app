import parsley from "parsleyjs";

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
//! Sign up user

const signUpForm = document.getElementById("signUpForm");
// parsley.init(form);
async function signUpUser({ signUpData }) {
  console.log(signUpData, "is the signup data");
  const signedUpUser = await fetch(`${BASE_API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signUpData)
  });
  return signedUpUser;
}

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const signUpFormData = new FormData(signUpForm);

  // Convert FormData to a plain object
  let signUpFormObject = {};
  signUpFormData.forEach(function (value, key) {
    signUpFormObject[key] = value;
  });
  const signedUpUser = signUpUser({ signUpData: signUpFormObject })
    .then((user) => {
      console.log(user);
      return user;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  // Log or use the form data as needed
  // console.log("Sign up form Data:", signUpFormObject, signedUpUser);
});

//! Login user
// document.addEventListener("DOMContentLoaded", function () {
const loginForm = document.getElementById("loginForm");
// parsley.init(form);
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const loginFormData = new FormData(loginForm);

  // Convert FormData to a plain object
  let loginFormObject = {};
  loginFormData.forEach(function (value, key) {
    loginFormObject[key] = value;
  });

  // Log or use the form data as needed
  console.log("login form Data:", loginFormObject);
});
// });
//! Getting all to do tasks
async function getAllTodo() {
  const todos = await fetch(`${BASE_API_URL}/todos`, {});
}
// ! open and close modals
// the open modal button
const modalOpenBtns = document.querySelectorAll(".open-modal");
const modalCloseBtns = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");
modalOpenBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modals.forEach((modal) => {
      // console.log(modal.id, btn.id);
      if (`${modal.id}-modal` === btn.id) {
        modal.classList.remove("hidden");
      } else {
        modal.classList.add("hidden");
      }
    });
  })
);
modalCloseBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    modals.forEach((modal) => {
      // console.log(modal.id, btn.id);
      if (`close-${modal.id}` === btn.id) {
        modal.classList.add("hidden");
      } else {
        return;
      }
    });
  })
);

// const openModalBtn = document.getElementById("open-modal");
// const closeModalBtn = document.getElementById("close-modal");
// const modal = document.getElementById("modal");
// openModalBtn.addEventListener("click", () => {
//   modal.classList.toggle("hidden");
// });
// closeModalBtn.addEventListener("click", () => {
//   modal.classList.toggle("hidden");
// });

// adding task

// deleting task
// editing task
// opening task description
// Function to create HTML structure for a each task
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
