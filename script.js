/* ===============================
   MY BUY RANK – FIXED VERSION
   프레임 1개 유지 / 카테고리 전환
=============================== */

let categories = {};
let currentCategory = null;
let editTarget = null;

document.addEventListener("DOMContentLoaded", () => {

  const navPanel = document.getElementById("navPanel");
  const categoryList = document.getElementById("categoryList");
  const frameTitle = document.getElementById("frameTitle");
  const itemList = document.getElementById("itemList");

  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  /* 카테고리 추가 */
  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if(!name || categories[name]) return;
    categories[name] = [];
    renderCategories();
    selectCategory(name);
  };

  function renderCategories(){
    categoryList.innerHTML="";
    Object.keys(categories).forEach(name=>{
      const div=document.createElement("div");
      div.className="category-item";
      div.textContent=name;
      div.onclick=()=>selectCategory(name);
      categoryList.appendChild(div);
    });
  }

  function selectCategory(name){
    currentCategory=name;
    frameTitle.textContent=name;
    navPanel.classList.remove("active");
    renderItems();
  }

  /* 팝업 열기 */
  openPopup.onclick=()=>{
    if(!currentCategory)return alert("Select category first");
    popup.style.display="flex";
    editTarget=null;
  };

  closePopup.onclick=()=>popup.style.display="none";

  addItemBtn.onclick=()=>{
    const r=rank.value.trim();
    if(!r)return;

    let card=editTarget||document.createElement("div");
    card.className="item-card";
    card.dataset.rank=r;
    card.innerHTML=`<div>${r}</div><div>${productName.value}</div><div>${memo.value}</div>`;
    categories[currentCategory].push(card);
    renderItems();
    popup.style.display="none";
  };

  function renderItems(){
    itemList.innerHTML="";
    categories[currentCategory].forEach(c=>itemList.appendChild(c));
  }
});
