// local storage
// setData
function setData(value) {
  // JSON
  let valueJson = JSON.stringify(value)
  localStorage.setItem('todos', valueJson)
  return valueJson
}
// getData
function getData() {
  let valueJson = localStorage.getItem('todos')
  // JsonInObj
  let valueInObj = JSON.parse(valueJson)
  return valueInObj
}

export { setData, getData }
