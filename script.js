const nav=document.getElementById("sideNav");
openNav.onclick=()=>nav.classList.add("active");
closeNav.onclick=()=>nav.classList.remove("active");

const frameTrack=document.getElementById("frameTrack");
const categories=[];

document.getElementById("addCategory").onclick=()=>{
 const name=prompt("Category name?");
 if(!name)return;
 categories.push({name,items:[]});
 render();
};

function render(){
 frameTrack.innerHTML="";
 categoryList.innerHTML="";
 categories.forEach((cat,i)=>{
   const li=document.createElement("li");
   li.innerText=cat.name;
   categoryList.appendChild(li);

   const frame=document.createElement("div");
   frame.className="frame";
   cat.items.forEach(it=>{
     const d=document.createElement("div");
     d.className="item";
     d.innerText=`${it.rank}. ${it.name} / ${it.price}`;
     frame.appendChild(d);
   });
   frameTrack.appendChild(frame);
 });
 activateFrames();
}

function activateFrames(){
 const frames=[...document.querySelectorAll(".frame")];
 const w=window.innerWidth;
 frames.forEach(f=>{
   const r=f.getBoundingClientRect();
   const visible=Math.min(w,r.right)-Math.max(0,r.left);
   f.classList.toggle("active",visible> w*0.5);
 });
}
frameMask.addEventListener("scroll",activateFrames);
