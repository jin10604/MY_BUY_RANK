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
    clearInputs();
    editTarget = null;
    deleteBtn.style.display = "none";
  };

  closeBtn.onclick = () => popup.style.display = "none";

  deleteBtn.onclick = () => {
    if(editTarget) editTarget.remove();
    popup.style.display = "none";
  };

  addBtn.onclick = () => {
    const r = rank.value.trim();
    if (!r) return alert("Rank 는 필수입니다.");

    if (!editTarget && document.querySelector(`.item-card[data-rank="${r}"]`))
      return alert("이미 사용 중인 순위입니다.");

    let card = editTarget || document.createElement("div");
    card.className = "item-card";
    card.dataset.rank = r;
    card.innerHTML = "";

    const rankDiv = document.createElement("div");
    rankDiv.className = "rank-badge";
    rankDiv.textContent = `#${r}`;
    card.appendChild(rankDiv);

    if (image.files[0]) {
      const img = document.createElement("img");
      img.className = "preview-img";
      img.src = URL.createObjectURL(image.files[0]);
      card.appendChild(img);
    }

    const title = document.createElement("div");
    title.textContent = productName.value;
    card.appendChild(title);

    const memoDiv = document.createElement("div");
    memoDiv.className = "memo-preview";
    memoDiv.textContent = memo.value;
    card.appendChild(memoDiv);

    const edit = document.createElement("div");
    edit.className = "edit-btn";
    edit.textContent = "✎ 수정";
    edit.onclick = () => openEdit(card);
    card.appendChild(edit);

    if(!editTarget) list.appendChild(card);
    sortByRank();
    popup.style.display = "none";
  };

  function openEdit(card){
    editTarget = card;
    rank.value = card.dataset.rank;
    productName.value = card.children[2]?.textContent || "";
    memo.value = card.children[3]?.textContent || "";
    deleteBtn.style.display = "block";
    popup.style.display = "flex";
  }

  function sortByRank(){
    [...list.children].sort((a,b)=>a.dataset.rank-b.dataset.rank)
      .forEach(el=>list.appendChild(el));
  }

  function clearInputs(){
    rank.value=productName.value=memo.value="";
    image.value="";
  }
});
