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
// modal edit
const modalFormEditTodoElement = $('#modalFormEditTodo')
const editTodoTitleElement = $('#editTodoTitle')
const editTodoDescriptionElement = $('#editTodoDescription')
const editTodoUserElement = $('#editTodoUser')
const btnCloseModalEditElement = $('#btnCloseModalEdit')
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
const editTodoList = []
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
        <select id="123" class="form-select select-status">
          <option selected disabled>Select status</option>
          <option value="1">Todo</option>
          <option value="2">In progress</option>
          <option value="3">Done</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary me-1 ms-2 btnEditTodo" data-bs-toggle="modal"
      data-bs-target="#modalScreenEditTodo" role="btnEdit">Edit</button>
      <button type="button" class="btn btn-danger me-1 ms-1" role="btnRemove">Remove</button>
    </div>
  </div>
 `
}
// class render
class Render {
  templateDefault = ''
  counterDefault = 0
  constructor(collection) {
    this.templatesActive = ''
    this.templatesInprogress = ''
    this.templateDone = ''
    this.collection = collection
    this.activeTodo = []
    this.inProgressTodo = []
    this.doneTodo = []
    this.checkStatus()
    this.renderActiveTodo()
    this.renderInProgress()
    this.renderDone()
  }
  checkStatus() {
    this.collection.forEach((item) => {
      if (item.valueSelectStatus == item.selectStatus[0]) {
        this.activeTodo.push(item)
      } else if (item.valueSelectStatus == item.selectStatus[1]) {
        this.inProgressTodo.push(item)
      } else if (item.valueSelectStatus == item.selectStatus[2]) {
        this.doneTodo.push(item)
      }
    })
  }
  renderActiveTodo() {
    activeTodoCardListElement.innerHTML = this.templateDefault
    counterActiveTodoElement.innerHTML = this.counterDefault
    this.activeTodo.forEach((item) => {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      this.templatesActive = this.templatesActive + template
      activeTodoCardListElement.innerHTML = this.templatesActive
      counterActiveTodoElement.innerHTML = this.activeTodo.length
    })
  }
  renderInProgress() {
    inProgressTodoCardListElement.innerHTML = this.templateDefault
    counterInProgressElement.innerHTML = this.counterDefault
    this.inProgressTodo.forEach((item) => {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      this.templatesInprogress = this.templatesInprogress + template
      inProgressTodoCardListElement.innerHTML = this.templatesInprogress
      counterInProgressElement.innerHTML = this.inProgressTodo.length
    })
  }
  renderDone() {
    doneTodoCardListElement.innerHTML = this.templateDefault
    counterDoneElement.innerHTML = this.counterDefault
    this.doneTodo.forEach((item) => {
      const template = buildTodoTemplate(item.id, item.createdAt, item.title, item.description, item.user, item.valueSelectStatus)
      this.templateDone = this.templateDone + template
      doneTodoCardListElement.innerHTML = this.templateDone
      counterDoneElement.innerHTML = this.doneTodo.length
    })
  }
}
//add new todo
function handleClickBtnAddNewTodoElement(event) {
  event.preventDefault()
  todoList.push(new Todo(setTodoTitleElement.value, setTodoDescriptionElement.value, setTodoUserElement.value))
  // render(todoList)
  new Render(todoList)
  modalFormAddNewTodoElement.reset()
}
// remove target todo
function handleClickBtnRemoveTargetTodo({ target }) {
  const findCard = target.closest('.todo-card')
  todoList.forEach((item, index) => {
    if (target.tagName == 'BUTTON' && target.getAttribute('role') == 'btnRemove' && item.id == findCard.id) {
      todoList.splice(index, 1)
      new Render(todoList)
    }
  })
}

// check select value
function handleChangeSelectStatus({ target }) {
  const findCard = target.closest('.todo-card')
  todoList.forEach((item) => {
    if (target.tagName == 'SELECT' && findCard.id == item.id) {
      if (target.value == 1) {
        item.valueSelectStatus = item.selectStatus[0]
        new Render(todoList)
      } else if (target.value == 2) {
        if (counterInProgressElement.textContent == 6) {
          alert('You`ve reached your limit of 6 tasks in progress. Please complete some of these before adding any new ones')
        } else {
          item.valueSelectStatus = item.selectStatus[1]
          new Render(todoList)
        }
      } else if (target.value == 3) {
        item.valueSelectStatus = item.selectStatus[2]
        new Render(todoList)
      }
    }
  })
}

// get data (press btnEdit)
function handleClickBtnEditTargetTodo({ target }) {
  const findCard = target.closest('.todo-card')
  todoList.forEach((item) => {
    if (target.tagName == 'BUTTON' && target.getAttribute('role') == 'btnEdit' && item.id == findCard.id) {
      editTodoTitleElement.value = item.title
      editTodoDescriptionElement.value = item.description
      editTodoUserElement.value = item.user
      editTodoList.push(item)
    }
  })
}

// set data(edit modal)
function handleClickEditModalBtnConfirm() {
  event.preventDefault()
  editTodoList.forEach((item) => {
    let valueItem = item
    todoList.forEach((item) => {
      if (valueItem.id == item.id) {
        item.title = editTodoTitleElement.value
        item.description = editTodoDescriptionElement.value
        item.user = editTodoUserElement.value
        editTodoList.length = 0
        new Render(todoList)
      }
    })
  })
  modalFormEditTodoElement.reset()
}

// press btn close
function handleBtnCloseModalEditTodo({ target }) {
  if (target.getAttribute('role') == 'btnCloseModalEdit') {
    editTodoList.length = 0
  }
}

// remove all
function handleClickBtnDelAllTodoElement() {
  for (let i = 0; counterDoneElement.textContent >= i; i++) {
    todoList.forEach((item, index) => {
      if (item.valueSelectStatus == item.selectStatus[2]) {
        todoList.splice(index, 1)
      }
    })
    new Render(todoList)
  }
}
// handle
btnDelAllTodoElement.addEventListener('click', handleClickBtnDelAllTodoElement)
modalFormEditTodoElement.addEventListener('click', handleBtnCloseModalEditTodo)
modalFormEditTodoElement.addEventListener('submit', handleClickEditModalBtnConfirm)
btnCloseModalEditElement.addEventListener('click', handleBtnCloseModalEditTodo)
modalFormAddNewTodoElement.addEventListener('submit', handleClickBtnAddNewTodoElement)
rowElement.addEventListener('click', handleClickBtnRemoveTargetTodo)
rowElement.addEventListener('change', handleChangeSelectStatus)
rowElement.addEventListener('click', handleClickBtnEditTargetTodo)
