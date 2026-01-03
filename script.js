// ====== Global State ======
let categories = {};
let currentIndex = 0;

// ====== DOM Ready ======
document.addEventListener("DOMContentLoaded", () => {

  const navPanel = document.getElementById("navPanel");
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const categoryList = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const frameTrack = document.getElementById("frameTrack");
  const popup = document.getElementById("popup");
  const popupCard = document.getElementById("popupCard");

  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  // ====== Add Category ======
  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if (!name || categories[name]) return;
    categories[name] = [];
    renderCategories();
    renderFrames();
    slideTo(Object.keys(categories).length - 1);
  };

  // ====== Render Category List ======
  function renderCategories(){
    categoryList.innerHTML = "";
    Object.keys(categories).forEach((name,i)=>{
      const div = document.createElement("div");
      div.className="category-item";
      div.textContent=name;
      div.onclick=()=>slideTo(i);   // ★ 클릭 시 프레임 슬라이드
      categoryList.appendChild(div);
    });
  }

  // ====== Render Frames ======
  function renderFrames(){
    frameTrack.innerHTML="";
    Object.keys(categories).forEach(name=>{
      const sideL=document.createElement("div");
      sideL.className="frame side-frame";

      const main=document.createElement("div");
      main.className="frame main-frame";
      main.innerHTML=`
        <div class="frame-title">${name}</div>
        <div class="item-list"></div>
        <button class="add-btn">＋</button>
      `;
      main.querySelector(".add-btn").onclick = ()=>openPopup();

      const sideR=document.createElement("div");
      sideR.className="frame side-frame";

      frameTrack.append(sideL,main,sideR);
    });
  }

  // ====== Slide Function ======
  function slideTo(index){
    currentIndex=index;
    const offset = -(index*3+1)*(330+40); // main width + margin*2
    frameTrack.style.transform = `translateX(${offset}px)`;
  }

  // ====== Popup ======
  function openPopup(){
    popup.classList.add("show");
    popupCard.innerHTML=`
      <input placeholder="Rank">
      <input placeholder="Product">
      <input placeholder="Price">
      <textarea placeholder="Memo"></textarea>
      <div class="popup-actions">
        <button onclick="document.getElementById('popup').classList.remove('show')">Cancel</button>
        <button>Save</button>
      </div>
    `;
  }

});
