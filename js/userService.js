document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      storeUsers();
    });
  }
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
        firstName: userName,
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
      window.location.href = "login.html";
      return true;
    } else {
      const userData = {
        userId: userId,
        firstName: userName,
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
      window.location.href = "login.html";
      return true;
    }
  } else {
    alert("Passwords do not match. Please try again.");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-body");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      updateInfo();
    });
  }
});

function updateInfo() {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  const usersList = JSON.parse(localStorage.getItem("users"));

  const updatedUser = {
    ...activeUser, // operador spread, copia los parametros del objeto
    lastName: document.getElementById("last-name").value,
    firstName: document.getElementById("first-name").value,
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

  const index = usersList.findIndex(
    (user) =>
      user.email.trim().toLowerCase() === activeUser.email.trim().toLowerCase()
  );
  if (index !== -1) {
    usersList[index] = updatedUser;

    localStorage.setItem("users", JSON.stringify(usersList));
    sessionStorage.setItem("activeUser", JSON.stringify(updatedUser));
  } else {
    alert("Error: usuario no encontrado");
  }
}

function setUserInfo() {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));

  document.getElementById("first-name").value = user.firstName || "";
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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("configuration-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      storeUserBio();
    });
  }
});

function storeUserBio() {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  const userId = activeUser.userId;

  const userBio = {
    userId: userId,
    publicName: document.getElementById("public-name").value,
    bio: document.getElementById("public-bio").value,
  };

  let biosList = JSON.parse(localStorage.getItem("bios")) || [];

  const index = biosList.findIndex((bio) => bio.userId === userId);

  if (index !== -1) {
    biosList[index] = { ...biosList[index], ...userBio };
  } else {
    biosList.push(userBio);
  }

  localStorage.setItem("bios", JSON.stringify(biosList));
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("configuration-form");
  if (form) {
    setUserBio();
  }
});

function setUserBio() {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  const bios = JSON.parse(localStorage.getItem("bios"));

  if (bios) {
    for (let userBioInfo of bios) {
      if (userBioInfo.userId === activeUser.userId) {
        document.getElementById("public-name").value =
          userBioInfo.publicName || "eeee";
        document.getElementById("public-bio").value = userBioInfo.bio || "eee";
      }
    }
  }
}
