document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  const allowedPages = ["editUserProfile.html", "editDriverProfile.html"];

  if (allowedPages.includes(currentPage)) {
    setUserInfo();
  }
});

function profileUserType() {
  const userInfo = JSON.parse(sessionStorage.getItem("activeUser"));

  if (userInfo.role === "user") {
    window.location.href = "editUserProfile.html";

    return;
  } else {
    window.location.href = "editDriverProfile.html";
    return;
  }
}

