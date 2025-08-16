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
  if (password === "") {
    alert("Enter a password");
    return false;
  }

  const usersList = JSON.parse(localStorage.getItem("users")) || [];

  for (let user of usersList) {
    if (userName === user.firstName && password === user.registerPassword) {
      sessionStorage.setItem("activeUser", JSON.stringify(user));
      window.location.href = "searchRides.html";
      return true;
    }
  }
  alert("Username or password don't match");
  return false;
}
