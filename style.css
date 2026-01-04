let categories = {};
let order = [];
let currentIndex = 0;
let editCategory = null;

document.addEventListener("DOMContentLoaded",()=>{

const catPopup=document.getElementById("catPopup");
const catTitle=document.getElementById("catTitle");
const catRank=document.getElementById("catRank");
const deleteCategoryBtn=document.getElementById("deleteCategoryBtn");
const closeCatPopup=document.getElementById("closeCatPopup");

addCategoryBtn.onclick=()=>{
 const name=prompt("Category name?");
 if(!name)return;
 categories[name]=[];
 order.push({name,rank:order.length+1});
 renderCategories(); sortByRank();
};

function renderCategories(){
 categoryList.innerHTML="";
 order.forEach((c,i)=>{
  const div=document.createElement("div");
  div.className="category-item";
  div.innerHTML=`<span>${c.name}</span><span class="cat-edit">✎</span>`;
  div.querySelector("span").onclick=()=>slideTo(i);
  div.querySelector(".cat-edit").onclick=()=>openCatPopup(c);
  categoryList.appendChild(div);
 });
}

function openCatPopup(cat){
 editCategory=cat;
 catPopup.style.display="flex";
 catTitle.textContent=cat.name;
 catRank.value=cat.rank;
 catTitle.onclick=()=>{
  const n=prompt("Rename",cat.name);
  if(!n||categories[n])return;
  categories[n]=categories[cat.name];
  delete categories[cat.name];
  cat.name=n;
  renderCategories();
 };
}

catRank.onchange=()=>{
 editCategory.rank=parseInt(catRank.value);
 sortByRank();
};

function sortByRank(){
 order.sort((a,b)=>a.rank-b.rank);
 renderCategories();
 slideTo(0);
}

deleteCategoryBtn.onclick=()=>{
 if(!confirm("Delete?"))return;
 delete categories[editCategory.name];
 order=order.filter(o=>o!==editCategory);
 catPopup.style.display="none";
 renderCategories();
};

closeCatPopup.onclick=()=>catPopup.style.display="none";

});
