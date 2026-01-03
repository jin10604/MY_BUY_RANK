let categories = {};
let currentCategory = null;

document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navPanel");
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const categoryList = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const frameTitle = document.getElementById("frameTitle");

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
  }
});
