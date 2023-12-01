//! Login user

import Cookies from "js-cookie";
import { router } from "../script";

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

  // Get form data
  const loginFormData = new FormData(loginForm);

  // Convert FormData to a plain object
  let loginFormObject = {};
  loginFormData.forEach(function (value, key) {
    loginFormObject[key] = value;
  });

  loginUser({ loginData: loginFormObject })
    .then((user) => {
      console.log(user);
      if (user.access_token) {
        Cookies.set("user_access_token", user.access_token, { path: "/" });

        router("todo/todo.html");
      } else {
        let error = "Invalid username or password";
        errorElement.innerHTML = error;
      }
      // return user;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  // Log or use the form data as needed
  // console.log("login form Data:", loginFormObject);
});
