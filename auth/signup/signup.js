import {
  createUserWithEmailAndPassword,
  auth,
  collection,
  addDoc,
  db,
} from "../../Firebase/Firebase.js";

try {
  const form = document.getElementById("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const error_msg = document.getElementById("error-msg");
  const btn = document.querySelector("button[type='submit']");

  const validateForm = () => {
    let isValid = true;

    if (email.value.trim() === "") {
      error_msg.innerText = "Please fill out this field";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      error_msg.innerText = "Invalid Email";
      isValid = false;
    } else if (password.value.trim() === "") {
      error_msg.innerText = "Please fill out this field";
      isValid = false;
    } else if (password.value.length < 6) {
      error_msg.innerText = "Password must be at least 6 characters";
      isValid = false;
    }

    return isValid;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      btn.innerText = "Submit";
      btn.disabled = false;
      return;
    }

    btn.innerText = "Loading...";
    btn.disabled = true;

    const fName = document.getElementById("first-name").value;
    const lName = document.getElementById("last-name").value;
    const userEmail = email.value;
    const userPassword = password.value;

    const userInfo = {
      fName,
      lName,
      email: userEmail,
      password: userPassword,
    };

    try {
      const user = collection(db, "users");
      const docRef = await addDoc(user, userInfo);
      console.log("Document written with ID: ", docRef.id);

      await createUserWithEmailAndPassword(auth, userEmail, userPassword);

      window.location.href = "../login/login.html";
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        error_msg.innerText = "Email already in use. Please login.";
      } else {
        error_msg.innerText = error.message;
      }
    } finally {
      btn.innerText = "Submit";
      btn.disabled = false;
    }
  });
} catch (error) {
  alert(error);
}
