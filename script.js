const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

openBtn.onclick = () => modal.classList.remove("hidden");
cancelBtn.onclick = () => modal.classList.add("hidden");

addBtn.onclick = () => {
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;
  const memo = document.getElementById("itemMemo").value;
  const file = document.getElementById("itemImage").files[0];

  if(!name) return;

  const item = document.createElement("div");
  item.className="item";

  if(file){
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    item.appendChild(img);
  }

  const txt = document.createElement("p");
  txt.innerText = `${name}\n${price}\n${memo}`;
  item.appendChild(txt);

  itemList.appendChild(item);
  modal.classList.add("hidden");
};
