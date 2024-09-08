import { signInWithEmailAndPassword, auth } from "../../Firebase/Firebase.js";

try {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const btn = document.getElementById("btn");
  const error_msg = document.getElementById("error-msg");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.innerText = "Loading...";
    btn.disabled = true;

    if (email.value.trim() === "" || password.value.trim() === "") {
      error_msg.innerText = "Please fill out all fields";
      btn.innerText = "Submit";
      btn.disabled = false;
      return;
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        window.location.href = "../../index.html";
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid Email";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found";
            break;
          case "auth/wrong-password":
            errorMessage = "Wrong password";
            break;
          case "auth/invalid-credential":
            errorMessage = "Email Does not Exist Please enter Correct Email";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
        error_msg.innerText = errorMessage;
        btn.innerText = "Submit";
        btn.disabled = false;
      });
  });
} catch (error) {
  alert(error);
}
