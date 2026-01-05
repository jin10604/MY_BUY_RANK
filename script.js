const categoryList = document.getElementById("categoryList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const viewport = document.getElementById("viewport");
const track = document.getElementById("track");

let categories = [];
let currentIndex = 0;
let frameWidth = viewport.offsetWidth;
let startX = 0;
let currentTranslate = 0;
let isDragging = false;

/* 카테고리 추가 */
addCategoryBtn.onclick = () => {
  const name = prompt("카테고리 이름");
  if (!name) return;

  categories.push(name);
  renderCategories();
  renderFrames();
  snapTo(categories.length - 1);
};

/* 사이드바 */
function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((c, i) => {
    const div = document.createElement("div");
    div.textContent = c;
    div.style.cursor = "pointer";
    div.onclick = () => snapTo(i);
    categoryList.appendChild(div);
  });
}

/* 프레임 생성 */
function renderFrames() {
  track.innerHTML = "";
  categories.forEach(name => {
    const f = document.createElement("div");
    f.className = "frame";
    f.textContent = name;
    track.appendChild(f);
  });
}

/* 중앙 스냅 */
function snapTo(index) {
  frameWidth = viewport.offsetWidth;
  currentIndex = Math.max(0, Math.min(index, categories.length - 1));
  currentTranslate = -currentIndex * frameWidth;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

/* 드래그 */
viewport.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", e => {
  if (!isDragging) return;
  isDragging = false;

  const moved = e.clientX - startX;
  if (moved < -frameWidth / 4 && currentIndex < categories.length - 1) currentIndex++;
  if (moved > frameWidth / 4 && currentIndex > 0) currentIndex--;

  snapTo(currentIndex);
});

viewport.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  track.style.transform = `translateX(${currentTranslate + delta}px)`;
});

/* 반응형 대응 */
window.addEventListener("resize", () => snapTo(currentIndex));
