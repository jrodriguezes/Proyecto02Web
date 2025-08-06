document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));

  if (!user) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
    return;
  }
});

function logout() {
  sessionStorage.removeItem("activeUser");
  window.location.href = "login.html";
}
