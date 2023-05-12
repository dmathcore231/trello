import { Modal } from 'bootstrap'
// helpers
function $(selector) {
  return document.querySelector(selector)
}
// html elements
const btnAddTodoElement = $('#btnAddTodo')
const btnDelAllTodoElement = $('#btnDelAllTodo')
const rowElement = $('.row')
// modal add new todo
const modalFormAddNewTodoElement = $('#modalFormAddNewTodo')
const setTodoTitleElement = $('#setTodoTitle')
const setTodoDescriptionElement = $('#setTodoDescription')
const setTodoUserElement = $('#setTodoUser')
const btnCloseModalAddTodoElement = $('#btnCloseModalAddTodo')
const btnConfirmModalAddTodoElement = $('#btnConfirmModalAddTodo')
// col list
const activeTodoCardListElement = $('#activeTodoCardList')
const inProgressTodoCardListElement = $('#inProgressTodoCardList')
const doneTodoCardListElement = $('#doneTodoCardList')
// counter
const counterActiveTodoElement = $('#counterActiveTodo')
const counterInProgressElement = $('#counterInProgress')
const counterDoneElement = $('#counterDone')
// arr todo
const todoList = []
// class (template todo)
class Todo {
  id = crypto.randomUUID()
  createdAt = new Date().toUTCString()
  selectStatus = ['activeTodo', 'inProgress', 'done']
  titleDefault = 'Title new Todo'
  descriptionDefault = 'My first Todo'
  userDefault = 'Anonymous'
  constructor(title, description, user, valueSelectStatus = this.selectStatus[0]) {
    this.title = title || this.titleDefault,
      this.description = description || this.descriptionDefault,
      this.user = user == 'Select User' ? this.userDefault : user,
      this.valueSelectStatus = valueSelectStatus
  }
}
//  build Todo Template
function buildTodoTemplate(idTodo, createdAtTodo, titleTodo, descriptionTodo, userTodo, valueSelectStatus) {
  return `
    <div id="${idTodo}" class="todo-card m-3 p-2 border border-success border-2 rounded-4 d-flex flex-column gap-2">
    <div class="todo-card__wrapper d-flex justify-content-between">
      <div class="todo-card__title">Title: ${titleTodo}</div>
      <div class="todo-card__date"> ${createdAtTodo}</div>
    </div>
    <div class="todo-card__description">Description: ${descriptionTodo}</div>
    <div class="todo-card__user">User: ${userTodo}</div>
    <div class="todo-card__wrapper d-flex">
      <div class="input-group">
        <select class="form-select select-status">
          <option selected disabled>Select status</option>
          <option value="1">Todo</option>
          <option value="2">In progress</option>
          <option value="3">Done</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary me-1 ms-2 btnEditTodo" data-bs-toggle="modal"
      data-bs-target="#modalScreenEditTodo">Edit</button>
      <button type="button" class="btn btn-danger me-1 ms-1">Remove</button>
    </div>
  </div>
 `
}

// render
function render(collection = []) {
  let templates = ``
  let valueCounterTodo = 0
  let valueCounterInProgress = 0
  let valueCounterDone = 0
  //check selectStatus
  collection.forEach((item) => {
    if (item.valueSelectStatus == item.selectStatus[0]) {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      templates = templates + template
      valueCounterTodo++
      activeTodoCardListElement.innerHTML = templates
      counterActiveTodoElement.innerHTML = valueCounterTodo
    } else if (item.valueSelectStatus == item.selectStatus[1]) {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      templates = templates + template
      valueCounterInProgress++
      inProgressTodoCardListElement.innerHTML = templates
      counterInProgressElement.innerHTML = valueCounterInProgress
    } else if (item.valueSelectStatus == item.selectStatus[2]) {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      templates = templates + template
      valueCounterDone++
      doneTodoCardListElement.innerHTML = templates
      counterDoneElement.innerHTML = valueCounterDone
    }
  })
}

//add new todo
// modal new todo
function handleClickBtnAddNewTodoElement(event) {
  event.preventDefault()
  todoList.push(new Todo(setTodoTitleElement.value, setTodoDescriptionElement.value, setTodoUserElement.value))
  render(todoList)
  modalFormAddNewTodoElement.reset()
}

// handle
modalFormAddNewTodoElement.addEventListener('submit', handleClickBtnAddNewTodoElement)
