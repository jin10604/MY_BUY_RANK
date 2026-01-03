let categories = {};
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navPanel");
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const categoryList = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const frameTrack = document.getElementById("frameTrack");

  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if (!name || categories[name]) return;
    categories[name] = [];
    renderCategories();
    renderFrames();
    slideTo(Object.keys(categories).length - 1);
  };

  function renderCategories(){
    categoryList.innerHTML = "";
    Object.keys(categories).forEach((name,i)=>{
      const div = document.createElement("div");
      div.className="category-item";
      div.textContent=name;
      div.onclick=()=>slideTo(i);
      categoryList.appendChild(div);
    });
  }

  function renderFrames(){
    frameTrack.innerHTML="";
    Object.keys(categories).forEach(name=>{
      const sideL=document.createElement("div");
      sideL.className="frame side-frame frame-wrapper";

      const main=document.createElement("div");
      main.className="frame main-frame frame-wrapper";
      main.innerHTML=`<div class="frame-title">${name}</div><div class="item-list"></div><button class="add-btn">＋</button>`;

      const sideR=document.createElement("div");
      sideR.className="frame side-frame frame-wrapper";

      frameTrack.append(sideL,main,sideR);
    });
  }

  function slideTo(index){
    currentIndex=index;
    const offset = -(index*3+1)*(330+40);
    frameTrack.style.transform = `translateX(${offset}px)`;
  }
});
