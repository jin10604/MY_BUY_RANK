/* 카테고리 데이터 저장 객체 */
let categories = {};
let currentIndex = 0;

/* DOM 연결 */
const frameTrack = document.getElementById("frameTrack");
const navPanel   = document.getElementById("navPanel");
const openNav    = document.getElementById("openNav");
const closeNav   = document.getElementById("closeNav");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const categoryList  = document.getElementById("categoryList");

/* 네비게이션 열기 / 닫기 */
openNav.onclick = () => navPanel.classList.add("active");
closeNav.onclick = () => navPanel.classList.remove("active");

/* 카테고리 추가 */
addCategoryBtn.onclick = () => {
  const name = prompt("Category name?");
  if (!name || categories[name]) return;

  categories[name] = [];
  renderCategories();
  renderFrames();
  slideTo(Object.keys(categories).length - 1);
};

/* 카테고리 목록 렌더 */
function renderCategories(){
  categoryList.innerHTML = "";
  Object.keys(categories).forEach((name, i) => {
    const div = document.createElement("div");
    div.className = "category-item";
    div.textContent = name;

    /* 카테고리 클릭 시 해당 프레임으로 슬라이드 이동 */
    div.onclick = () => slideTo(i);

    categoryList.appendChild(div);
  });
}

/* 프레임 생성 (side / main / side 묶음) */
function renderFrames(){
  frameTrack.innerHTML = "";

  Object.keys(categories).forEach(name => {
    const sideL = document.createElement("div");
    sideL.className = "frame side-frame";

    const main = document.createElement("div");
    main.className = "frame main-frame";
    main.innerHTML = `
      <div class="frame-title">${name}</div>
      <div class="item-list"></div>
      <button class="add-btn">＋</button>
    `;

    const sideR = document.createElement("div");
    sideR.className = "frame side-frame";

    frameTrack.append(sideL, main, sideR);
  });

  slideTo(0); // 첫 카테고리 중앙 고정
}

/* 카드 슬라이드 이동 계산 */
function slideTo(index){
  currentIndex = index;

  /* main-frame(330) + margin(20*2) = 370 */
  const offset = (index * 3 + 1) * 370;

  frameTrack.style.transform = `translateX(-${offset}px)`;
}
