let editTarget = null;

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const addBtn = document.getElementById("addItemBtn");
  const list = document.getElementById("itemList");

  openBtn.onclick = () => {
    popup.style.display = "flex";
    clearInputs();
    editTarget = null;
  };

  closeBtn.onclick = () => popup.style.display = "none";

  addBtn.onclick = () => {
    const r = rank.value.trim();
    const name = productName.value;
    const memoVal = memo.value;
    const file = image.files[0];

    if (!r) {
      alert("Rank 는 필수입니다.");
      return;
    }

    if (!editTarget && document.querySelector(`.item-card[data-rank="${r}"]`)) {
      alert("이미 사용 중인 순위입니다.");
      return;
    }

    let card = editTarget || document.createElement("div");
    card.className = "item-card";
    card.dataset.rank = r;
    card.innerHTML = "";

    const rankDiv = document.createElement("div");
    rankDiv.className = "rank-badge";
    rankDiv.textContent = `#${r}`;
    card.appendChild(rankDiv);

    if (file) {
      const img = document.createElement("img");
      img.className = "preview-img";
      img.src = URL.createObjectURL(file);
      card.appendChild(img);
    }

    const title = document.createElement("div");
    title.textContent = name;
    card.appendChild(title);

    const memoDiv = document.createElement("div");
    memoDiv.className = "memo-preview";
    memoDiv.textContent = memoVal;
    card.appendChild(memoDiv);

    const edit = document.createElement("div");
    edit.textContent = "✎ 수정";
    edit.className = "edit-btn";
    edit.onclick = () => openEdit(card);
    card.appendChild(edit);

    if (!editTarget) list.appendChild(card);

    sortByRank();
    popup.style.display = "none";
  };

  function openEdit(card){
    editTarget = card;
    rank.value = card.dataset.rank;
    productName.value = card.children[2]?.textContent || "";
    memo.value = card.children[3]?.textContent || "";
    popup.style.display = "flex";
  }

  function sortByRank(){
    [...list.children]
      .sort((a,b)=>a.dataset.rank - b.dataset.rank)
      .forEach(el=>list.appendChild(el));
  }

  function clearInputs(){
    rank.value = productName.value = memo.value = "";
    image.value = "";
  }
});
