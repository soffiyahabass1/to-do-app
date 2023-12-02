//! Sign up user

import Cookies from "js-cookie";
import { router } from "../script";

const signUpForm = document.getElementById("signUpForm");
// parsley.init(form);
async function signUpUser({ signUpData }) {
  console.log(signUpData, "is the signup data");
  const signedUpUser = await fetch(
    `https://todo-fastapi-338k.onrender.com/api/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signUpData)
    }
  );
  return signedUpUser.json();
}
const errorElement = document.getElementById("error-message");

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const signUpFormData = new FormData(signUpForm);

  // Convert FormData to a plain object
  let signUpFormObject = {};
  signUpFormData.forEach(function (value, key) {
    signUpFormObject[key] = value;
  });
  signUpUser({ signUpData: signUpFormObject })
    .then((user) => {
      console.log(user);
      if (Object.keys(user).length > 0) {
        Cookies.set("user_access_token", user.access_token, { path: "/" });
        // const todoRoute =
        //   process.env.NODE_ENV === "production"
        //     ? process.env.TO_DO_ROUTE
        //     : "/todo/todo.html";
        router("/todo/todo");
        // router("/todo/todo.html");
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
  // console.log("Sign up form Data:", signUpFormObject, signedUpUser);
});
//! showing password

const passwordInput = document.getElementById("signup-password");
const toggleButton = document.getElementById("togglePassword");
const showIcon = document.getElementById("show-password");
const hideIcon = document.getElementById("hide-password");

toggleButton.addEventListener("click", () => {
  console.log(passwordInput, toggleButton);
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
