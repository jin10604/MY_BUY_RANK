const frameTrack = document.getElementById("frameTrack");
const categoryList = document.getElementById("categoryList");
const popup = document.getElementById("popup");

let frames = [];
let currentIndex = -1;

document.getElementById("addCategoryBtn").onclick = () => {
  if(frames.length >= 5) return alert("카테고리는 최대 5개입니다.");

  const name = prompt("Category name?");
  if(!name) return;

  createFrame(name);
};

function createFrame(name){
  // ===== 프레임 DOM 생성 =====
  const frame = document.createElement("div");
  frame.className = "frame main-frame";
  frame.innerHTML = `
    <div class="frame-title">${name}</div>
    <div class="item-list"></div>
    <button class="add-btn">＋</button>
  `;

  frame.querySelector(".add-btn").onclick = () => openPopup(frame);
  frameTrack.appendChild(frame);
  frames.push(frame);

  renderCategories();
  slideTo(frames.length-1);
}

function renderCategories(){
  categoryList.innerHTML="";
  frames.forEach((f,i)=>{
    const div=document.createElement("div");
    div.className="category-item";
    div.textContent=f.querySelector(".frame-title").textContent;
    div.onclick=()=>slideTo(i);
    categoryList.appendChild(div);
  });
}

function slideTo(index){
  currentIndex=index;
  frameTrack.style.transform=`translateX(${-350*index}px)`;
  frames.forEach((f,i)=>{
    f.className = "frame " + (i===index?"main-frame":"side-frame");
  });
}

/* ===== Popup ===== */
let currentFrame=null;

function openPopup(frame){
  currentFrame=frame;
  popup.style.display="flex";
}

document.getElementById("closePopup").onclick=()=>popup.style.display="none";

document.getElementById("addItemBtn").onclick=()=>{
  const list=currentFrame.querySelector(".item-list");
  const card=document.createElement("div");
  card.className="item-card";
  card.textContent=document.getElementById("productName").value;
  list.appendChild(card);
  popup.style.display="none";
};
