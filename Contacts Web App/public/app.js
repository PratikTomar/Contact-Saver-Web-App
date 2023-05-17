const allContactsContainer = document.querySelector(".all-contacts");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".contact-form");
const contactInputs = document.querySelectorAll("input");
const formAlertDOM = document.querySelector(".form-alert");

const getAllContacts = async () => {
  try {
    const response = await fetch("/contacts");
    const { allContacts } = await response.json();
    if (allContacts.length < 1) {
      allContactsContainer.innerHTML =
        '<h5 class="empty-list">No contacts in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const contact = allContacts
      .map((contacts) => {
        return `<div class="contact">
        <table>
        <tr>
        <th>Name</th>
    <th>Contact1</th>
    <th>Contact2</th>
    <th>Email</th>
    <th>City</th>
    <th>Organization</th>
        </tr>
        <tr>
        <td class = 'contact-name'>${contacts.name}</td>
        <td class = 'contact-number1'>${contacts.phoneNumber1}</td>
        <td class = 'contact-number2'>${contacts.phoneNumber2 || ""}</td>
        <td class = 'contact-email'>${contacts.email || ""}</td>
        <td class = 'contact-city'>${contacts.city || ""}</td>
        <td class = 'contact-org'>${contacts.organization || ""}</td>
        </tr>
        </table>
        </div>
        
<div class="contact-links">

<!-- contact edit link -->
<a href="contact.html?id=${contacts._id}" class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->

<button type="button" class = 'delete-btn' data-id="${contacts._id}">
Delete Contact
</button>

</div>
</div>`;
      })
      .join("");
    allContactsContainer.innerHTML = contact;
  } catch (error) {
    allContactsContainer.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

getAllContacts();

allContactsContainer.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.dataset.id;
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      getAllContacts();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = contactInputs[0].value;
  const phoneNumber1 = contactInputs[1].value;
  const phoneNumber2 = contactInputs[2].value;
  const email = contactInputs[3].value;
  const city = contactInputs[4].value;
  const organization = contactInputs[5].value;

  try {
    const res = await fetch("/contacts", {
      method: "POST",
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
    getAllContacts();
    formAlertDOM.style.visibility = "visible";
    formAlertDOM.textContent = `Success, Contact Added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.visibility = "visible";
    formAlertDOM.innerHTML = `Error, Please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.visibility = "hidden";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
