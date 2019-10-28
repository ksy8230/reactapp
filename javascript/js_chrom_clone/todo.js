
const diaryForm = document.querySelector(".js-diaryForm");
const diaryinput = diaryForm.querySelector("input");
const diaryFormBtn = diaryForm.querySelector("button");
const diaryList = document.querySelector(".js-diaryList");
const editForm = document.createElement("form");
const editInput = document.createElement("input");

// 댓글용 선언 상수
let diarySubTxt = document.querySelector(".js-diarySubTxt");
let diarySubTxtForm = diarySubTxt.querySelector(".js-diarySubTxtForm");
let diarySubInput = diarySubTxtForm.querySelector("input");
const diarySubTxtList = document.querySelector(".js-diarySubTxtList");

let diaryArray = [];
const diaryTexts_LS = "diaryTexts";

// (5) 삭제 버튼 기능, localStorage도 같이 삭제 -- 쓰지 않는 소스
/*
function deleteDiary(e){
  const li = e.target.parentNode;
  diaryList.removeChild(li);
  const clearDiaryTextsArray = diaryArray.filter(function(diaryTexts){
    // li에 없는 id인 diaryArray를 체크한다
    // 왜냐면 그것이 우리가 지우고 싶은 것이니까
    // : 모든 diaryTexts가 li의 id와 같지 않을때
    return parseInt(diaryTexts.id) !== parseInt(li.id);
  });
  diaryArray = clearDiaryTextsArray;
  saveText(); 
}*/

// 에디터 팝업
function popupOpen(e){
  
  const li = e.target.parentNode;

  const modalPopup = document.createElement("div");
  const modalPopupOverlay = document.createElement("div");
  const modalPopupContent = document.createElement("div");
  const modalPopupDeleteBtn = document.createElement("div");
  const modalPopupEditBtn = document.createElement("div");
  //const modalPopupsubTBtn = document.createElement("div");

  modalPopup.classList.add('modal-popup');
  modalPopupOverlay.classList.add('overlay');
  modalPopupContent.classList.add('content');
  modalPopupDeleteBtn.classList.add('btn-delete');
  modalPopupEditBtn.classList.add('edit-delete');
  //modalPopupsubTBtn.classList.add('subtxt-add');
  li.append(modalPopup);
  modalPopup.appendChild(modalPopupOverlay);
  modalPopup.appendChild(modalPopupContent);
  modalPopupContent.appendChild(modalPopupDeleteBtn);
  modalPopupContent.appendChild(modalPopupEditBtn);
 //modalPopupContent.appendChild(modalPopupsubTBtn);
  modalPopupDeleteBtn.innerHTML = "삭제";
  modalPopupEditBtn.innerHTML = "수정";
  //modalPopupsubTBtn.innerHTML = "댓글 달기";

  setTimeout(function(){
    modalPopup.classList.add("open");
  },300)
  modalPopupDeleteBtn.addEventListener("click",popupDelete);
  modalPopupEditBtn.addEventListener("click",popupEdit);
  //modalPopupsubTBtn.addEventListener("click",loadSubTxt);


}

//let diarySubArray = [];
// 댓글 그리기



// 에디터 팝업 > 수정 기능
function editFormHandler(e){
  //e.preventDefault();
  const editForm = e.target;
  const editinput = editForm.childNodes[0];
  const popContent = e.target.parentNode;
  const pop = popContent.parentNode;
  const popOverlay = pop.childNodes[0];
  const li = pop.parentNode;
  const id = li.id-1;
  const span = li.childNodes[0];
  const currentText = editInput.value;
  editinput.value = "";
  span.innerHTML= currentText;
  diaryArray[id].text = currentText;

  saveText();
  popOverlay.addEventListener("click",function(){
    setTimeout(function(){
      pop.classList.remove("open");
      pop.remove();
    },300)
  });

  pop.remove();
}
// 에디터 팝업 > 수정 기능
function popupEdit(e){
  const popContent = e.target.parentNode;
  const pop = popContent.parentNode;
  const li = pop.parentNode;

  popContent.append(editForm);
  editForm.append(editInput);
  
  editForm.addEventListener("submit", editFormHandler);
}
// 에디터 팝업 > 삭제 기능
function popupDelete(e){
  const popContent = e.target.parentNode;
  const pop = popContent.parentNode;
  const li = pop.parentNode;
  li.classList.remove("add");
  setTimeout(function(){
    diaryList.removeChild(li); 
  },500);
  
  const clearDiaryTextsArray = diaryArray.filter(function(diaryTexts){
    // li에 없는 id인 diaryArray를 체크한다
    // 왜냐면 그것이 우리가 지우고 싶은 것이니까
    // : 모든 diaryTexts가 li의 id와 같지 않을때
    return parseInt(diaryTexts.id) !== parseInt(li.id);
  })

  diaryArray = clearDiaryTextsArray;
  saveText();
}

// (2) li 가 담고 있는 text 를 localStorage 저장
// JSON.stringify : string -> obj
function saveText(){
  localStorage.setItem(diaryTexts_LS,JSON.stringify(diaryArray));
}

function textPaint(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const liBtn = document.createElement("button");
  const subTxtBtn = document.createElement("button");
  subTxtBtn.classList.add("btn-sub-txt");
  liBtn.classList.add('list-btn');
  // 날짜 기재
  const date = document.createElement("em");
  const today = new Date();
  const dateDay = today.getDate();
  const dateMonth = today.getMonth() + 1;
  date.innerHTML = `${dateMonth}. ${dateDay}`;
  
  span.innerHTML = text;
  liBtn.innerHTML = "...";
  subTxtBtn.innerHTML = "댓글";
  diaryList.append(li);
  li.append(span);
  li.append(liBtn);
  li.append(date);
  li.append(subTxtBtn);
  
  setTimeout(function(){
    li.classList.add("add");
  },500);
  //deleteBtn.addEventListener("click",deleteDiary);
  liBtn.addEventListener("click",popupOpen);

  // 댓글 출력 버튼 이벤트 시작
  // 댓글 출력 (1) 버튼을 누른 부모 id를 댓글 창 폼의 부모의 부모에게 id 값 부여
  // 댓글 출력 (2) 인풋 박스는 그냥 인풋 박스가 아니라 id 값이 부여된 부모의 인풋 박스

  // 아.. 이 어레이가 textPaint 펑션 작용할때마다 빈값이 되는구나...
  let diarySubArray = [];
  subTxtBtn.addEventListener("click",loadSubTxt);
  function loadSubTxt(){
    diarySubTxt.classList.add("on");
    diarySubTxt.id = "subTxt"+id;
    diarySubTxtForm.id = "subTxtForm"+id;
    diarySubTxtForm.addEventListener("submit",SubTextHandler);
    
  }
  function SubTextHandler(e){
    e.preventDefault();
    const currentText = diarySubInput.value;
    popupSubTextPaint(currentText);
    
  }
  function popupSubTextPaint(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    diarySubTxtList.append(li);
    li.append(span);
    span.innerHTML=text;
    
    // 댓글 출력 (3) "내가 누른 버튼의 부모 id" 배열 안에 들어가야함
    const id = diarySubArray.length + 1;
    const diarySubObj = {
      text : text,
      id : id,
    }
    li.id = diarySubObj.id;
    diarySubArray.push(diarySubObj);
    saveText();
  }
  
  const id = diaryArray.length + 1;
  const diaryObj = {
    text : text,
    id : id,
    sub : diarySubArray
  }
  li.id = diaryObj.id;
  diaryArray.push(diaryObj);
  console.log(diaryArray)
  saveText();

}
// (1) 인풋에서 찍어낸 text 를 ul li 안에 넣어서 화면에 그리기
function submitHandler(e){
  e.preventDefault();
  const submitForm = e.target.parentNode;
  const submitInput = submitForm.childNodes[1];
  //submitInput.value = "";
  //console.log(submitForm)
  const currentText = diaryinput.value;
  textPaint(currentText);
  window.scrollTo(0,document.body.scrollHeight);
  
}

// (3) localStorage에 저장된 값을 새로고침을 해도 지워지지 않고 남게 하기(html 관련)
// JSON.parse : string -> obj
function loadDiary(){
  const loadedDiary_LS = localStorage.getItem(diaryTexts_LS);
  // (1) 문제 : loadedDiary_LS 배열 안에는 어플리케이션에 저장된 배열이 찍히는데
  const parsedloadedDiary_LS = JSON.parse(loadedDiary_LS);
  console.log(parsedloadedDiary_LS)
  //console.log(parsedloadedDiary_LS[2].sub[2].text)

  if(loadedDiary_LS !== null){
    
    JSON.parse(loadedDiary_LS).map(function(index){
      textPaint(index.text);
      //console.log(value.text)
      // (2) 문제 : diaryObj 속 diarySubArray 이게 문제

      console.log(index)
      //console.log(index.sub[0].text)

    })
  }

}


function init(){
  loadDiary();
  diaryForm.addEventListener("submit", submitHandler);
  diaryFormBtn.addEventListener("click", submitHandler);
  
}

init();

