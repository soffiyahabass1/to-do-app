// main app
const app = document.getElementById("app");
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
