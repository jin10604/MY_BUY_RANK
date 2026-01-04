let categories=[];
let current=0;

openNav.onclick=()=>nav.classList.add("active");
closeNav.onclick=()=>nav.classList.remove("active");

addCategoryBtn.onclick=()=>{
  if(categories.length>=5) return alert("최대 5개");
  const name=prompt("Category name");
  if(!name) return;
  categories.push({name,items:[]});
  render();
};

function render(){
  categoryList.innerHTML="";
  frameTrack.innerHTML="";
  categories.forEach((c,i)=>{
    const cat=document.createElement("div");
    cat.textContent=c.name;
    cat.onclick=()=>move(i);
    categoryList.appendChild(cat);

    const frame=document.createElement("div");
    frame.className="frame"+(i===current?"":" inactive");
    frame.innerHTML=`<h3>${c.name}</h3><button class="add-item-btn" onclick="openPopup(${i})">＋</button>`;
    frameTrack.appendChild(frame);
  });
  move(current);
}

function move(i){
  current=i;
  frameTrack.style.transform=`translateX(${-i*340}px)`;
  document.querySelectorAll(".frame").forEach((f,idx)=>{
    f.classList.toggle("inactive",idx!==i);
  });
}

function openPopup(i){
  popup.style.display="flex";
}
closePopupBtn.onclick=()=>popup.style.display="none";
