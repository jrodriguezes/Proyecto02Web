document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registration-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      storeUsers();
    });
});

function storeUsers() {
  const userName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const registerPassword = document.getElementById("register-password").value;
  const repeatPassword = document.getElementById("repeat-password").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const phoneNumber = document.getElementById("phone-number").value;

  if (registerPassword === repeatPassword) {
    const userData = {
      userName: userName,
      lastName: lastName,
      email: email,
      registerPassword: registerPassword,
      address: address,
      country: country,
      state: state,
      city: city,
      phoneNumber: phoneNumber,
    };

    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      users.push(userData);
    } else {
      users = [userData];
    }

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    return true;
  } else {
    alert("Passwords do not match. Please try again.");
    return false;
  }
}
