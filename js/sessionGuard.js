document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));

  if (!user) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
    return;
  }
  const noAllowedPages = ["myRides.html"];
  const currentPage = window.location.pathname.split("/").pop();
  
  if (noAllowedPages.includes(currentPage) && user.role !== "driver") {
    alert("You must be driver in to access this page.");
    window.location.href = "searchRides.html";
    return;
  }
});

function logout() {
  sessionStorage.removeItem("activeUser");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

  const ridesLink = document.getElementById("rides-link");

  if (activeUser.role === "user" && ridesLink) {
    ridesLink.style.display = "none";
  }
});
