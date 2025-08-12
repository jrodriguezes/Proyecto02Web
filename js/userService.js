document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form-body")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      updateInfo();
    });
});

function updateInfo() {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  const usersList = JSON.parse(localStorage.getItem("users"));

  const updatedUser = {
    ...activeUser, // operador spread, copia los parametros del objeto
    lastName: document.getElementById("last-name").value,
    firstName: document.getElementById("first-name").value,
    email: document.getElementById("email").value,
    registerPassword: document.getElementById("register-password").value,
    repeatPassword: document.getElementById("repeat-password").value,
    address: document.getElementById("address").value,
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    phoneNumber: document.getElementById("phone-number").value,
  };

  if (activeUser.role === "driver") {
    updatedUser.vehicleBrand = document.getElementById("vehicle-brand").value;
    updatedUser.vehicleModel = document.getElementById("vehicle-model").value;
    updatedUser.vehicleYear = document.getElementById("rangeValue").textContent;
    updatedUser.plateNumber = document.getElementById("plate-number").value;
  }

  const index = usersList.findIndex((user) => user.email === activeUser.email);
  if (index !== -1) {
    usersList[index] = updatedUser;

    localStorage.setItem("users", JSON.stringify(usersList));
    sessionStorage.setItem("activeUser", JSON.stringify(updatedUser));

    alert("Información actualizada con éxito");
  } else {
    alert("Error: usuario no encontrado");
  }
}
