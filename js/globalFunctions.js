// This function validate if the user is driver or not, works on editProfileDriver and editProfileUser

function profileUserType() {
  const userInfo = JSON.parse(sessionStorage.getItem("activeUser"));

  if (userInfo.role === "user") {
    window.location.href = "editProfileUser.html";

    return;
  } else {
    window.location.href = "editProfileDriver.html";
    return;
  }
}
