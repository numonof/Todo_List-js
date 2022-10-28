"use strict";
/*Header*/
let fullDay = document.getElementById("full-day");
let hourEl = document.getElementById("hour");
let minutsEl = document.getElementById("minute");
let secondsEl = document.getElementById("second");

/*Todo Elements*/
let creatForm = document.getElementById("form-create");
let inputCreate = document.getElementById("input-create");
let messageCreate = document.getElementById("message-create");
let createBtn = document.getElementById("create-btn");
let todoList = document.getElementById("list-group-todo");

/* Edit Todo Elements*/
let editItemId;
let Modal = document.getElementById("modal");
let closeBtn = document.querySelector(".close-modal");
let editForm = document.getElementById("form-edit");
let editInput = document.getElementById("input-edit");
let messagEdit = document.getElementById("message-edit");
let owerlay  = document.getElementById("owerlay")
/* Data and Time*/
function getDate() {
  const now = new Date();
  /* console.log(now);*/
  /*Date*/
  function dateNow() {
    const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
    const year = now.getFullYear();
    /* console.log(+day, +month, year);*/
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
    const monthsTitle = now.getMonth();
    fullDay.textContent = `${+day} ${months[monthsTitle]} ${year}`;  
  return `${day}.${+month + 1}.${year}`
  };
  dateNow();
  /* console.log(dateNow());*/ 
   /*Time*/
  function time() {
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minute =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const second =
      now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    const times = `${hour} : ${minute}`;
    hourEl.textContent = hour;
    minutsEl.textContent = minute;
    secondsEl.textContent = second;
    return times;
  }
  time();
  /* console.log(time());*/
  return `${time()} ${dateNow()}`;
}
setInterval(getDate, 100);
getDate();
/* console.log(getDate());*/
/*Check todos*/
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')):[];
// console.log(todos);
if(todos.length){
showTodos()
}
// get Todos
creatForm.addEventListener('submit', (e)=>{
   e.preventDefault();
   const textContent = creatForm['input-create'].value.trim();
   creatForm.reset()
   console.log(textContent);
  if (textContent.length) {
    todos.push(
      {
        text:textContent,
        time: getDate(),
        completed:false,
      })
      setTodos()
      showTodos()
      // console.log(todos);
  }else{
    showMessage('message-create', "Please, Enter some text...");
  }
});
//errorMessage
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(()=>{
  document.getElementById(`${where}`).textContent = "";
  }, 2500)
}
 /*set Todos to localStorage*/
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}
/* show Todo List*/
function showTodos() {
  const todosListItem = JSON.parse(localStorage.getItem('list'));
  todoList.innerHTML = ''
     todosListItem.forEach((element, index) => {
  // console.log(element, index); 
  todoList.innerHTML += `
        <li ondblclick="setCompleted(${index})" class="list-group__item" id="${
          element.completed == true ?'completed' : ''
        }" >
           ${element.text}
           <div class="todo-icons">
              <div class="date">${element.time}</div>
                <div class="icons" onclick=(editTodos(${index}))>
                  <img src="./img/pencil.png" alt="edit icon" onclick=(editTodo() width="20" height="20">
                </div>
                <div class="icons" onclick=(deleteTodo(${index}))>
                  <img src="./img/delete.png" alt="delete icon" width="20" height="20">
                </div>
            </div>
          </li>`   
     });
};
// showTodos();
// Delete Todo List
function deleteTodo(id) {
  const DeletedTodoList = todos.filter((item, index)=>{
    return id !== index 
  })
  todos = DeletedTodoList;
  setTodos();
  showTodos();
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

//open edit form
function openModal(){
  Modal.classList.remove('hidden')
  owerlay.classList.remove('hidden')
}
//close modal
function closeModal(){
  Modal.classList.add('hidden')
  owerlay.classList.add('hidden')
}
closeBtn.addEventListener('click', ()=>{
  closeModal()
});
owerlay.addEventListener('click', ()=>{
  closeModal()
});
//formEdit
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editTodos = editForm['input-edit'].value.trim();
    editForm.reset();
if (editTodos.length) {
  todos.splice(editItemId , 1 , {
    text:editTodos,
    time: getDate(), 
    completed: false, 
  });
  setTodos();
  showTodos();
  closeModal();
} else {
    showMessage("message-edit", "Please, Enter some text...");
};
//   console.log(editTodos);
//   if (editTodos.lenght) {
//     todos.splice(editItemId, 1, {
//        text: editTodos,
//        time: getTime(), 
//        completed: false 
//       });
// // console.log(todos);
//     setTodos();
//     showTodos();
//     closeModal()
//   } else {
//     showMessage("message-edit", "Please, Enter some text...");
//   }
});
//edit Todos
function editTodos(id) {
  console.log(id);
  openModal()
  editItemId = id;
  // console.log(editItemId);
}