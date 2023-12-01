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
        router("/todo/todo.html");
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
//
// access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuZ2ZoanZrQGdtYWlsLmNvbSIsImV4cCI6MTcwMTM3MzUwOH0.lFLWg6-mfC1Xw6jRTE_6RUoo7TlGqWe1rOhnlLU5JZs";
// email: "ngfhjvk@gmail.com";
// first_name: "David";
// last_name: "Yemisi";
// token_type: "bearer";
