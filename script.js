document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const list = document.getElementById("itemList");

  openBtn.onclick = () => {
    popup.style.display = "flex";
    rank.value = productName.value = price.value = memo.value = "";
    image.value = "";
  };

  closeBtn.onclick = () => popup.style.display = "none";

  addBtn.onclick = () => {
    if (!rank.value && !productName.value && !memo.value && !image.files[0]) {
      alert("내용을 하나 이상 입력하세요.");
      return;
    }

    const card = document.createElement("div");
    card.className = "item-card";
    card.dataset.rank = rank.value || 999;

    card.innerHTML = `
      <div class="edit-btn">✎ 수정</div>
      <div><strong>${productName.value}</strong></div>
      <div class="memo-preview">${memo.value}</div>
    `;

    list.appendChild(card);
    sortByRank();
    popup.style.display = "none";
  };

  function sortByRank(){
    const items = [...document.querySelectorAll(".item-card")];
    items.sort((a,b)=>a.dataset.rank - b.dataset.rank);
    items.forEach(i=>list.appendChild(i));
  }
});
