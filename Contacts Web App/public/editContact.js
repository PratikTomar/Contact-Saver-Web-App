const contactIDDOM = document.querySelector(".contact-edit-id");
const contactEditInputs = document.querySelectorAll("input");
const editFormDOM = document.querySelector(".single-contact-form");
const editBtnDOM = document.querySelector(".contact-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const showContact = async () => {
  try {
    const res = await fetch(`/contacts/${id}`);
    const data = await res.json();
    if (data.msg && res.status === 404) {
      contactIDDOM.textContent = data.msg;
      return;
    }
    contactIDDOM.textContent = data.getOneContact._id;
    contactEditInputs[0].value = data.getOneContact.name;
    contactEditInputs[1].value = data.getOneContact.phoneNumber1;
    contactEditInputs[2].value = data.getOneContact.phoneNumber2 || "";
    contactEditInputs[3].value = data.getOneContact.email || "";
    contactEditInputs[4].value = data.getOneContact.city || "";
    contactEditInputs[5].value = data.getOneContact.organization || "";
  } catch (error) {
    console.log(error);
  }
};

showContact();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const name = contactEditInputs[0].value;
    const phoneNumber1 = contactEditInputs[1].value;
    const phoneNumber2 = contactEditInputs[2].value;
    const email = contactEditInputs[3].value;
    const city = contactEditInputs[4].value;
    const organization = contactEditInputs[5].value;

    const res = await fetch(`/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber1,
        phoneNumber2,
        email,
        city,
        organization,
      }),
    });
    const data = await res.json();
    contactIDDOM.textContent = data.updateOneContact._id;
    contactEditInputs[0].value = data.updateOneContact.name;
    contactEditInputs[1].value = data.updateOneContact.phoneNumber1;
    contactEditInputs[2].value = data.updateOneContact.phoneNumber2;
    contactEditInputs[3].value = data.updateOneContact.email;
    contactEditInputs[4].value = data.updateOneContact.city;
    contactEditInputs[5].value = data.updateOneContact.organization;
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `Success, Contact Edited`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error.response);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `Error, Please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
