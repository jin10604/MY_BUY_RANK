const categoryList = document.getElementById("category-list");
const frameTrack = document.getElementById("frame-track");
const addCategoryBtn = document.getElementById("add-category-btn");

let categories = [];
let activeIndex = 0;

addCategoryBtn.onclick = () => {
  const name = prompt("카테고리 이름");
  if(!name) return;

  categories.push(name);
  renderCategories();
  createFrame(name);
  moveFrame(categories.length - 1);
};

function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerText = c;
    li.onclick = () => moveFrame(i);
    categoryList.appendChild(li);
  });
}

function createFrame(name) {
  const frame = document.createElement("div");
  frame.className = "buy-frame";
  frame.innerHTML = `
    <h3>${name}</h3>
    <button class="add-btn">+</button>
  `;
  frameTrack.appendChild(frame);
}

function moveFrame(index) {
  activeIndex = index;
  frameTrack.style.transform = `translateX(-${index * 384}px)`;
}
