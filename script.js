let categories = {
  "Default": []
};

let currentCategory = "Default";
let editingIndex = null;

const navBtn = document.querySelector(".nav-btn");
const navPanel = document.querySelector(".nav-panel");
const navClose = document.querySelector(".nav-close");
const navList = document.querySelector(".nav-list");
const frameTitle = document.querySelector(".frame-title");

const addBtn = document.querySelector(".add-btn");
const popup = document.querySelector(".popup-overlay");
const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const inputRank = document.querySelector("#input-rank");
const inputTitle = document.querySelector("#input-title");
const inputMemo = document.querySelector("#input-memo");

const itemList = document.querySelector(".item-list");

/* ---------- NAVIGATION ---------- */

navBtn.addEventListener("click", () => {
  navPanel.classList.add("open");
});

navClose.addEventListener("click", () => {
  navPanel.classList.remove("open");
});

function renderNav(){
  navList.innerHTML = "";
  Object.keys(categories).forEach(cat=>{
    const btn = document.createElement("button");
    btn.className = "nav-category";
    btn.textContent = cat;
    btn.onclick = () => {
      currentCategory = cat;
      frameTitle.textContent = cat;
      navPanel.classList.remove("open");
      renderItems();
    };
    navList.appendChild(btn);
  });
}

/* ---------- ITEMS ---------- */

function renderItems(){
  itemList.innerHTML = "";
  const sorted = [...categories[currentCategory]].sort((a,b)=>a.rank-b.rank);
  sorted.forEach((item,idx)=>{
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div style="font-size:20px;font-weight:600;">${item.rank}등</div>
      <div>${item.title}</div>
      <div>${item.memo}</div>
      <div class="edit-btn">수정</div>
    `;
    card.querySelector(".edit-btn").onclick = ()=>{
      editingIndex = idx;
      inputRank.value = item.rank;
      inputTitle.value = item.title;
      inputMemo.value = item.memo;
      popup.classList.add("open");
    };
    itemList.appendChild(card);
  });
}

/* ---------- ADD ITEM ---------- */

addBtn.addEventListener("click",()=>{
  editingIndex = null;
  inputRank.value="";
  inputTitle.value="";
  inputMemo.value="";
  popup.classList.add("open");
});

cancelBtn.addEventListener("click",()=>{
  popup.classList.remove("open");
});

/* ---------- SAVE ---------- */

saveBtn.addEventListener("click",()=>{
  const rank = Number(inputRank.value);
  if(categories[currentCategory].some(i=>i.rank===rank && editingIndex===null)){
    alert("이미 사용된 순위입니다.");
    return;
  }

  const data = {
    rank,
    title: inputTitle.value,
    memo: inputMemo.value
  };

  if(editingIndex===null){
    categories[currentCategory].push(data);
  }else{
    categories[currentCategory][editingIndex] = data;
  }

  popup.classList.remove("open");
  renderItems();
});

/* ---------- INIT ---------- */

renderNav();
frameTitle.textContent = currentCategory;
renderItems();
