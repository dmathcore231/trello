import { Modal } from 'bootstrap'
import { $ } from './helpers.js'
import { clock } from './clock.js'
import { Todo } from './classTodo.js'
import { buildTodoTemplate } from './buildTodoTemplate.js'
import { setData } from './saveLocalStorage.js'
import { getData } from './saveLocalStorage.js'
// html elements
const btnAddTodoElement = $('#btnAddTodo')
const btnDelAllTodoElement = $('#btnDelAllTodo')
const rowElement = $('.row')
// modal add new todo
const modalFormAddNewTodoElement = $('#modalFormAddNewTodo')
const setTodoTitleElement = $('#setTodoTitle')
const setTodoDescriptionElement = $('#setTodoDescription')
const setTodoUserElement = $('#setTodoUser')
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
// clock
clock()

// class render
class Render {
  templateDefault = ''
  counterDefault = 0
  templatesActive = ''
  templatesInprogress = ''
  templateDone = ''
  constructor(collection) {
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

//check local storage
if (todoList.length == 0 && getData('todos') !== null) {
  const dataLocalStorage = getData()
  dataLocalStorage.forEach((item) => {
    todoList.push(item)
    setData(todoList)
    new Render(todoList)
  })
}

// handle
//add new todo
function handleClickBtnAddNewTodoElement(event) {
  event.preventDefault()
  todoList.push(new Todo(setTodoTitleElement.value, setTodoDescriptionElement.value, setTodoUserElement.value))
  // render(todoList)
  setData(todoList)
  new Render(todoList)
  modalFormAddNewTodoElement.reset()
}

// remove target todo
function handleClickBtnRemoveTargetTodo({ target }) {
  const findCard = target.closest('.todo-card')
  todoList.forEach((item, index) => {
    if (target.tagName == 'BUTTON' && target.getAttribute('role') == 'btnRemove' && item.id == findCard.id) {
      todoList.splice(index, 1)
      setData(todoList)
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
        setData(todoList)
        new Render(todoList)
      } else if (target.value == 2) {
        if (counterInProgressElement.textContent == 6) {
          alert('You`ve reached your limit of 6 tasks in progress. Please complete some of these before adding any new ones')
        } else {
          item.valueSelectStatus = item.selectStatus[1]
          setData(todoList)
          new Render(todoList)
        }
      } else if (target.value == 3) {
        item.valueSelectStatus = item.selectStatus[2]
        setData(todoList)
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
        setData(todoList)
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
  let message = confirm('Warning! Are you sure you want to delete all Todos?')
  if (message) {
    for (let i = 0; counterDoneElement.textContent >= i; i++) {
      todoList.forEach((item, index) => {
        if (item.valueSelectStatus == item.selectStatus[2]) {
          todoList.splice(index, 1)
        }
      })
      setData(todoList)
      new Render(todoList)
    }
  }
}

// request bd users
async function getUsers() {
  try {
    const idLink = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await idLink.json()
    users.forEach((item) => {
      const template = `
      <option value="${item.name}">${item.name}</option>
      `
      setTodoUserElement.innerHTML += template
      editTodoUserElement.innerHTML += template
    })
  } catch (error) {
    console.log('Error!')
  }
}
getUsers()

// listeners
btnDelAllTodoElement.addEventListener('click', handleClickBtnDelAllTodoElement)
modalFormEditTodoElement.addEventListener('click', handleBtnCloseModalEditTodo)
modalFormEditTodoElement.addEventListener('submit', handleClickEditModalBtnConfirm)
btnCloseModalEditElement.addEventListener('click', handleBtnCloseModalEditTodo)
modalFormAddNewTodoElement.addEventListener('submit', handleClickBtnAddNewTodoElement)
rowElement.addEventListener('click', handleClickBtnRemoveTargetTodo)
rowElement.addEventListener('change', handleChangeSelectStatus)
rowElement.addEventListener('click', handleClickBtnEditTargetTodo)
