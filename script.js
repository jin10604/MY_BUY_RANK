let editTarget = null;

document.addEventListener("DOMContentLoaded",()=>{
  const popup=document.getElementById("popup");
  const openBtn=document.getElementById("openPopup");
  const closeBtn=document.getElementById("closePopup");
  const addBtn=document.getElementById("addItemBtn");
  const deleteBtn=document.getElementById("deleteItemBtn");
  const list=document.getElementById("itemList");

  openBtn.onclick=()=>{ popup.style.display="flex"; editTarget=null; deleteBtn.style.display="none"; };
  closeBtn.onclick=()=>popup.style.display="none";

  addBtn.onclick=()=>{
    const name=productName.value;
    const price=price.value;
    const memo=memo.value;
    const file=image.files[0];

    let card = editTarget || document.createElement("div");
    card.className="item-card";
    card.innerHTML="";

    const edit=document.createElement("div");
    edit.textContent="✎ 수정";
    edit.className="edit-btn";
    edit.onclick=()=>openEdit(card,name,price,memo,file);
    card.appendChild(edit);

    if(file){ const img=document.createElement("img"); img.src=URL.createObjectURL(file); card.appendChild(img);}
    ["name","price","memo"].forEach(v=>{
      const d=document.createElement("div");
      d.textContent=eval(v);
      card.appendChild(d);
    });

    if(!editTarget) list.appendChild(card);
    popup.style.display="none";
  };

  deleteBtn.onclick=()=>{
    if(editTarget) editTarget.remove();
    popup.style.display="none";
  };

  function openEdit(card){
    editTarget=card;
    deleteBtn.style.display="block";
    popup.style.display="flex";
  }
});
