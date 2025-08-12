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
    if (userName === user.userName && password === user.registerPassword) {
      sessionStorage.setItem("activeUser", JSON.stringify(user));
      alert("Succesfully logged in");
      window.location.href = "myRides.html";
      return true;
    }
  }
  alert("Username or password don't match");
  return false;
}
