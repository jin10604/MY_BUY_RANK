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

let categories=["Default"];
let currentCategory="Default";
let data={ Default:[] };

const navPanel=document.getElementById("navPanel");
const openNav=document.getElementById("openNav");
const closeNav=document.getElementById("closeNav");
const categoryList=document.getElementById("categoryList");
const addCategoryBtn=document.getElementById("addCategoryBtn");

openNav.onclick=()=>navPanel.classList.add("open");
closeNav.onclick=()=>navPanel.classList.remove("open");

function renderCategories(){
categoryList.innerHTML="";
categories.forEach(cat=>{
const div=document.createElement("div");
div.className="category-item";
div.textContent=cat;
div.onclick=()=>{
currentCategory=cat;
renderItems();
navPanel.classList.remove("open");
};
categoryList.appendChild(div);
});
}

addCategoryBtn.onclick=()=>{
if(categories.length>=5) return alert("카테고리는 최대 5개입니다.");
const name=prompt("카테고리 이름");
if(!name||categories.includes(name)) return;
categories.push(name);
data[name]=[];
renderCategories();
};

function renderItems(){
itemList.innerHTML="";
(data[currentCategory]||[])
.sort((a,b)=>a.rank-b.rank)
.forEach(item=>{
const card=document.createElement("div");
card.className="item-card";
card.innerHTML=`<div class="edit-btn">✎ 수정</div>
<div class="rank-badge">#${item.rank}</div>
<div>${item.name}</div>
<div class="memo-text">${item.memo}</div>`;
if(item.img){
const img=document.createElement("img");
img.src=item.img;
card.appendChild(img);
}
itemList.appendChild(card);
});
}

renderCategories();
renderItems();

