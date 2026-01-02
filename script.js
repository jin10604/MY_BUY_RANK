document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const popup = document.getElementById("popup");
  const itemList = document.getElementById("itemList");

  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  addBtn.addEventListener("click", () => {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const memo = document.getElementById("memo").value;
    const imageInput = document.getElementById("image");

    const card = document.createElement("div");
    card.className = "item-card";

    if (imageInput.files[0]) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(imageInput.files[0]);
      card.appendChild(img);
    }

    const nameDiv = document.createElement("div");
    nameDiv.textContent = name;
    card.appendChild(nameDiv);

    const priceDiv = document.createElement("div");
    priceDiv.textContent = price;
    card.appendChild(priceDiv);

    const memoDiv = document.createElement("div");
    memoDiv.textContent = memo;
    card.appendChild(memoDiv);

    itemList.appendChild(card);
    popup.style.display = "none";
  });
});
