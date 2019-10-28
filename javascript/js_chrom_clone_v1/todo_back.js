const toDoForm = document.querySelector(".js-diaryForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-diaryList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(e){
    //console.log(e.target)
    // 이것의 부모 찾기
    const btn = e.target;
    const li = btn.parentNode;
    // remove vs removeChild
    toDoList.removeChild(li)
    // 방금 클릭한 id 가 2가 아닌 toDos를 리턴하고 싶을 때
    // li에 없는 id 인 toDos를 체크하고 싶을 때
    // 왜냐면 그것이 우리가 지우고 싶은 것이니까
    const cleantoDos = toDos.filter(function(toDo){
        // 모든 toDos가 li의 id와 같지 않을때
        return toDo.id !== parseInt(li.id);
        
    })
    toDos = cleantoDos;
    saveToDos();
    console.log(cleantoDos)
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  delBtn.addEventListener("click",deleteToDo);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();