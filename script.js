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
const frameMask = document.getElementById("frameMask");
const frameTitle = document.getElementById("frameTitle");
const list = document.getElementById("itemList");

openNav.onclick = () => navPanel.classList.add("active");
closeNav.onclick = () => navPanel.classList.remove("active");

addCategoryBtn.onclick = () => {
  const name = prompt("Category name?");
  if(!name || categories[name]) return;
  categories[name] = [];
  order.push(name);
  renderCategories();
  slideTo(order.length-1);
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

function slideTo(index){
  currentIndex=index;
  const frames = document.querySelectorAll(".main-frame");
  const target = frames[0];   // 메인 프레임 고정
  const center = frameMask.clientWidth/2 - target.clientWidth/2;
  const offset = index * (target.clientWidth + 40);
  frameTrack.style.transform = `translateX(${center - offset}px)`;
  frameTitle.textContent = order[index];
}

});
