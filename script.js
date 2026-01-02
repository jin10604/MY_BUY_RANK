let categories = {};
let currentCategory = null;
let editTarget = null;

document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navPanel");
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const categoryList = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const frameTitle = document.getElementById("frameTitle");

  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const deleteBtn = document.getElementById("deleteItemBtn");
  const list = document.getElementById("itemList");

  openNav.onclick = () => navPanel.classList.add("active");
  closeNav.onclick = () => navPanel.classList.remove("active");

  addCategoryBtn.onclick = () => {
    const name = prompt("Category name?");
    if (!name || categories[name]) return;
    categories[name] = [];
    renderCategories();
    selectCategory(name);
  };

  function renderCategories() {
    categoryList.innerHTML = "";
    Object.keys(categories).forEach(name => {
      const btn = document.createElement("div");
      btn.className = "category-item";
      btn.textContent = name;
      btn.onclick = () => selectCategory(name);
      categoryList.appendChild(btn);
    });
  }

  function selectCategory(name) {
    currentCategory = name;
    frameTitle.textContent = name;
    navPanel.classList.remove("active");
    renderItems();
  }

  openBtn.onclick = () => {
    if (!currentCategory) {
      alert("카테고리를 먼저 선택하세요.");
      return;
    }
    popup.style.display = "flex";
    editTarget = null;
    deleteBtn.style.display = "none";
    clearInputs();
  };

  closeBtn.onclick = () => popup.style.display = "none";

  addBtn.onclick = () => {
    const rankVal = rank.value.trim();
    const nameVal = productName.value.trim();

    if (!rankVal || !nameVal) {
      alert("Rank와 Product Name은 필수입니다.");
      return;
    }

    if (categories[currentCategory].some(i => i.dataset.rank === rankVal && i !== editTarget)) {
      alert("중복된 Rank 입니다.");
      return;
    }

    let card = editTarget || document.createElement("div");
    card.className = "item-card";
    card.dataset.rank = rankVal;
    card.innerHTML = "";

    const rankBadge = document.createElement("div");
    rankBadge.className = "rank-badge";
    rankBadge.textContent = rankVal + "위";
    card.appendChild(rankBadge);

    const edit = document.createElement("div");
    edit.textContent = "✎ 수정";
    edit.className = "edit-btn";
    edit.onclick = () => openEdit(card);
    card.appendChild(edit);

    if (image.files[0]) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(image.files[0]);
      card.appendChild(img);
    }

    const nameDiv = document.createElement("div");
    nameDiv.textContent = nameVal;
    card.appendChild(nameDiv);

    const memoDiv = document.createElement("div");
    memoDiv.className = "memo-text";
    memoDiv.textContent = memo.value;
    card.appendChild(memoDiv);

    categories[currentCategory] = categories[currentCategory].filter(i => i !== editTarget);
    categories[currentCategory].push(card);
    categories[currentCategory].sort((a,b)=>a.dataset.rank-b.dataset.rank);
    renderItems();

    popup.style.display = "none";
  };

  deleteBtn.onclick = () => {
    categories[currentCategory] = categories[currentCategory].filter(i => i !== editTarget);
    renderItems();
    popup.style.display = "none";
  };

  function openEdit(card) {
    editTarget = card;
    rank.value = card.dataset.rank;
    productName.value = card.children[3]?.textContent || "";
    memo.value = card.children[4]?.textContent || "";
    deleteBtn.style.display = "block";
    popup.style.display = "flex";
  }

  function renderItems() {
    list.innerHTML = "";
    categories[currentCategory].forEach(card => list.appendChild(card));
  }

  function clearInputs() {
    rank.value = "";
    productName.value = "";
    price.value = "";
    memo.value = "";
    image.value = "";
  }
});
