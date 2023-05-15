//  build Todo Template
function buildTodoTemplate(idTodo, createdAtTodo, titleTodo, descriptionTodo, userTodo, valueSelectStatus) {
  return `
    <div id="${idTodo}" class="todo-card m-3 p-2 border border-primary border-2 rounded-4 d-flex flex-column gap-2">
    <div class="todo-card__wrapper d-flex">
      <div class="todo-card__title w-100">Title: ${titleTodo}</div>
      <div class="todo-card__date flex-shrink-1"> ${createdAtTodo}</div>
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

export { buildTodoTemplate }
