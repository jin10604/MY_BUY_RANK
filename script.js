let categories={}, order=[], currentIndex=0;

document.addEventListener("DOMContentLoaded",()=>{
const navPanel=navPanel=document.getElementById("navPanel");
openNav.onclick=()=>navPanel.classList.add("active");
closeNav.onclick=()=>navPanel.classList.remove("active");

addCategoryBtn.onclick=()=>{
 const name=prompt("Category name?");
 if(!name||categories[name])return;
 categories[name]=[];
 order.push(name);
 createFrame(name);
 renderCategories();
 detectActiveFrame();
};

function createFrame(name){
 const f=document.createElement("div");
 f.className="main-frame inactive-frame";
 f.innerHTML=`<div class="frame-title">${name}</div><div class="item-list"></div><button class="add-btn">＋</button>`;
 frameTrack.appendChild(f);
}

function renderCategories(){
 categoryList.innerHTML="";
 order.forEach((n,i)=>{
  const d=document.createElement("div");
  d.className="category-item";
  d.textContent=n;
  d.onclick=()=>frameTrack.children[i].scrollIntoView({behavior:"smooth",inline:"center"});
  categoryList.appendChild(d);
 });
}

function detectActiveFrame(){
 const frames=document.querySelectorAll(".main-frame");
 const center=window.innerWidth/2;
 let best=null,bestRatio=0;
 frames.forEach(f=>{
  const r=f.getBoundingClientRect();
  const v=Math.min(r.right,center*1.5)-Math.max(r.left,center*0.5);
  const ratio=v/r.width;
  if(ratio>bestRatio){bestRatio=ratio;best=f;}
 });
 frames.forEach(f=>f.classList.add("inactive-frame"));
 if(best)best.classList.remove("inactive-frame");
}

frameTrack.addEventListener("scroll",detectActiveFrame);
window.addEventListener("resize",detectActiveFrame);
});
