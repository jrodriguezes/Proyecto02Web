document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      verifyUser();
    });
});

function verifyUser() {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("login-password").value;

  const usersList = JSON.parse(localStorage.getItem("users")) || [];

  for (const user of usersList) {
    if (userName === user.userName && password === user.registerPassword) {
      alert("Succesfully logged in");
      window.location.href = "myRides.html";
      return true;
    }
  }
  alert("Username or password don't match");
  return false;
}
