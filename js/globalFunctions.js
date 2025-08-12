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

function setUserInfo() {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));

  document.getElementById("first-name").value = user.userName || "";
  document.getElementById("last-name").value = user.lastName || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("register-password").value =
    user.registerPassword || "";
  document.getElementById("repeat-password").value =
    user.registerPassword || "";
  document.getElementById("address").value = user.address || "";
  document.getElementById("country").value = user.country || "";
  document.getElementById("state").value = user.state || "";
  document.getElementById("city").value = user.city || "";
  document.getElementById("phone-number").value = user.phoneNumber || "";

  if (user.role === "driver") {
    document.getElementById("vehicle-brand").value = user.vehicleBrand || "";
    document.getElementById("vehicle-model").value = user.vehicleModel || "";
    document.getElementById("customRange4").value = user.vehicleYear || "";
    document.getElementById("rangeValue").textContent = user.vehicleYear || "";
    document.getElementById("plate-number").value = user.plateNumber || "";
  }
}
