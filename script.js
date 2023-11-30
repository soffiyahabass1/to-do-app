//! UPDATE UI ON DATA Change
// function updateUI() {
//   const loggedInStatus = getCookie("loggedIn") === "true";
//   if (loggedInStatus) {
//     // Show elements for logged-in users
//     document.getElementById("loggedInContent").style.display = "block";
//     document.getElementById("loginButton").style.display = "none";
//   } else {
//     // Show elements for non-logged-in users
//     document.getElementById("loggedInContent").style.display = "none";
//     document.getElementById("loginButton").style.display = "block";
//   }
// }
//! Routing
export function router(path) {
  if (!path) return;
  // Specify the URL of the success page
  // const successPageURL = "/success";

  // Redirect to the success page
  window.location.href = path;
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
// ! open and close modals
// // the open modal button
// const modalOpenBtns = document.querySelectorAll(".open-modal");
// const modalCloseBtns = document.querySelectorAll(".close-modal");
// const modals = document.querySelectorAll(".modal");
// modalOpenBtns.forEach((btn) =>
//   btn.addEventListener("click", () => {
//     modals.forEach((modal) => {
//       // console.log(modal.id, btn.id);
//       if (`${modal.id}-modal` === btn.id) {
//         modal.classList.remove("hidden");
//       } else {
//         modal.classList.add("hidden");
//       }
//     });
//   })
// );
// modalCloseBtns.forEach((btn) =>
//   btn.addEventListener("click", () => {
//     modals.forEach((modal) => {
//       // console.log(modal.id, btn.id);
//       if (`close-${modal.id}` === btn.id) {
//         modal.classList.add("hidden");
//       } else {
//         return;
//       }
//     });
//   })
// );

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
