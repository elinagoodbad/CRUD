let API = "http://localhost:8000/contact";
let btn1 = document.querySelector(".addContact");
let inpAdd = document.querySelector(".inputAdd");
let inpName = document.querySelector(".input-name");
let inpSurname = document.querySelector(".input-surname");
let inpPhone = document.querySelector(".input-phone");
let inpImg = document.querySelector(".input-img");
let ol = document.querySelector(".contact-info");
const inpEdit = document.querySelector(".inpEdit");
const btnEditSave = document.querySelector(".btnEditSave");
const editModal = document.querySelector(".editModal");

//!CREATE
btn1.addEventListener("click", (e) => {
  if (
    !inpName.value.trim() ||
    !inpSurname.value.trim() ||
    !inpPhone.value.trim()
  ) {
    alert("Введите данные!");
    return;
  }
  let contactInfo = {
    info: `${inpName.value}, ${inpSurname.value}, ${inpPhone.value}`,
  };
  createContact(contactInfo);
  readContact();
  inpName.value = "";
  inpSurname.value = "";
  inpPhone.value = "";
});
function createContact(info) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(info),
  }).then(() => readContact());
}
//!READ
function readContact() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ol.innerHTML = "";
      data.forEach((elem) => {
        ol.innerHTML += `<div class="infoLi">  <img
        src="img/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector 1.svg"
        class="image"
        alt=""
      /> <h2>${elem.info}   
          <button id="${elem.id}" class="btnDelete">Delete</button>
          <button id="${elem.id}" class="btnEdit">Edit</button></h2></div>`;
      });
    });
}
readContact();
//!DELETE
document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  let id = e.target.id;
  if (del_class.includes("btnDelete")) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(() => readContact());
  }
});
//!EDIT
document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];

  let id = e.target.id;
  if (edit_class.includes("btnEdit")) {
    editModal.style.display = "block";
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEdit.value = data.info;
        btnEditSave.setAttribute("id", data.id);
      });
  }
});
btnEditSave.addEventListener("click", (e) => {
  if (!inpEdit.value.trim()) {
    alert("Введите данные!");
  }
  let editContact = {
    info: inpEdit.value,
  };
  editedContact(editContact, btnEditSave.id);
  editModal.style.display = "none";
});

function editedContact(newContact, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newContact),
  }).then(() => readContact());
}
