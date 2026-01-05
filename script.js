let categories = {};
let order = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navPanel");
  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if(!name || categories[name]) return;
    categories[name]=[];
    order.push(name);
    createFrame(name);
    renderCategories();
    detectActiveFrame();
  };

  function renderCategories(){
    categoryList.innerHTML="";
    order.forEach((n,i)=>{
      const d=document.createElement("div");
      d.className="category-item";
      d.textContent=n;
      d.onclick=()=>scrollToFrame(i);
      categoryList.appendChild(d);
    });
  }

  function createFrame(name){
    const frame=document.createElement("div");
    frame.className="frame main-frame inactive-frame";
    frame.innerHTML=`<div class="frame-title">${name}</div><div class="item-list"></div>`;
    frameTrack.appendChild(frame);
  }

  function scrollToFrame(i){
    const f=document.querySelectorAll(".main-frame")[i];
    f.scrollIntoView({behavior:"smooth",inline:"center"});
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
    if(best) best.classList.remove("inactive-frame");
  }

  window.addEventListener("scroll",detectActiveFrame);
  window.addEventListener("resize",detectActiveFrame);
});
