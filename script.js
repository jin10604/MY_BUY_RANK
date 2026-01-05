const categoryList = document.getElementById("categoryList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const viewport = document.getElementById("viewport");
const track = document.getElementById("track");
const addItemBtn = document.getElementById("addItemBtn");

let categories = [];
let currentIndex = 0;

let isDragging = false;
let startX = 0;
let currentTranslate = 0;

function getFrameWidth() {
  return viewport.getBoundingClientRect().width;
}

function createFrame(name) {
  const frame = document.createElement("div");
  frame.className = "frame";
  frame.textContent = name;
  return frame;
}

function render() {
  categoryList.innerHTML = "";
  track.innerHTML = "";

  categories.forEach((cat, idx) => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.onclick = () => snapTo(idx);
    categoryList.appendChild(li);

    track.appendChild(createFrame(cat));
  });

  snapTo(currentIndex);
}

function snapTo(index) {
  const width = getFrameWidth();
  currentIndex = Math.max(0, Math.min(index, categories.length - 1));
  currentTranslate = -currentIndex * width;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

addCategoryBtn.onclick = () => {
  const name = prompt("카테고리 이름");
  if (!name) return;
  categories.push(name);
  render();
};

viewport.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  track.style.transform = `translateX(${currentTranslate + diff}px)`;
});

window.addEventListener("mouseup", e => {
  if (!isDragging) return;
  isDragging = false;

  const diff = e.clientX - startX;
  const width = getFrameWidth();

  if (diff < -width / 4 && currentIndex < categories.length - 1) currentIndex++;
  if (diff > width / 4 && currentIndex > 0) currentIndex--;

  snapTo(currentIndex);
});

window.addEventListener("resize", () => snapTo(currentIndex));
