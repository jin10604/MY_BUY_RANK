// ====================== 데이터 저장소 ======================

let frames = [];
let categories = [];
let activeFrameId = null;

// ====================== DOM ======================

const frameTrack = document.getElementById('frameTrack');
const addFrameBtn = document.getElementById('addFrameBtn');
const categoryList = document.getElementById('categoryList');
const addCategoryBtn = document.getElementById('addCategoryBtn');

// ====================== 프레임 생성 ======================

function createFrame() {

  const id = Date.now().toString();

  frames.push({ id });
  activeFrameId = id;

  renderFrames();
  slideToActiveFrame();
}

// ====================== 프레임 렌더 ======================

function renderFrames() {

  frameTrack.innerHTML = '';

  frames.forEach(frame => {

    const div = document.createElement('div');
    div.className = 'frame';
    div.innerText = 'EMPTY';
    div.dataset.id = frame.id;

    frameTrack.appendChild(div);
  });
}

// ====================== 슬라이드 이동 ======================

function slideToActiveFrame() {

  const index = frames.findIndex(f => f.id === activeFrameId);
  const offset = index * 440;

  frameTrack.style.transform = `translateX(${-offset}px)`;
}

// ====================== 카테고리 생성 ======================

addCategoryBtn.onclick = () => {

  if (!activeFrameId) return;

  const id = Date.now().toString();

  categories.push({
    id,
    frameId: activeFrameId
  });

  renderCategories();
};

// ====================== 카테고리 렌더 ======================

function renderCategories() {

  categoryList.innerHTML = '';

  categories.forEach(cat => {

    const div = document.createElement('div');
    div.innerText = 'Category';
    div.onclick = () => {

      activeFrameId = cat.frameId;
      slideToActiveFrame();
    };

    categoryList.appendChild(div);
  });
}

// ====================== 프레임 추가 버튼 ======================

addFrameBtn.onclick = createFrame;

// ====================== 최초 1개 프레임 생성 ======================

createFrame();
