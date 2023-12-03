//! Login user

import { router, togglePasswordVisibility } from "../script";

import Cookies from "js-cookie";

const loginBtn = document.getElementById("login-btn");
async function loginUser({ loginData }) {
  // console.log(loginData, "is the login data");
  const formData = new URLSearchParams();

  formData.append("username", loginData.username);
  formData.append("password", loginData.password);

  const loggedInUser = await fetch(
    `https://todo-fastapi-338k.onrender.com/api/users/login`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    }
  );
  return loggedInUser.json();
}
// document.addEventListener("DOMContentLoaded", function () {
const loginForm = document.getElementById("loginForm");
const errorElement = document.getElementById("error-message");
// parsley.init(form);
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  loginBtn.disabled = true;
  // Get form data
  const loginFormData = new FormData(loginForm);

  // Convert FormData to a plain object
  let loginFormObject = {};
  loginFormData.forEach(function (value, key) {
    loginFormObject[key] = value;
  });

  loginUser({ loginData: loginFormObject })
    .then((user) => {
      // console.log(user);
      if (user.access_token) {
        Cookies.set("user_access_token", user.access_token, { path: "/" });

        // const todoRoute =
        //   process.env.NODE_ENV === "production"
        //     ? process.env.TO_DO_ROUTE
        //     : "/todo/todo.html";
        router("/todo/todo");
        // router("todo/todo.html");
      } else {
        loginBtn.disabled = false;
        let error = "Invalid username or password";
        errorElement.innerHTML = error;
      }
      // return user;
    })
    .catch((err) => {
      loginBtn.disabled = false;
      console.log(err);
      return;
    });
  // Log or use the form data as needed
  // console.log("login form Data:", loginFormObject);
});
//! showing password

const passwordInput = document.getElementById("login-password");
const toggleButton = document.getElementById("togglePassword");
const showIcon = document.getElementById("show-password");
const hideIcon = document.getElementById("hide-password");

toggleButton.addEventListener("click", () => {
  // console.log(passwordInput, toggleButton);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    hideIcon.classList.remove("hidden");
    showIcon.classList.add("hidden");
  } else {
    passwordInput.type = "password";

    hideIcon.classList.add("hidden");
    showIcon.classList.remove("hidden");
  }
});
