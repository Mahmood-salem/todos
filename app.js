//#region DOM Elements
const todosUL = document.getElementById("todosUL");
const searchForm = document.getElementById("searchForm");
const searchText = document.getElementById("searchText");
const addForm = document.getElementById("addForm");
const addText = document.getElementById("addText");
const favorites = document.getElementById("fevIcon");

//#endregion

//#region Initial Data Source
let todosList = ["Play Tennis", "Deliver JS Assignment", "Learn New Techs"];
let favList = [];
//#endregion

//#region Create Todo List Item
const createTodoLI = (todo) => `<li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>${todo}</span>
          <div>

          <i class="fas fa-star fav "></i>
          <i class="far fa-trash-alt delete "></i>
        </li> </div>`
  ;
//#endregion

//#region Bind Todos To Dom
// دي بتستقبل ليستة و بتعيد رسمها في الصفحة
const BindTodosToDom = (todos) => {
  todosUL.innerHTML = todos.map(createTodoLI).join("");
};

const BindSingleTodo = (todo) => {
  todosUL.innerHTML += createTodoLI(todo);
};
//#endregion

//#region Search Todos
const searchTodos = (todoSearchText, list) => {
  let FilteredTodos = list.filter((todo) => todo.toLowerCase().includes(todoSearchText));
  BindTodosToDom(FilteredTodos);
  if (FilteredTodos.length == 0)
    todosUL.innerHTML = `<h3 class="text-center"> NO TODO </h3>`;
};
//#endregion

//#region Functions Calls
BindTodosToDom(todosList);
//#endregion

//#region Events Handlers

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchedText = searchText.value.toLowerCase();
  searchTodos(searchedText, todosList);
});
//#endregion


//#region Add Todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let addedText = addText.value;
  if (addedText.trim().length > 0) {
    todosList.push(addedText);
    BindSingleTodo(addedText);
  }
  addText.value = "";
});
//#endregion

//#region delete Todo
todosUL.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let todoToBeDeleted = e.target.parentElement.previousElementSibling.innerHTML;
    e.target.parentElement.parentElement.remove();
    // delete todo from main array
    let index = todosList.indexOf(todoToBeDeleted)
    todosList.splice(index, 1);

    // delete todo from Fav array
    let favIndex = favList.indexOf(todoToBeDeleted)
    if (favIndex > -1)
      favList.splice(favIndex, 1);

  }
});
//#endregion

//#region Add Todo to favorites
todosUL.addEventListener("click", (e) => {
  if (e.target.classList.contains("fav")) {
    let todofev = e.target.parentElement.previousElementSibling.innerHTML;
    console.log(e.target)
    e.target.classList.add('afterClikc')
    if (favList.indexOf(todofev) < 0)
      favList.unshift(todofev);

  }
});
//#endregion

//#region showing the fav list
favorites.addEventListener("click", (e) => {
  if (e.target.classList.contains("fevIcon")) {

    if (favList.length > 0) {
      BindTodosToDom(favList);
    } else {
      todosUL.innerHTML = `<h3 class="text-center"> NO FAV TODO </h3>`;
    }
    searchText.value = "";
  }
});
//#endregion
