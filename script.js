const categoryList = document.getElementById("categoryList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const frameTrack = document.getElementById("frameTrack");
const viewport = document.getElementById("frameViewport");

let categories = [];
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;

addCategoryBtn.onclick = () => {
  const name = prompt("카테고리 이름");
  if (!name) return;

  categories.push(name);
  renderCategories();
  renderFrames();
  moveTo(categories.length - 1);
};

function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((c, i) => {
    const div = document.createElement("div");
    div.textContent = c;
    div.style.cursor = "pointer";
    div.onclick = () => moveTo(i);
    categoryList.appendChild(div);
  });
}

function renderFrames() {
  frameTrack.innerHTML = "";
  categories.forEach(name => {
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.textContent = name;
    frameTrack.appendChild(frame);
  });
}

function moveTo(index) {
  currentIndex = index;
  currentTranslate = -index * 340;
  frameTrack.style.transform = `translateX(${currentTranslate}px)`;
}

/* Drag Slide */

viewport.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", e => {
  if (!isDragging) return;
  isDragging = false;

  const moved = e.clientX - startX;

  if (moved < -80 && currentIndex < categories.length - 1) currentIndex++;
  if (moved > 80 && currentIndex > 0) currentIndex--;

  moveTo(currentIndex);
});

viewport.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  frameTrack.style.transform = `translateX(${currentTranslate + delta}px)`;
});
