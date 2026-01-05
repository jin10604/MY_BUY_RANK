let categories = {};
let order = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {

const navPanel = document.getElementById("navPanel");
const openNav = document.getElementById("openNav");
const closeNav = document.getElementById("closeNav");
const categoryList = document.getElementById("categoryList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const frameTrack = document.getElementById("frameTrack");

openNav.onclick=()=>navPanel.classList.add("active");
closeNav.onclick=()=>navPanel.classList.remove("active");

addCategoryBtn.onclick=()=>{
  const name=prompt("Category name?");
  if(!name||categories[name])return;
  categories[name]=[];
  order.push(name);
  createFrame(name);
  renderCategories();
  slideTo(order.length-1);
};

function renderCategories(){
  categoryList.innerHTML="";
  order.forEach((n,i)=>{
    const d=document.createElement("div");
    d.className="category-item";
    d.textContent=n;
    d.onclick=()=>slideTo(i);
    categoryList.appendChild(d);
  });
}

function createFrame(name){
  const f=document.createElement("div");
  f.className="frame main-frame";
  f.innerHTML=`<div class="frame-title">${name}</div>
  <div class="item-list"></div>
  <button class="add-btn">＋</button>`;
  frameTrack.appendChild(f);
}

function slideTo(i){
  currentIndex=i;
  frameTrack.style.transform=`translateX(${-370*i}px)`;
}

});
