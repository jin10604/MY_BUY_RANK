let editTarget=null;

const popup=document.getElementById("popup");
const list=document.getElementById("itemList");
const rankInput=document.getElementById("rank");
const productName=document.getElementById("productName");
const price=document.getElementById("price");
const memo=document.getElementById("memo");
const image=document.getElementById("image");
const deleteBtn=document.getElementById("deleteItemBtn");

document.getElementById("openPopup").onclick=()=>{
  popup.style.display="flex";
  editTarget=null;
  deleteBtn.style.display="none";
  clearInputs();
};

document.getElementById("closePopup").onclick=()=>popup.style.display="none";

document.getElementById("addItemBtn").onclick=()=>{
  if(!rankInput.value||!productName.value)
    return alert("Rank와 Product Name은 필수입니다.");

  if([...document.querySelectorAll(".item-card")]
    .some(c=>c.dataset.rank===rankInput.value&&c!==editTarget))
    return alert("Rank가 중복되었습니다.");

  let card=editTarget||document.createElement("div");
  card.className="item-card";
  card.dataset.rank=rankInput.value;

  card.innerHTML=`
    <div class="edit-btn">✎ 수정</div>
    <div class="rank-badge">#${rankInput.value}</div>
    <div>${productName.value}</div>
    <div>${price.value}</div>
    <div class="memo-text">${memo.value}</div>
  `;

  if(image.files[0]){
    const img=document.createElement("img");
    img.src=URL.createObjectURL(image.files[0]);
    card.appendChild(img);
  }

  card.querySelector(".edit-btn").onclick=()=>openEdit(card);

  if(!editTarget) list.appendChild(card);
  sortItems();
  popup.style.display="none";
};

deleteBtn.onclick=()=>{
  if(editTarget) editTarget.remove();
  popup.style.display="none";
};

function openEdit(card){
  editTarget=card;
  rankInput.value=card.dataset.rank;
  productName.value=card.children[2].textContent;
  price.value=card.children[3].textContent;
  memo.value=card.children[4].textContent;
  deleteBtn.style.display="block";
  popup.style.display="flex";
}

function sortItems(){
  [...list.children]
  .sort((a,b)=>a.dataset.rank-b.dataset.rank)
  .forEach(c=>list.appendChild(c));
}

function clearInputs(){
  rankInput.value="";
  productName.value="";
  price.value="";
  memo.value="";
  image.value="";
}
