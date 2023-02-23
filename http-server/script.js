let userEntries = [];
const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry, index) => {
        const number = `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
          Number(index) + 1
        }</td>`;
        const name = `<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.name}</td>`;
        const email = `<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.email}</td>`;
        const password = `<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.password}</td>`;
        const dob = `<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.dob}</td>`;
        const acceptTerms = `<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr class="bg-white border-b" >${number} ${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table class="min-w-full"><thead class="border-b">
  <tr><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">No.</th>
  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Password</th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Dob</th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Accepted terms?</th>
          </tr>
          </thead>
          <tbody>
          ${entries} </tbody>
          </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ageValidation = (dateString) => {
  let userAge = getAge(dateString);
  if (userAge > 18 && userAge < 55) {
    return true;
  }
  return false;
};

const errmsgDisplay = (value) => {
  if (value === true) {
    document.getElementById("errordob").textContent =
      "Your age should be between 18 and 55 !";
  } else {
    document.getElementById("errordob").textContent = "";
  }
};
const emptyFormFields = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("acceptTerms").checked = false;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  if (ageValidation(dob)) {
    errmsgDisplay(false);
    userEntries.push(userDetails);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    emptyFormFields();
  } else {
    errmsgDisplay(true);
  }
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();

userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}
