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
  activeIndex = categories.length - 1;
  updateFramePosition();
};

function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerText = c;
    li.onclick = () => {
      activeIndex = i;
      updateFramePosition();
    };
    categoryList.appendChild(li);
  });
}

function createFrame(name) {
  const frame = document.createElement("div");
  frame.className = "buy-frame";
  frame.innerHTML = `
    <h3>${name}</h3>
    <div class="item-list"></div>
    <button class="add-item-btn">+</button>
    <div class="item-input-container hidden">
      <input placeholder="Rank">
      <input placeholder="Product">
      <textarea placeholder="Memo"></textarea>
      <input placeholder="Price">
      <button class="cancel">Cancel</button>
    </div>
  `;

  frame.querySelector(".add-item-btn").onclick = () => {
    frame.querySelector(".item-input-container").classList.toggle("hidden");
  };

  frame.querySelector(".cancel").onclick = () => {
    frame.querySelector(".item-input-container").classList.add("hidden");
  };

  frameTrack.appendChild(frame);
}

function updateFramePosition() {
  frameTrack.style.transform = `translateX(-${activeIndex * 380}px)`;
}
