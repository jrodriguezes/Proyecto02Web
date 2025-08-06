document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registration-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      storeUsers();
    });
});

function storeUsers() {
  const userId = document.getElementById("user-id").value;
  const userName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const birthdate = document.getElementById("birthdate").value;
  const email = document.getElementById("email").value;
  const registerPassword = document.getElementById("register-password").value;
  const repeatPassword = document.getElementById("repeat-password").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const vehicleBrandInput = document.getElementById("vehicle-brand");
  const vehicleBrand = vehicleBrandInput ? vehicleBrandInput.value : null;

  const vehicleModelInput = document.getElementById("vehicle-model");
  const vehicleModel = vehicleModelInput ? vehicleModelInput.value : null;

  const vehicleYearInput = document.getElementById("rangeValue");
  const vehicleYear = vehicleYearInput ? vehicleYearInput.value : null;

  const plateNumberInput = document.getElementById("plate-number");
  const plateNumber = plateNumberInput ? plateNumberInput.value : null;

  if (registerPassword === repeatPassword) {
    if (vehicleBrand == null) {
      const userData = {
        userId: userId,
        userName: userName,
        lastName: lastName,
        email: email,
        registerPassword: registerPassword,
        address: address,
        country: country,
        state: state,
        birthdate: birthdate,
        city: city,
        phoneNumber: phoneNumber,
        role: "user",
      };

      let users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        users.push(userData);
      } else {
        users = [userData];
      }

      localStorage.setItem("users", JSON.stringify(users));
      alert("User registration successful!");
      window.location.href = "login.html";
      return true;
    } else {
      const userData = {
        userId: userId,
        userName: userName,
        lastName: lastName,
        email: email,
        registerPassword: registerPassword,
        address: address,
        country: country,
        state: state,
        birthdate: birthdate,
        city: city,
        phoneNumber: phoneNumber,
        role: "driver",
        vehicleBrand: vehicleBrand,
        vehicleModel: vehicleModel,
        vehicleYear: vehicleYear,
        plateNumber: plateNumber,
      };
      let users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        users.push(userData);
      } else {
        users = [userData];
      }

      localStorage.setItem("users", JSON.stringify(users));
      alert("Driver registration successful!");
      window.location.href = "login.html";
      return true;
    }
  } else {
    alert("Passwords do not match. Please try again.");
    return false;
  }
}
