let editTarget = null;

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const deleteBtn = document.getElementById("deleteItemBtn");
  const list = document.getElementById("itemList");

  openBtn.onclick = () => {
    popup.style.display = "flex";
    editTarget = null;
    deleteBtn.style.display = "none";
    clearInputs();
  };

  closeBtn.onclick = () => popup.style.display = "none";

  addBtn.onclick = () => {
    const nameVal = productName.value;
    const priceVal = price.value;
    const memoVal = memo.value;
    const file = image.files[0];

    let card = editTarget || document.createElement("div");
    card.className = "item-card";
    card.innerHTML = "";

    const edit = document.createElement("div");
    edit.textContent = "✎ 수정";
    edit.className = "edit-btn";
    edit.onclick = () => openEdit(card, nameVal, priceVal, memoVal);
    card.appendChild(edit);

    if (file) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      card.appendChild(img);
    }

    [nameVal, priceVal, memoVal].forEach(text => {
      const d = document.createElement("div");
      d.textContent = text;
      card.appendChild(d);
    });

    if (!editTarget) list.appendChild(card);
    popup.style.display = "none";
  };

  deleteBtn.onclick = () => {
    if (editTarget) editTarget.remove();
    popup.style.display = "none";
  };

  function openEdit(card, n, p, m) {
    editTarget = card;
    productName.value = n;
    price.value = p;
    memo.value = m;
    deleteBtn.style.display = "block";
    popup.style.display = "flex";
  }

  function clearInputs() {
    productName.value = "";
    price.value = "";
    memo.value = "";
    image.value = "";
  }
});
