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

export { Todo }
