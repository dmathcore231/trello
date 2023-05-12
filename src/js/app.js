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

  constructor(title = 'Title new Todo', description = 'My first Todo', user = 'Anonymous', valueSelectStatus = this.selectStatus[0]) {
    this.title = title,
      this.description = description,
      this.user = user,
      this.valueSelectStatus = valueSelectStatus
  }
}

const test = new Todo()
console.log(test)

