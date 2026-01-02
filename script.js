let categories = ["Default"];
let currentCategory = "Default";
let items = { Default: [] };
let editIndex = null;

/* ---------- 기본 요소 ---------- */
const navBtn = document.querySelector(".nav-btn");
const navPanel = document.querySelector(".nav-panel");
const closeNavBtn = document.querySelector(".close-nav");
const categoryList = document.querySelector(".category-list");
const addCategoryBtn = document.querySelector(".add-category");
const frameTitle = document.querySelector(".frame-title");
const itemList = document.querySelector(".item-list");
const addBtn = document.querySelector(".add-btn");

const popup = document.querySelector(".popup-overlay");
const saveBtn = document.querySelector("#saveItem");
const cancelBtn = document.querySelector("#cancelItem");
const deleteBtn = document.querySelector("#deleteItem");

const rankInput = document.querySelector("#rank");
const nameInput = document.querySelector("#productName");
const priceInput = document.querySelector("#price");
const memoInput = document.querySelector("#memo");
const imageInput = document.querySelector("#image");

/* ---------- 네비게이션 ---------- */
navBtn.onclick = () => navPanel.classList.add("active");
closeNavBtn.onclick = () => navPanel.classList.remove("active");

/* ---------- 카테고리 ---------- */
function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => {
      currentCategory = cat;
      frameTitle.textContent = cat;
      navPanel.classList.remove("active");
      renderItems();
    };
    categoryList.appendChild(btn);
  });
}
addCategoryBtn.onclick = () => {
  const name = prompt("카테고리 이름 입력");
  if (!name) return;
  categories.push(name);
  items[name] = [];
  renderCategories();
};

/* ---------- 아이템 ---------- */
function renderItems() {
  itemList.innerHTML = "";
  items[currentCategory]
    .sort((a,b)=>a.rank-b.rank)
    .forEach((item,i)=>{
      const card = document.createElement("div");
      card.className = "item-card";

      card.innerHTML = `
        <div class="rank-badge">#${item.rank}</div>
        <div>${item.name}</div>
        <div>${item.price}</div>
        <div class="memo-text">${item.memo}</div>
        ${item.image?`<img src="${item.image}">`:""}
        <div class="edit-btn">수정</div>
      `;

      card.querySelector(".edit-btn").onclick=()=>{
        editIndex=i;
        rankInput.value=item.rank;
        nameInput.value=item.name;
        priceInput.value=item.price;
        memoInput.value=item.memo;
        popup.style.display="flex";
        deleteBtn.style.display="block";
      };
      itemList.appendChild(card);
    });
}

addBtn.onclick = ()=>{
  editIndex=null;
  rankInput.value="";
  nameInput.value="";
  priceInput.value="";
  memoInput.value="";
  imageInput.value="";
  deleteBtn.style.display="none";
  popup.style.display="flex";
};

/* ---------- 저장 ---------- */
saveBtn.onclick=()=>{
  if(!rankInput.value||!nameInput.value)return alert("순위와 상품명은 필수입니다.");

  const rank=Number(rankInput.value);
  if(items[currentCategory].some((v,i)=>v.rank===rank&&i!==editIndex))
    return alert("중복된 순위가 있습니다.");

  const file=imageInput.files[0];
  const img=file?URL.createObjectURL(file):null;

  const data={
    rank,
    name:nameInput.value,
    price:priceInput.value,
    memo:memoInput.value,
    image:img
  };

  if(editIndex===null) items[currentCategory].push(data);
  else items[currentCategory][editIndex]=data;

  popup.style.display="none";
  renderItems();
};

/* ---------- 삭제 ---------- */
deleteBtn.onclick=()=>{
  if(editIndex!==null) items[currentCategory].splice(editIndex,1);
  popup.style.display="none";
  renderItems();
};

cancelBtn.onclick=()=>popup.style.display="none";

/* ---------- 초기 ---------- */
frameTitle.textContent=currentCategory;
renderCategories();
renderItems();
