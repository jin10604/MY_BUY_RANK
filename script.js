const carousel = document.getElementById("carousel");
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");

let frames = [];

function createFrame(){
  const frame = document.createElement("div");
  frame.className = "frame";
  carousel.appendChild(frame);
  frames.push(frame);
}

createFrame();
createFrame();
createFrame();

function updateScale(){
  const center = window.innerWidth / 2;
  frames.forEach(frame=>{
    const rect = frame.getBoundingClientRect();
    const frameCenter = rect.left + rect.width/2;
    const dist = Math.abs(center - frameCenter);
    frame.classList.toggle("active", dist < 120);
    frame.classList.toggle("side", dist >= 120);
  });
}

carousel.addEventListener("scroll", updateScale);
updateScale();

openModal.onclick = ()=> modal.classList.add("show");
cancelBtn.onclick = ()=> modal.classList.remove("show");

addBtn.onclick = ()=>{
  const title = document.getElementById("itemTitle").value;
  if(!title) return;

  const item = document.createElement("div");
  item.className="item";
  item.innerText=title;

  frames.find(f=>f.classList.contains("active")).appendChild(item);
  modal.classList.remove("show");
};
