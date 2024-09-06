import {
  auth,
  db,
  collection,
  addDoc,
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../Firebase/Firebase.js";

try {
  const form = document.getElementById("event_form");
  const btn = document.getElementById("btn");

  function checkOnlineStatus() {
    if (navigator.onLine) {
      window.location.href = "events.html";
    } else {
      window.location.href = "../index.html";
    }
  }
  window.addEventListener("online", checkOnlineStatus);
  window.addEventListener("offline", checkOnlineStatus);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    btn.innerText = "Please wait...";
    btn.disabled = true;

    const eventinfo = {
      banner: e.target[0].files[0],
      title: e.target[1].value,
      desc: e.target[2].value,
      location: e.target[3].value,
      date: e.target[4].value,
      time: e.target[5].value,
      createdBy: auth.currentUser.uid,
      createdByEmail: auth.currentUser.email,
    };

    const imageRef = ref(storage, eventinfo.banner.name);
    uploadBytes(imageRef, eventinfo.banner).then(() => {
      getDownloadURL(imageRef).then((url) => {
        eventinfo.banner = url;

        const eventCollection = collection(db, "events");
        addDoc(eventCollection, eventinfo).then(() => {
          btn.innerText = "Event Created Successfully!";
          btn.disabled = false;
          window.location.href = "/";
        });
      });
    });
  });
} catch (error) {
  alert(error);
}
