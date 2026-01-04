let categories = [];
let currentIndex = 0;

/* ===== 네비게이션 열기/닫기 ===== */
openNav.onclick = () => navPanel.classList.add("active");
closeNav.onclick = () => navPanel.classList.remove("active");

/* ===== 카테고리 추가 ===== */
addCategoryBtn.onclick = () => {
  if(categories.length >= 5) return alert("최대 5개까지 가능합니다.");
  const name = prompt("카테고리 이름");
  if(!name) return;
  categories.push({name, items:[]});
  renderCategories();
  renderFrames();
};

/* ===== 렌더링 ===== */
function renderCategories(){
  categoryList.innerHTML="";
  categories.forEach((c,i)=>{
    const li = document.createElement("li");
    li.textContent = c.name;
    li.onclick=()=>moveToFrame(i);
    categoryList.appendChild(li);
  });
}

function renderFrames(){
  frameTrack.innerHTML="";
  categories.forEach((c,i)=>{
    const frame = document.createElement("div");
    frame.className="frame";
    frame.innerHTML=`<h2>${c.name}</h2><button class="addBtn" onclick="openPopup(${i})">+</button>`;
    frameTrack.appendChild(frame);
  });
  moveToFrame(currentIndex);
}

/* ===== 슬라이드 이동 ===== */
function moveToFrame(i){
  currentIndex=i;
  frameTrack.style.transform=`translateX(${-i*360}px)`;
}

/* ===== 팝업 ===== */
function openPopup(i){
  popup.style.display="flex";
}
cancelPopupBtn.onclick=()=>popup.style.display="none";
