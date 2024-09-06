// import {
//   getDocs,
//   collection,
//   db,
//   auth,
//   onAuthStateChanged,
//   signOut,
//   doc,
//   deleteDoc,
// } from "./Firebase/Firebase.js";

// try {
//   const eventsCards = document.getElementById("events-card");
//   const eventCreate = document.getElementById("eventCreate");
//   const loader = document.getElementById("loader");
//   const login = document.getElementById("signup");
//   const signup = document.getElementById("login");
//   const Logout = document.getElementById("Logout");
//   const LogoutItem = document.getElementById("LogoutItem");
//   // const eventToast = document.getElementById("eventToast");

//   function checkOnlineStatus() {
//     if (navigator.onLine) {
//       if (sessionStorage.getItem("redirectedFromOffline") === "true") {
//         sessionStorage.removeItem("redirectedFromOffline");
//         window.location.href = "index.html";
//         getAllEvents();
//       }
//     } else {
//       sessionStorage.setItem("redirectedFromOffline", "true");
//       window.location.href = "./Check Internet/index.html";
//     }
//   }
//   window.addEventListener("online", checkOnlineStatus);
//   window.addEventListener("offline", checkOnlineStatus);

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       eventCreate.firstElementChild.setAttribute("href", "/create events/events.html");
//       login.style.display = "none";
//       signup.style.display = "none";
//       LogoutItem.style.display = "block";
//     } else {
//       eventValidation();
//       LogoutItem.style.display = "none";
//       login.style.display = "block";
//       signup.style.display = "block";
//     }
//   });

//   getAllEvents();
//   function eventValidation() {
//     eventCreate.firstElementChild.addEventListener("click", (e) => {
//       e.preventDefault();
//       var toastEl = document.getElementById("eventToast");
//       console.log(toastEl);
//       if (toastEl) {
//         var toast = new bootstrap.Toast(toastEl);
//         toast.show();
//       }
//       eventCreate.firstElementChild.setAttribute("href", "index.html");
//     });
//   }

//   async function getAllEvents() {
//     loader.style.display = "flex";
//     try {
//       const querySnapshot = await getDocs(collection(db, "events"));
//       eventsCards.innerHTML = "";
//       querySnapshot.forEach((doc) => {
//         const event = doc.data();
//         const { banner, title, date, time, createdByEmail, location, desc } =
//           event;
//         const card = `<div class="col-4">
//                       <div class="card my-4" id="card">
//                         <img src="${banner}" class="card-img-top" alt="Event Image" />
//                         <div class="card-body bg-dark text-white">
//                           <h1 class="card-title"> Title : ${title} </h1>
//                           <p class="card-text"> Description : ${desc} </p>
//                         </div>
//                         <ul class="list-group list-group-flush">
//                           <li class="list-group-item bg-dark text-white"> Location : ${location} </li>
//                           <li class="list-group-item bg-dark text-white"> Email : ${createdByEmail} </li>
//                           <li class="list-group-item bg-dark text-white"> Time : ${time} </li>
//                           <li class="list-group-item bg-dark text-white"> Date  : ${date} </li>
//                         </ul>
//                         <button class="position-sticky bottom-0 rounded-bottom-4 delete-event fs-5 fw-bold" data-id="${doc.id}">Delete Event</button>
//                       </div>
//                       </div>`;
//         eventsCards.innerHTML += card;
//       });

//       deleteCard();
//     } catch (error) {
//       console.error("Error fetching events: ", error);
//     } finally {
//       loader.innerHTML = " ";
//     }
//   }

//   Logout.addEventListener("click", (e) => {
//     signOut(auth)
//       .then(() => {
//         e.preventDefault();
//         var toastEl = document.querySelector("#toastLogout");
//         if (toastEl) {
//           var toast = new bootstrap.Toast(toastEl);
//           toast.show();
//         }
//         setTimeout(() => {
//           toastEl.classList.remove("show");
//         }, 3000);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   });

//   function deleteCard() {
//     const deleteButtons = document.querySelectorAll(".delete-event");

//     deleteButtons.forEach((button) => {
//       button.addEventListener("click", async (e) => {
//         button.innerText = "Event deleting...";
//         button.disabled = true;
//         const documentId = button.getAttribute("data-id");

//         const docRef = doc(db, "events", documentId);
//         try {
//           await deleteDoc(docRef);
//           button.closest(".col-4").remove();
//         } catch (error) {
//           console.error("Error deleting document: ", error);
//         } finally {
//           button.innerText = "Delete Event";
//           button.disabled = false;
//         }
//       });
//     });
//   }

//   checkOnlineStatus();
// } catch (error) {
//   alert(error);
// }

// ==========================================================================================================
import {
  getDocs,
  collection,
  db,
  auth,
  onAuthStateChanged,
  signOut,
  doc,
  deleteDoc,
} from "./Firebase/Firebase.js";

try {
  const eventsCards = document.getElementById("events-card");
  const eventCreate = document.querySelectorAll("#eventCreate");
  const loader = document.getElementById("loader");
  const signup = document.querySelectorAll("#signup");
  const login = document.querySelectorAll("#login");
  const Logout = document.querySelectorAll("#Logout");
  const LogoutItem = document.querySelectorAll("#LogoutItem");
  const eventToast = document.getElementById("LoginToast"); // Added reference for the eventToast
  const toastLogoutEl = document.querySelector("#toastLogout"); // Added reference for logout toast

  function checkOnlineStatus() {
    if (navigator.onLine) {
      if (sessionStorage.getItem("redirectedFromOffline") === "true") {
        sessionStorage.removeItem("redirectedFromOffline");
        // window.location.href = "index.html";
        getAllEvents();
      }
    } else {
      sessionStorage.setItem("redirectedFromOffline", "true");
      // window.location.href = "./Check Internet/index.html";
    }
  }
  window.addEventListener("online", checkOnlineStatus);
  window.addEventListener("offline", checkOnlineStatus);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      eventCreate.forEach((event) => {
        event.firstElementChild.setAttribute(
          "href",
          "/create events/events.html"
        );
        signup.forEach((signup) => {
          signup.style.display = "none";
        });
        login.forEach((login) => {
          login.style.display = "none";
        });
        LogoutItem.forEach((item) => {
          item.style.display = "block";
        });
      });
      // eventCreate.firstElementChild.setAttribute(
      //   "href",
      //   "/create events/events.html"
      // );
      // signup.style.display = "none";
      // login.style.display = "none";
      // LogoutItem.style.display = "block";
    } else {
      eventValidation(); // This will handle toast if user is not logged in
      // LogoutItem.style.display = "none";
      // login.style.display = "block";
      // signup.style.display = "block";
      signup.forEach((signup) => {
        signup.style.display = "block";
      });
      login.forEach((login) => {
        login.style.display = "block";
      });
      LogoutItem.forEach((item) => {
        item.style.display = "none";
      });
    }
  });

  getAllEvents();

  function eventValidation() {
    eventCreate.forEach((child) => {
      child.addEventListener("click", (e) => {
        e.preventDefault();
        if (eventToast) {
          var toast = new bootstrap.Toast(eventToast);
          toast.show();
        }
      });
    });
    // eventCreate.firstElementChild.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   if (eventToast) {
    //     var toast = new bootstrap.Toast(eventToast);
    //     toast.show();
    //   }
    // });
  }

  async function getAllEvents() {
    loader.style.display = "flex";
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      eventsCards.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        const { banner, title, date, time, createdByEmail, location, desc } =
          event;
        const card = `<div class="col-lg-4">
                      <div class="card" id="card">
                        <img src="${banner}" class="card-img-top" alt="Event Image" />
                        <div class="card-body bg-dark text-white">
                          <h1 class="card-title"> Title : ${title} </h1>
                          <p class="card-text"> Description : ${desc} </p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item bg-dark text-white"> Location : ${location} </li>
                          <li class="list-group-item bg-dark text-white"> Email : ${createdByEmail} </li>
                          <li class="list-group-item bg-dark text-white"> Time : ${time} </li>
                          <li class="list-group-item bg-dark text-white"> Date  : ${date} </li>
                        </ul>
                        <button class="position-sticky bottom-0 rounded-bottom-4 delete-event fs-5 fw-bold deletebutton" data-id="${doc.id}">Delete Event</button>
                      </div>
                      </div>`;
        eventsCards.innerHTML += card;
      });
      const img = document.querySelectorAll(".card-img-top");
      img.forEach((img) => {
        img.addEventListener("click", () => {
          window.open(img.src, "_blank");
        });
      });

      deleteCard();
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      loader.style.display = "none";
    }
  }

  Logout.forEach((element) => {
    element.addEventListener("click", (e) => {
      signOut(auth)
        .then(() => {
          e.preventDefault();
          if (toastLogoutEl) {
            var toast = new bootstrap.Toast(toastLogoutEl);
            toast.show();
          }
          setTimeout(() => {
            toastLogoutEl.classList.remove("show");
          }, 3000);
        })
        .catch((error) => {
          alert(error);
        });
    });
  });
  // Logout.addEventListener("click", (e) => {
  //   signOut(auth)
  //     .then(() => {
  //       e.preventDefault();
  //       if (toastLogoutEl) {
  //         var toast = new bootstrap.Toast(toastLogoutEl);
  //         toast.show();
  //       }
  //       setTimeout(() => {
  //         toastLogoutEl.classList.remove("show");
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // });

  function deleteCard() {
    const deleteButtons = document.querySelectorAll(".deletebutton");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        button.innerText = "Event deleting...";
        button.disabled = true;
        const documentId = button.getAttribute("data-id");

        const docRef = doc(db, "events", documentId);
        try {
          await deleteDoc(docRef);
          button.closest(".col-lg-4").remove();
        } catch (error) {
          console.error("Error deleting document: ", error);
        } finally {
          button.innerText = "Delete Event";
          button.disabled = false;
        }
      });
    });
  }

  checkOnlineStatus();
} catch (error) {
  console.log(error);
}

// ==========================================================================================================
