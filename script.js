/* =======================================
   MY BUY RANK - FULL SCRIPT
   기존 프레임 구조 유지 / 슬라이드 이동만
======================================= */

let categories = {};
let order = [];
let currentIndex = 0;
let editTarget = null;

document.addEventListener("DOMContentLoaded", () => {

  const navPanel = document.getElementById("navPanel");
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const categoryList = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  const frameTrack = document.getElementById("frameTrack");
  const frameTitle = document.getElementById("frameTitle");
  const list = document.getElementById("itemList");

  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const deleteBtn = document.getElementById("deleteItemBtn");

  /* 네비게이션 */
  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  /* 카테고리 추가 */
  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if (!name || categories[name]) return;
    categories[name] = [];
    order.push(name);
    renderCategories();
    slideTo(order.length - 1);
  };

  function renderCategories(){
    categoryList.innerHTML="";
    order.forEach((name,i)=>{
      const div=document.createElement("div");
      div.className="category-item";
      div.textContent=name;
      div.onclick=()=>slideTo(i);
      categoryList.appendChild(div);
    });
  }

  /* 카드 슬라이드 */
  function slideTo(index){
    currentIndex=index;
    frameTrack.style.transform=`translateX(${-370*index}px)`;
    frameTitle.textContent=order[index];
    renderItems();
  }

  /* 팝업 */
  openBtn.onclick=()=>{
    popup.style.display="flex";
    editTarget=null;
    deleteBtn.style.display="none";
    clearInputs();
  };

  closeBtn.onclick=()=>popup.style.display="none";

  addBtn.onclick=()=>{
    const cat=order[currentIndex];
    const r=rank.value.trim();
    if(!r)return alert("Rank required");

    if(categories[cat].some(i=>i.dataset.rank===r && i!==editTarget)){
      alert("Duplicate rank");return;
    }

    let card=editTarget||document.createElement("div");
    card.className="item-card";
    card.dataset.rank=r;
    card.innerHTML=`<div class="rank-badge">${r}</div><div class="edit-btn">✎</div>
    <div>${productName.value}</div><div class="memo-text">${memo.value}</div>`;
    card.querySelector(".edit-btn").onclick=()=>openEdit(card);

    categories[cat]=categories[cat].filter(i=>i!==editTarget);
    categories[cat].push(card);
    categories[cat].sort((a,b)=>a.dataset.rank-b.dataset.rank);
    renderItems();
    popup.style.display="none";
  };

  deleteBtn.onclick=()=>{
    const cat=order[currentIndex];
    categories[cat]=categories[cat].filter(i=>i!==editTarget);
    renderItems();
    popup.style.display="none";
  };

  function openEdit(card){
    editTarget=card;
    rank.value=card.dataset.rank;
    popup.style.display="flex";
    deleteBtn.style.display="block";
  }

  function renderItems(){
    list.innerHTML="";
    const cat=order[currentIndex];
    if(!categories[cat])return;
    categories[cat].forEach(c=>list.appendChild(c));
  }

  function clearInputs(){
    rank.value=productName.value=price.value=memo.value=image.value="";
  }
});
