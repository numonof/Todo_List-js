'use strict'
let formCreate = document.getElementById("form-create");
let formEdit = document.getElementById("form-edit");
let listGroupTodo = document.getElementById("list-group-todo");
let messageCreate = document.getElementById("message-create");
let time = document.getElementById("time");

//modal
let modal = document.querySelector('#modal');
let owerlay = document.querySelector('#owerlay');
let closeBtn = document.querySelector('.close-modal')
//time elements
let fullDay = document.getElementById("full-day");
let hourEl = document.getElementById("hour");
let minuteEl = document.getElementById("minute");
let secondEl = document.getElementById("second");
let editItemId;
//chek
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length){
 showTodos();
}  

//error Message
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = " ";
  }, 2000);
}
// set Todos to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}
// Date Time
function getTime() {
  // Date
  const now = new Date();
  const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth();
  const year = now.getFullYear();
  //Time
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  //Full Day Top
  const months = [
    "Jenuary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  const monthTitle = now.getMonth();
  fullDay.textContent = ` ${day} ${months[monthTitle]} ${year}`;
  // return
  return `${hour}:${minute} ${day}.${+month + 1}.${year}`;
}
// console.log(getTime());
setInterval(getTime, 100);
// show Todos
function showTodos() {
  const todosList = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todosList.forEach((element, index) => {
    listGroupTodo.innerHTML += `
      <li ondblclick="setCompleted(${index})" class="list-group__item" id="${
        element.completed == true ?'completed' : ''
      }">
         ${element.text}
         <div class="todo-icons">
            <div class="date">${element.time}</div>
              <div class="icons" onclick=(editTodos(${index}))>
                <img src="./img/pencil.png" alt="edit icon" onclick=(editTodo(${index})) width="20" height="20">
              </div>
              <div class="icons" onclick=(deleteTodo(${index}))>
                <img src="./img/delete.png" alt="delete icon" width="20" height="20">
              </div>
          </div>
        </li>

     `;
  });
}
// get Todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const textTodos = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (textTodos.length) {
    todos.push(
      { 
      text: textTodos,
      time: getTime(),
      completed: false 
    });
    setTodos();
    showTodos();
    console.log(todos);
    console.log(textTodos);
  } else {
    showMessage("message-create", "Please, Enter some text...");
  }
});

// delete Todo
function deleteTodo(id) {
  console.log(id);
  const DeletedTodos = todos.filter((item, index) => {
    return index !== id;
  });
  todos = DeletedTodos;
  setTodos();
  showTodos();
}

//open modal
function openModal(){
  modal.classList.remove('hidden')
  owerlay.classList.remove('hidden')
}
//formEdit
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const editTodos = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (editTodos.length) {
    todos.splice(
      editItemId, 1, 
       {
       text: editTodos,
       time: getTime(), 
       completed: false 
      });

    setTodos();
    showTodos();
    closeModal()
  } else {
    showMessage("message-edit", "Please, Enter some text...");
  }
});

//edit Todos
function editTodos(id) {
  openModal()
  editItemId = id
  console.log(editItemId);
}

//close modal
closeBtn.addEventListener('click', ()=>{
  closeModal()
});
owerlay.addEventListener('click', ()=>{
  closeModal()
})
function closeModal(){
  modal.classList.add('hidden')
  owerlay.classList.add('hidden')
}
// setCompleted
function setCompleted(id) {
  const completedTodos = todos.map((item, index ) => {
    if (id == index) {
      return { ...item, completed:item.completed == false ? true : false };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  setTodos();
  showTodos();
}
console.log(todos);
