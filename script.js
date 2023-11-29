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

// ! open and close modal
// the open modal button
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");
openModalBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});
closeModalBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});
// the
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

// const tasksContainer = document.getElementById("tasks");
dummyTasks.forEach((task) => {
  // console.log(task);
  const taskElement = createTaskElement(task);
  allTab.appendChild(taskElement);
  // tasksContainer.appendChild(taskElement);
  // const taskElementContainer = document.createElement("div");
  // taskElementContainer.setAttribute("id", "all");
  // return taskElementContainer;
});
completedTasks.forEach((task) => {
  // console.log(task);
  const taskElement = createTaskElement(task);
  completedTab.appendChild(taskElement);
});
unCompletedTasks.forEach((task) => {
  // console.log(task);
  const taskElement = createTaskElement(task);
  inProgressTab.appendChild(taskElement);
  // const taskElementContainer = document.createElement("div");
  // taskElementContainer.setAttribute("id", "in-progress"); // Set the id attribute

  // taskElementContainer.appendChild(taskElement);
  // return taskElementContainer;
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
